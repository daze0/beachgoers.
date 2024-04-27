<?php
require_once("../bootstrap.php");

$profile_feed_data = array();

if (isUserLoggedIn()) {
    /*if (isset($_SESSION["profile"]) && $_SESSION["profile"] == "true") {
        if (isset($_SESSION["profile_uid"]) && $_SESSION["profile_uid"] != $_SESSION["userid"]) {
            // Other profile page
        } else {
            // Personal profile page
        }
    } elseif(isset($_SESSION["feed"]) && $_SESSION["feed"] == "true") {

    }*/
    if (isset($_SESSION["profile_uid"]) && $_SESSION["profile_uid"] != $_SESSION["userid"]) {
        $profile_feed_data["userid"] = $_SESSION["profile_uid"];
        $profile_feed_data["username"] = $dbh->getUsernameById($_SESSION["profile_uid"])[0]["username"];
        $profile_feed_data["posts"] = array();
        $posts = $dbh->getPostsByUserId($_SESSION["profile_uid"]);
        if (!empty($posts)) {
            $rich_post = array();
            foreach ($posts as $post) {
                $rich_post["author"] = $post["author"];
                $rich_post["postid"] = $post["postid"]; 
                $rich_post["img"] = $post["img"];
                $rich_post["content"] = $post["content"];
                $rich_post["hasMyLike"] = $dbh->doesUserAlreadyLikePost($_SESSION["userid"], $post["postid"]);
                $rich_post["likes"] = $dbh->getPostLikesById($post["postid"])[0][0];
                $rich_post["comments"] = $dbh->getCommentsByPostId($post["postid"]);
                $rich_post["createdAt"] = $post["createdAt"];
                array_push($profile_feed_data["posts"], $rich_post);
            }
        }
    } else {
        if (isset($_FILES["postimg"]) && isset($_POST["content"])) {
            $newPostImgFilename = uploadImg("postimg");
            $dbh->createNewPost($_SESSION["userid"], $newPostImgFilename, $_POST["content"]);
        }
        $profile_feed_data["userid"] = $_SESSION["userid"];
        $profile_feed_data["username"] = $_SESSION["username"];
        $profile_feed_data["posts"] = array();
        $posts = $dbh->getPostsByUserId($_SESSION["userid"]);
        if (!empty($posts)) {
            foreach ($posts as $post) {
                $rich_post["author"] = $post["author"];
                $rich_post["postid"] = $post["postid"]; 
                $rich_post["img"] = $post["img"];
                $rich_post["content"] = $post["content"];
                $rich_post["hasMyLike"] = $dbh->doesUserAlreadyLikePost($_SESSION["userid"], $post["postid"]);
                $rich_post["likes"] = $dbh->getPostLikesById($post["postid"])[0][0];
                $rich_post["comments"] = $dbh->getCommentsByPostId($post["postid"]);
                $rich_post["createdAt"] = $post["createdAt"];
                array_push($profile_feed_data["posts"], $rich_post);
            }
        }
    }

    if (isset($_GET["userid"]) && isset($_GET["postid"])) {
        if (!$dbh->doesUserAlreadyLikePost($_GET["userid"], $_GET["postid"])) {
            $dbh->addLikeToPost($_GET["userid"], $_GET["postid"]);
            $profile_feed_data["like_success"] = true;
        } else {
            $dbh->removeLikeFromPost($_GET["userid"], $_GET["postid"]);
            $profile_feed_data["like_success"] = false;
        }
    }
}

header("Content-Type: application/json");
echo json_encode($profile_feed_data);

?>