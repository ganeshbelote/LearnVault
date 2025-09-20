<?php
require_once __DIR__ . '/../vendor/autoload.php';
require_once __DIR__ . '/../controllers/UserController.php';
require_once __DIR__ . '/../controllers/BookController.php';

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

$rawUri = $_SERVER['REQUEST_URI'];
$uri = str_replace('/learnvault', '', $rawUri);
$method = $_SERVER['REQUEST_METHOD'];
$body = json_decode(file_get_contents('php://input'), true);

switch ($uri) {
    case '/':
        echo "Server started successfully";
        break;
    case '/register':
        if ($method == 'POST') {
            UserController::register($body);
        }
        break;
    case '/login':
        if ($method == "POST") {
            UserController::login($body);
        }
        break;
    case '/api/v1/book':
        if ($method == "GET") {
            BookController::getAllBooks();
        }else if ($method == "POST") {
            $user = ensureAuth(); 
            $email  = $user['email'];
            BookController::upload($email);
        }
        break;
    case '/contribution':
        if ($method == "GET") {
            UserController::contributions();
        }
    default:
        echo '404 Page';
        break;
}
