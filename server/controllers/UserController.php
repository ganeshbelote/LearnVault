<?php
require_once __DIR__ . '/../models/User.php';
require_once __DIR__ . '/../helpers/functions.php';

class UserController
{
    public static function register($body)
    {
        try {
            $username = trim($body['username']);
            $email = trim($body['email']);
            $password = trim($body['password']);

            if (!$username || !$email || !$password) {
                sendJSON(400, "All fields are necessary.");
            }

            if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
                sendJSON(400, "Invalid email format.");
            }

            $res = User::find($email);

            if ($res["ok"]) {
                sendJSON(409, "User already exist.");
            }

            $hashedpassword = password_hash($password, PASSWORD_BCRYPT);

            $res = User::create($username, $email, $hashedpassword);
            if (!$res["ok"]) {
                sendJSON(500, "Something went wrong.");
            }
            sendJSON(201, "User created successfully.", ["username" => $username, "email" => $email]);
        } catch (Exception $e) {
            sendJSON(500, "❌ Error: " . $e->getMessage());
        }
    }

    public static function login($body)
    {
        try {
            $email = trim($body['email']);
            $password = trim($body['password']);

            if (!$email || !$password) {
                sendJSON(400, "All fields are necessary.");
            }

            if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
                sendJSON(400, "Invalid email format.");
            }

            $res = User::find($email);

            if (!$res["ok"]) {
                sendJSON(404, "User not found.");
            }

            $user = $res["data"];

            if (!password_verify($password, $user['password'])) {
                sendJSON(401, "Invalid credentials.");
            }

            $token = Token::generateToken($user["user_id"], $user["email"]);

            setcookie(
                "token",
                $token,
                [
                    "expires" => time() + (60 * 60 * 24),
                    "path" => "/",
                    "secure" => true,
                    "httponly" => true,
                    "samesite" => "Strict"
                ]
            );

            sendJSON(200, "User logged in successfully.", ["token" => $token]);
        } catch (Exception $e) {
            sendJSON(500, "❌ Error: " . $e->getMessage());
        }
    }

    public static function contributions()
    {
        try {
            $res = User::findContributions();
            if (!$res["ok"]) {
                sendJSON(500, "Something went wrong.");
            }
            sendJSON(200, "Books fetched Successfully.", $res["data"]);
        } catch (Exception $e) {
            sendJSON(500, "❌ Error: " . $e->getMessage());
        }
    }
}
