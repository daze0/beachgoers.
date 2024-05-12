<?php
require_once("../bootstrap.php");

$profile_feed_data = array();

$method = $_SERVER['REQUEST_METHOD'];


if (isUserLoggedIn()) {
    if ($method == "DELETE" && isset($_GET["postid"])) {
        $post = $dbh->getPostById($_GET["postid"])[0];
        if ($_SESSION['userid'] == $post['author']) {
            $dbh->removePostById($_GET["postid"]);
            $profile_feed_data["post_delete"] = true;
        } else {
            $profile_feed_data["post_delete"] = false;
        }
    }

    if (isset($_SESSION["profile_uid"]) && $_SESSION["profile_uid"] != $_SESSION["userid"]) {
        $profile_feed_data["userid"] = $_SESSION["profile_uid"];
        $profile_feed_data["username"] = $dbh->getUsernameById($_SESSION["profile_uid"])[0]["username"];
        $profile_feed_data["userimg"] = $dbh->getUserImgById($_SESSION["profile_uid"])[0]["userimg"];
        $profile_feed_data["posts"] = array();
        if (isset($_GET["page"])) {
            $posts = $dbh->getPostsByUserId($_SESSION["profile_uid"], $_GET["page"]);
            if (!empty($posts)) {
                $rich_post = array();
                foreach ($posts as $post) {
                    $rich_post["author"] = $post["author"];
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
                    array_push($profile_feed_data["posts"], $rich_post);
                }
            }
        }
    } else {
        if (isset($_FILES["postimg"]) && isset($_POST["content"])) {
            $newPostImgFilename = uploadImg("postimg");
            if (is_array($newPostImgFilename)) {
                $profile_feed_data["post_success"] = false;
                $profile_feed_data["post_error"] = implode(", ", $newPostImgFilename);
            } else {
                $dbh->createNewPost($_SESSION["userid"], $newPostImgFilename, $_POST["content"]);
                $profile_feed_data["post_success"] = true;
            }
        }
        $profile_feed_data["userid"] = $_SESSION["userid"];
        $profile_feed_data["username"] = $_SESSION["username"];
        $profile_feed_data["userimg"] = $dbh->getUserImgById($_SESSION["userid"])[0]["userimg"];
        $profile_feed_data["posts"] = array();
        if (isset($_GET["page"])) {
            $posts = $dbh->getPostsByUserId($_SESSION["userid"], $_GET["page"]);
            if (!empty($posts)) {
                foreach ($posts as $post) {
                    $rich_post["author"] = $post["author"];
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
                    array_push($profile_feed_data["posts"], $rich_post);
                }
            }
        }
    }

    if (isset($_GET["postid"])) {
        if (!$dbh->doesUserAlreadyLikePost($_SESSION["userid"], $_GET["postid"])) {
            $dbh->addLikeToPost($_SESSION["userid"], $_GET["postid"]);
            if (!empty($profile_feed_data["posts"])) {
                foreach ($profile_feed_data["posts"] as $post) {
                    if ($post["postid"] == $_GET["postid"]) {
                        $post["hasMyLike"] = true;
                        $post["likes"] += 1;
                    }
                }
            }
            $profile_feed_data["like_success"] = true;
        } else {
            $dbh->removeLikeFromPost($_SESSION["userid"], $_GET["postid"]);
            if (!empty($profile_feed_data["posts"])) {
                foreach ($profile_feed_data["posts"] as $post) {
                    if ($post["postid"] == $_GET["postid"]) {
                        $post["hasMyLike"] = false;
                        $post["likes"] -= 1;
                    }
                }
            }
            $profile_feed_data["like_success"] = false;
        }
    }
}

header("Content-Type: application/json");
echo json_encode($profile_feed_data);
