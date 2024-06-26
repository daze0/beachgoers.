<?php
require_once("bootstrap.php");
require_once("utils/webpage.php");

$webpage = new WebPage(
    "beachgoers. | Feed",
    array("global-style.css", "navbar.css", "loading.css", "feed.css", "popups.css"),
    array("https://unpkg.com/axios/dist/axios.min.js"),
    array("js/feed/feed.js", "js/navbar/navbar.js", "js/footer/footer.js")
);

if (isset($_SESSION["profile"])) {
    unset($_SESSION["profile"]);
}
$_SESSION["feed"] = true;

require("template/base.php");
