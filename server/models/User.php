<?php
require_once __DIR__ . '/../config/Database.php';

class User
{
    public static function create($username, $email, $hashedpassword)
    {
        try {
            $db = Database::getConnection();
            $query = "INSERT INTO users(username, email, password) VALUES(? , ? , ?);";
            $stmt = $db->prepare($query);
            $stmt->execute([$username, $email, $hashedpassword]);
            return ["ok" => true];
        } catch (Exception $e) {
            return ["ok" => false, "message" => $e->getMessage()];
        }
    }

    public static function find($email)
    {
        try {
            $db = Database::getConnection();
            $query = "SELECT * FROM users WHERE email = ?";
            $stmt = $db->prepare($query);
            $stmt->execute([$email]);
            $user = $stmt->fetch(PDO::FETCH_ASSOC);
            if ($user) {
                return ["ok" => true, "data" => $user];
            }
            return ["ok" => false, "message" => "User not found"];
        } catch (Exception $e) {
            return ["ok" => false, "message" => $e->getMessage()];
        }
    }

    public static function findContributions()
    {
        try {
            $db = Database::getConnection();
            $query = "SELECT users.username,COUNT(*) AS total_books FROM users JOIN books ON users.user_id = books.uploaded_by GROUP BY users.username ORDER BY total_books DESC;";
            $stmt = $db->prepare($query);
            $stmt->execute();
            $users = $stmt->fetchAll(PDO::FETCH_ASSOC);
            if ($users) {
                return ["ok" => true, "data" => $users];
            }
            return ["ok" => false, "message" => "User not found"];
        } catch (Exception $e) {
            return ["ok" => false, "message" => $e->getMessage()];
        }
    }
}
