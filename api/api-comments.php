<?php
require("../bootstrap.php");

$comments_data = array();

$method = $_SERVER['REQUEST_METHOD'];

if(isUserLoggedIn()) {
    if ($method == "GET" && isset($_GET["pid"])) {
        $comments_data["comments"] = $dbh->getCommentsByPostId($_GET["pid"]);
    } elseif ($method == "POST" && isset($_POST["pid"]) && isset($_POST["comment"])) {
        $comments_data["pid"] = $_POST["pid"];
        $comments_data["comment"] = $_POST["comment"];
        if(empty($comments_data["comment"])){
            $comments_data["comment_error"] = "Comment not specified";
            $comments_data["comment_success"] = false;
        }else{
            $dbh->addCommentToPost($_POST["pid"], $_POST["comment"]);
            $comments_data["comment_success"] = true;
        }
    } else if($method == "DELETE" && isset($_GET["commentid"])){
        $comment = $dbh->getCommentById($_GET["commentid"])[0];
        if($_SESSION['userid'] == $comment['user']){
            $dbh->removeCommentById($_GET["commentid"]);
            $comments_data["comment_delete"] = true;
        }else{
            $comments_data["comment_delete"] = false;
        }

        
    }
}

header("Content-Type: application/json");
echo json_encode($comments_data);
?>