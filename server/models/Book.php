<?php
require_once __DIR__ . '/../config/Database.php';

class Book
{
    public static function create($data)
    {
        // $data = [title => os, level => undergraduate , course => bcs ,semester => 2, publication => nirali, 0, publish-start-year => 2019,publish-end-year => 2024, pages_count => 256]
        [
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
        ] = $data;

        try {
            $db = Database::getConnection();
            $query = "INSERT INTO books(title, level, course, semester, publication, publish_start_year, publish_end_year, pages_count, url, uploaded_by ) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?);";
            $stmt = $db->prepare($query);
            $stmt->execute([$title, $level,  $course, $semester, $publication, $startYear, $endYear, $pagesCount, $url, $userId]);
            return ["ok" => true, "id" => $db->lastInsertId()];
        } catch (Exception $e) {
            return ["ok" => false, "message" => $e->getMessage()];
        }
    }

    public static function findAll()
    {
        try {
            $db = Database::getConnection();
            $query = "SELECT * FROM books";
            $stmt = $db->prepare($query);
            $stmt->execute(); 
            $books = $stmt->fetchAll(PDO::FETCH_ASSOC); 

            if ($books && count($books) > 0) {
                return ["ok" => true, "data" => $books];
            }
            return ["ok" => false, "message" => "Books not found."];
        } catch (Exception $e) {
            return ["ok" => false, "message" => $e->getMessage()];
        }
    }

    public static function totalCount()
    {
        try {
            $db = Database::getConnection();
            $totalStmt = $db->query("SELECT COUNT(*) as total FROM books");
            $total = $totalStmt->fetch(PDO::FETCH_ASSOC)['total'];
            return ["ok" => true, "data" => (int)$total];
        } catch (Exception $e) {
            return ["ok" => false, "message" => $e->getMessage()];
        }
    }
}
