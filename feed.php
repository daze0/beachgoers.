<?php
require_once("bootstrap.php");
require_once("utils/webpage.php");

$webpage = new WebPage(
    "ConnectU - Feed", 
    array("global-style.css"), 
    array("https://unpkg.com/axios/dist/axios.min.js", "js/utils/functions.js", "js/feed.js", "js/search-popup.js", "js/navbar.js", "js/footer.js")
);

if (isset($_SESSION["profile"])) {
    unset($_SESSION["profile"]);
}
$_SESSION["feed"] = true;

require("template/base.php");
?>