<?php
require_once __DIR__ . '/../models/Book.php';
require_once __DIR__ . '/../helpers/functions.php';

class BookController
{
    public static function upload($email)
    {
        try {
            // $data = [title => os, level => undergraduate , course => bcs ,semester => 2, publication => nirali, 0, publish-start-year => 2019,publish-end-year => 2024, file => ]
            $title        = isset($_POST['title']) ? trim($_POST['title']) : null;
            $level        = isset($_POST['level']) ? trim($_POST['level']) : null;
            $course       = isset($_POST['course']) ? trim($_POST['course']) : null;
            $semester     = isset($_POST['semester']) ? trim($_POST['semester']) : null;
            $publication  = isset($_POST['publication']) ? trim($_POST['publication']) : null;
            $startYear    = isset($_POST['publish_start_year']) ? trim($_POST['publish_start_year']) : null;
            $endYear      = isset($_POST['publish_end_year']) ? trim($_POST['publish_end_year']) : null;
            $pagesCount   = isset($_POST['pages_count']) ? trim($_POST['pages_count']) : null;

            $fileName = null;
            $tmpPath  = null;
            if (isset($_FILES['file']) && $_FILES['file']['error'] === UPLOAD_ERR_OK) {
                $tmpPath  = $_FILES['file']['tmp_name'];
                $fileName = basename($_FILES['file']['name']);
            }

            if (
                !$title || !$level || !$course || !$semester || !$publication ||
                !$startYear || !$endYear || !$fileName ||
                !is_numeric($startYear) || !is_numeric($semester)
            ) {
                sendJSON(400, "All fields are necessary and must be valid.");
            }

            $res = User::find($email);
            if (!$res["ok"]) {
                sendJSON(404, "User not found");
            }
            $userId = $res["data"]["user_id"];

            $res = storeFile($fileName, $tmpPath);
            if (!$res['ok']) {
                sendJSON(500, "File upload failed.");
            }
            $targetPath = $res['targetPath'];

            $res = uploadFile($targetPath);
            if (!$res['ok']) {
                if (file_exists($targetPath)) {
                    unlink($targetPath);
                }
                sendJSON(500, "File upload failed.", ["error" => $res['error']]);
            }
            if (file_exists($targetPath)) {
                unlink($targetPath);
            }
            $url = $res['url'];

            $res = Book::create([
                "title" => $title,
                "level" => $level,
                "course" => $course,
                "semester" => $semester,
                "publication" => $publication,
                "publish_start_year" => $startYear,
                "publish_end_year"   => $endYear,
                "pages_count" => $pagesCount,
                "url" => $url,
                "uploaded_by" => $userId
            ]);
            if (!$res["ok"]) {
                sendJSON(500, "Something went wrong.");
            }

            sendJSON(200, "File uploaded Successfully.", [
                "url" => $url
            ]);
        } catch (Exception $e) {
            if (file_exists($targetPath)) {
                unlink($targetPath);
            }
            sendJSON(500, "Error: " . $e->getMessage());
        }
    }

    public static function getAllBooks()
    {
        try {
            $res = Book::findAll();
            if (!$res["ok"]) {
                sendJSON(500, "Something went wrong.");
            }

            sendJSON(200, "Books fetched Successfully.", $res["data"]);
        } catch (Exception $e) {
            sendJSON(500, "Internal Server Error.", ["error" => $e->getMessage()]);
        }
    }

    public static function getByCondition($body)
    {
        try {
            $res = Book::findByCondtion($body);
            if (!$res["ok"]) {
                sendJSON(404, $res["message"], []);
            }

            sendJSON(200, "Books fetched Successfully.", $res["data"]);
        } catch (Exception $e) {
            sendJSON(500, "Internal Server Error.", ["error" => $e->getMessage()]);
        }
    }
}
