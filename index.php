<?php
require_once("bootstrap.php");
require_once("utils/webpage.php");

$webpage = new WebPage(
    "Beachgoers",
    array("global-style.css", "index.css"),
    array(),
    array("js/index/index.js", "js/footer/footer.js")
);

require("template/base.php");
