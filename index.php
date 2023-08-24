<?php
require_once("bootstrap.php");
require_once("utils/webpage.php");

$webpage = new WebPage(
    "ConnectU", 
    array("global-style.css", "index.css"), 
    array("js/index/view-layouts/indexViewLayout.js", "js/footer/view-layouts/footerViewLayout.js", "js/index/index.js", "js/footer/footer.js")
);

require("template/base.php");
?>
