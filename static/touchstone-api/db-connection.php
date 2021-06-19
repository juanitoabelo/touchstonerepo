<?php

/** Abelo Creative database account **/
// $servername = "localhost";
// $username = "uone_apex";
// $password = "MZHLwHI11RfT";
// $dbname = "uone_apexnoteswithdata";
/** End **/

/** Apex Touchstone database account **/
$servername = "72.14.179.213";
$username = "root";
$password = "R@lph34I5th3P@55w0rd!";
$dbname = "apex";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

?>