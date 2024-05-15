<?php
require_once("../bootstrap.php");

$profile_data = array();

if (isUserLoggedIn()) {
    $profile_data["userid"] = $_SESSION["userid"];
    if(isset($_GET["checkTelegramBotActivation"])){
        $botHelper->updateChatsIds();
        $profile_data['telegram_bot_active'] = !empty($dbh->getUserTelegramChatIdById($_SESSION["userid"])[0]["telegramChatId"]);
    }
    if (isset($_SESSION["profile_uid"]) && $_SESSION["profile_uid"] != $_SESSION["userid"]) {
        $profile_data["profile_picture"] = $dbh->getUserImgById($_SESSION["profile_uid"])[0]["userimg"];
        $profile_data["username"] = $dbh->getUsernameById($_SESSION["profile_uid"])[0]["username"];
        $profile_data["followers"] = $dbh->getUserFollowersNumById($_SESSION["profile_uid"])[0][0];
        $profile_data["following"] = $dbh->getUserFollowingNumById($_SESSION["profile_uid"])[0][0];
        $profile_data["posts"] = $dbh->getUserPostsNumById($_SESSION["profile_uid"])[0][0];
        $profile_data["likes"] = $dbh->getUserLikesNumById($_SESSION["profile_uid"])[0][0];
        $profile_data["telegram_username"] = $dbh->getUserTelegramUsernameById($_SESSION["profile_uid"])[0]["telegramUsername"];
        $profile_data["personal_profile"] = false;
        if (isset($_GET["follow"])) {
            /**
             *  api/api-profile.php?follow=... => ... = [true, false]
             */
            if ($_GET["follow"] == "true") {
                $dbh->addFollowerToUser($_SESSION["userid"], $_SESSION["profile_uid"]);
                $profile_data["followers"]++;
            } elseif ($_GET["follow"] == "false") {
                $dbh->removeFollowerFromUser($_SESSION["userid"], $_SESSION["profile_uid"]);
                $profile_data["followers"]--;
            }
        } elseif (isset($_GET["followers_list"]) && $_GET["followers_list"] == "true") {
            /** 
             * api/api-profile.php?followers_list=true
             */
            $profile_data["followers_list"] = $dbh->getUserFollowersById($_SESSION["profile_uid"]);
            if (isset($_GET["following_list"]) && $_GET["following_list"] == "true") {
                /** 
                 * api/api-profile.php?followers_list=true&following_list=true
                 */
                $profile_data["following_list"] = $dbh->getUserFollowingById($_SESSION["profile_uid"]);
            }
        } elseif (isset($_GET["following_list"]) && $_GET["following_list"] == "true") {
            /**
             * api/api-profile.php?following_list=true
             */
            $profile_data["following_list"] = $dbh->getUserFollowingById($_SESSION["profile_uid"]);
        }
        $profile_data["follow_status"] = $dbh->isUserFollowedByUser($_SESSION["profile_uid"], $_SESSION["userid"]);
    } else {
        $profile_data["profile_picture"] = $dbh->getUserImgById($_SESSION["userid"])[0]["userimg"];
        $profile_data["username"] = $_SESSION["username"];
        $profile_data["followers"] = $dbh->getUserFollowersNumById($_SESSION["userid"])[0][0];
        $profile_data["following"] = $dbh->getUserFollowingNumById($_SESSION["userid"])[0][0];
        $profile_data["posts"] = $dbh->getUserPostsNumById($_SESSION["userid"])[0][0];
        $profile_data["likes"] = $dbh->getUserLikesNumById($_SESSION["userid"])[0][0];
        $profile_data["telegram_username"] = $dbh->getUserTelegramUsernameById($_SESSION["userid"])[0]["telegramUsername"];
        $profile_data["telegram_chat_id"] = $dbh->getUserTelegramChatIdById($_SESSION["userid"])[0]["telegramChatId"];
        $profile_data["personal_profile"] = true;
        if (isset($_GET["followers_list"]) && $_GET["followers_list"] == "true") {
            /** 
             * api/api-profile.php?followers_list=true
             */
            $profile_data["followers_list"] = $dbh->getUserFollowersById($_SESSION["userid"]);
            if (isset($_GET["following_list"]) && $_GET["following_list"] == "true") {
                /** 
                 * api/api-profile.php?followers_list=true&following_list=true
                 */
                $profile_data["following_list"] = $dbh->getUserFollowingById($_SESSION["userid"]);
            }
        } elseif (isset($_GET["following_list"]) && $_GET["following_list"] == "true") {
            /**
             * api/api-profile.php?following_list=true
             */
            $profile_data["following_list"] = $dbh->getUserFollowingById($_SESSION["userid"]);
        }
    }
}

header("Content-Type: application/json");
echo json_encode($profile_data);
