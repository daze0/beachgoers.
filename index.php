<?php
require_once("bootstrap.php");
require_once("utils/webpage.php");

$webpage = new WebPage("ConnectU", array("global-style.css", "index.css"), array("js/utils/functions.js", "js/index.js", "js/footer.js"));

require("template/base.php");
?>
