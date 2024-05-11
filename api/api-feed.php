<?php
require_once("../bootstrap.php");
/*
TODO: 
    - Paginazione feed
    - Tutti i post utenti(user non compreso)
*/
$feed_data = array();

if (isUserLoggedIn()) {
    $feed_data["userid"] = $_SESSION["userid"];
    $feed_data["username"] = $dbh->getUsernameById($_SESSION["userid"])[0]["username"];
    $feed_data["posts"] = array();
    if (isset($_GET["page"])) {
        $posts = $dbh->getFeedPostsByUserId($_SESSION["userid"], $_GET["page"]); // Retrieve only first page initially
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
                $comments = $dbh->getCommentsByPostId($post["postid"]);
                foreach ($comments as $idx => $comment) {
                    $comments[$idx]["canDelete"] = $comment["userid"] == $_SESSION["userid"];
                    $comments[$idx]["hasMyLike"] = $dbh->doesUserAlreadyLikeComment($_SESSION["userid"], $comment["commentid"]);
                }
                $rich_post["comments"] = $comments;
                $rich_post["createdAt"] = $post["createdAt"];
                array_push($feed_data["posts"], $rich_post);
            }
        }
    } else if (isset($_GET["postid"])) {
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
