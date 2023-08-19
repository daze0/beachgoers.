<?php
require_once("bootstrap.php");
require_once("utils/webpage.php");

$webpage = new WebPage(
    "ConnectU - Profile", 
    array("global-style.css", "profile.css"), 
    array("https://unpkg.com/axios/dist/axios.min.js", "js/utils/functions.js", "js/comments.js", "js/profile-info.js", "js/profile-feed.js",  "js/newpost-popup.js", "js/follower-list-popup.js", "js/following-list-popup.js", "js/search-popup.js", "js/profile-callbacks.js", "js/profile.js", "js/navbar.js", "js/footer.js")
);

if (isset($_SESSION["feed"])) {
    unset($_SESSION["feed"]);
}
$_SESSION["profile"] = true;
if (isset($_GET["uid"])) {
    $_SESSION["profile_uid"] = $_GET["uid"];
} else {
    unset($_SESSION["profile_uid"]);
}

require("template/base.php");
?>
