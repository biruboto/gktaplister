<?php
header('Content-Type: application/json');
$jsonFile = "../json/beer-database.json";

// Backup DB
if (isset($_GET['backup'])) {
    $src = $jsonFile;
    date_default_timezone_set('America/Los_Angeles'); // Or your preferred tz
    $date = date('Ymd-His');
    $dest = __DIR__ . "/beer-database-backup-{$date}.json";
    if (copy($src, $dest)) {
        // Only output the new filename (client expects this!)
        echo basename($dest);
    } else {
        http_response_code(500);
        echo "Backup failed!";
    }
    exit;
}

// If the request is for the logo list, return it
if (isset($_GET['logos'])) {
    $logoDir = __DIR__ . '/../logos';
    $files = [];
    foreach (glob($logoDir . '/*.svg') as $file) {
        $files[] = basename($file);
    }
    header('Content-Type: application/json');
    echo json_encode($files);
    exit;
}

// Handle GET: send JSON
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    echo file_get_contents($jsonFile);
    exit;
}

// Handle POST: receive new JSON and save it
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = file_get_contents('php://input');
    $beers = json_decode($input, true);
    if (!is_array($beers)) {
        http_response_code(400);
        echo json_encode(["error" => "Invalid JSON"]);
        exit;
    }
    file_put_contents($jsonFile, json_encode($beers, JSON_PRETTY_PRINT));
    echo json_encode(["status" => "ok"]);
    exit;
}

http_response_code(405);
echo json_encode(["error" => "Method not allowed"]);
exit;
?>
