<?php

use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Cloudinary\Cloudinary;

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__. '/../');
$dotenv->load();

function sendJSON($statusCode = 200, $message = "", $data = [])
{
    http_response_code($statusCode);
    header("Content-Type: application/json");
    echo json_encode([
        "status" => $statusCode,
        "message" => $message,
        "data" => $data
    ]);
    exit;
}

function storeFile($fileName, $tmpPath)
{
    $uploadDir = __DIR__ . "/uploads/";
    $ext = pathinfo($fileName, PATHINFO_EXTENSION);
    $fileName = uniqid("book_", true) . "." . $ext;

    if (!is_dir($uploadDir)) {
        mkdir($uploadDir, 0777, true);
    }

    $targetPath = $uploadDir . $fileName;

    if (move_uploaded_file($tmpPath, $targetPath)) {
        return ['ok' => true, 'targetPath' => $targetPath];
    } else {
        return ['ok' => false];
    }
}

function uploadFile($targetPath)
{
    $cloudinary_name = $_ENV['CLOUDINARY_NAME'];
    $cloudinary_key = $_ENV['CLOUDINARY_KEY'];
    $cloudinary_secret = $_ENV['CLOUDINARY_SECRET'];

    $cloudinary = new Cloudinary([
        'cloud' => [
            'cloud_name' => $cloudinary_name,
            'api_key'    => $cloudinary_key,
            'api_secret' => $cloudinary_secret
        ]
    ]);

    try {
        $uploadResult = $cloudinary->uploadApi()->upload($targetPath, [
            'folder' => 'learnvault-books',
        ]);

        return ["ok" => true, "url" => $uploadResult['secure_url']];
    } catch (Exception $e) {
        return ["ok" => false, "error" => $e->getMessage()];
    }
}

class Token
{
    public static function generateToken($id, $email)
    {
        $payload = [
            'user_id' => $id,
            'email'   => $email,
            'iat'     => time(),
            'exp'     => time() + (60 * 60 * 24)
        ];

        $jwt_secret = $_ENV['JWT_SECRET'];

        $token = JWT::encode($payload, $jwt_secret, 'HS256');
        return $token;
    }
}

function ensureAuth() {
    $token = null;

    // 1. Check for cookie
    if (isset($_COOKIE['auth_token'])) {
        $token = $_COOKIE['auth_token'];
    }

    // 2. Check for Authorization header if cookie not found
    if (!$token) {
        $headers = getallheaders();
        if (isset($headers['Authorization'])) {
            $authHeader = $headers['Authorization'];
            $token = str_replace('Bearer ', '', $authHeader);
        }
    }

    // 3. If still no token, return error
    if (!$token) {
        sendJSON(401, "No auth token provided.");
    }

    // 4. Validate token
    try {
        $jwt_secret = $_ENV['JWT_SECRET'];
        $decoded = JWT::decode($token, new Key($jwt_secret, 'HS256'));
        return (array) $decoded;

    } catch (Exception $e) {
        sendJSON(401, "Invalid or expired token.", ["error" => $e->getMessage()]);
    }
}


