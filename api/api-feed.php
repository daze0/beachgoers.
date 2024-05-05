<?php
require_once("../bootstrap.php");
/*
TODO: 
    - Paginazione feed
    - Tutti i post utenti(user compreso)
*/
$feed_data = array();

if (isUserLoggedIn()) {
    $feed_data["userid"] = $_SESSION["userid"];
    $feed_data["username"] = $dbh->getUsernameById($_SESSION["userid"])[0]["username"];
    $feed_data["posts"] = array();
    $posts = $dbh->getFeedPostsByUserId($_SESSION["userid"]); // TO BE IMPLEMENTED
    if (!empty($posts)) {
        $rich_post = array();
        foreach ($posts as $post) {
            $rich_post["author"] = $post["author"];
            $rich_post["username"] = $dbh->getUsernameById($post["author"])[0]["username"];
            $rich_post["userimg"] = $dbh->getUserImgById($post["author"])[0]["userimg"];
            $rich_post["postid"] = $post["postid"];
            $rich_post["img"] = $post["img"];
            $rich_post["content"] = $post["content"];
            $rich_post["hasMyLike"] = $dbh->doesUserAlreadyLikePost($_SESSION["userid"], $post["postid"]);
            $rich_post["likes"] = $dbh->getPostLikesById($post["postid"])[0][0];
            $rich_post["comments"] = $dbh->getCommentsByPostId($post["postid"]);
            $rich_post["createdAt"] = $post["createdAt"];
            array_push($feed_data["posts"], $rich_post);
        }
    }

    if (isset($_GET["postid"])) {
        if (!$dbh->doesUserAlreadylikePost($_SESSION["userid"], $_GET["postid"])) {
            $dbh->addLikeToPost($_SESSION["userid"], $_GET["postid"]);
            if (!empty($feed_data["posts"])) {
                foreach ($feed_data["posts"] as $post) {
                    if ($post["postid"] == $_GET["postid"]) {
                        $post["hasMyLike"] = true;
                        $post["likes"]++;
                    }
                }
            }
            $feed_data["like_success"] = true;
        } else {
            $dbh->removeLikeFromPost($_SESSION["userid"], $_GET["postid"]);
            if (!empty($feed_data["posts"])) {
                foreach ($feed_data["posts"] as $post) {
                    if ($post["postid"] == $_GET["postid"]) {
                        $post["hasMyLike"] = false;
                        $post["likes"]--;
                    }
                }
            }
            $feed_data["like_success"] = false;
        }
    }
}

header("Content-Type: application/json");
echo json_encode($feed_data);
