<?php
// Database connection
$pdo = new PDO("mysql:host=https://server1.bisuphost.com:2083/cpsess8902991707/3rdparty/phpMyAdmin/;dbname=karkiand_users_view", "karkiand_kb", "Bhurtel1212@");

// Function to get IP
function getUserIP() {
    if (!empty($_SERVER['HTTP_CLIENT_IP'])) return $_SERVER['HTTP_CLIENT_IP'];
    if (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) return explode(',', $_SERVER['HTTP_X_FORWARDED_FOR'])[0];
    return $_SERVER['REMOTE_ADDR'];
}

$ip = getUserIP();

// Get geo details from free API
$geoData = @json_decode(file_get_contents("http://ip-api.com/json/{$ip}?fields=status,country,city,isp,timezone"), true);

$country = $geoData['status'] === 'success' ? $geoData['country'] : null;
$city    = $geoData['status'] === 'success' ? $geoData['city'] : null;
$isp     = $geoData['status'] === 'success' ? $geoData['isp'] : null;
$timezone = $geoData['status'] === 'success' ? $geoData['timezone'] : null;

// Get browser/device info from AJAX request
$browser_info = $_POST['browser_info'] ?? '';
$screen_res = $_POST['screen_res'] ?? '';

$stmt = $pdo->prepare("INSERT INTO visitors (ip_address, country, city, isp, timezone, browser_info, screen_resolution) VALUES (?, ?, ?, ?, ?, ?, ?)");
$stmt->execute([$ip, $country, $city, $isp, $timezone, $browser_info, $screen_res]);

echo "Data Saved";
