<?php
require_once("../bootstrap.php");

$notifications_data = array();

if (isUserLoggedIn()) {
    $notifications_data["notifications"] = $dbh->getLastUserNotifications($_SESSION["userid"]);
}

header("Content-Type: application/json");
echo json_encode($notifications_data);
