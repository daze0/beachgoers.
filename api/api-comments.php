<?php
require("../bootstrap.php");

$comments_data = array();

if(isUserLoggedIn()) {
    if (isset($_GET["pid"])) {
        $comments_data["comments"] = $dbh->getCommentsByPostId($_GET["pid"]);
    } elseif (isset($_POST["pid"]) && isset($_POST["comment"])) {
        $comments_data["pid"] = $_POST["pid"];
        $comments_data["comment"] = $_POST["comment"];
        if(empty($comments_data["comment"])){
            $comments_data["comment_error"] = "Comment not specified";
            $comments_data["comment_success"] = false;
        }else{
            $dbh->addCommentToPost($_POST["pid"], $_POST["comment"]);
            $comments_data["comment_success"] = true;
        }
    }
}

header("Content-Type: application/json");
echo json_encode($comments_data);
?>