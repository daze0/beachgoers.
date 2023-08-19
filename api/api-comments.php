<?php
require("../bootstrap.php");

$comments_data = array();

if(isUserLoggedIn()) {
    if (isset($_GET["pid"])) {
        $comments_data["comments"] = $dbh->getCommentsByPostId($_GET["pid"]);
    } elseif (isset($_POST["pid"]) && isset($_POST["comment"])) {
        $comments_data["pid"] = $_POST["pid"];
        $comments_data["comment"] = $_POST["comment"];
        $dbh->addCommentToPost($_POST["pid"], $_POST["comment"]);
    }
}

header("Content-Type: application/json");
echo json_encode($comments_data);
?>