<?php
require_once("bootstrap.php");
require_once("utils/webpage.php");

$webpage = new WebPage("ConnectU - Log-in", array("global-style.css"), array("https://unpkg.com/axios/dist/axios.min.js", "js/utils/functions.js", "js/login.js", "js/auth-layout.js", "js/footer.js"));

require("template/base.php");
?>
