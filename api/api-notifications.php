<?php
require_once("../bootstrap.php");

$notifications_data = array();

if (isUserLoggedIn()) {
    if(isset($_GET['count'])){
        $notifications_data["count"] = $dbh->getUnreadUserNotificationsCount($_SESSION["userid"]);
    }else{
        $notifications_data["notifications"] = $dbh->getLastUserNotifications($_SESSION["userid"]);
    }
}

header("Content-Type: application/json");
echo json_encode($notifications_data);
