<?php
require_once("bootstrap.php");
require_once("utils/webpage.php");

$webpage = new WebPage(
    "ConnectU - Profile",
    array("global-style.css", "profile.css", "navbar.css", "loading.css"),
    array("https://unpkg.com/axios/dist/axios.min.js"),
    array("js/profile/profile.js", "js/navbar/navbar.js", "js/footer/footer.js")
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
