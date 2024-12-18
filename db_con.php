<?php
$servername = "sql201.infinityfree.com";
$username = "if0_37754530";  // Replace with your MySQL username
$password = "0775208061ABC";  // Replace with your MySQL password
$dbname = "if0_37754530_LeoClub";  // Name of the database

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
