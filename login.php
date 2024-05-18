<?php
require_once("bootstrap.php");
require_once("utils/webpage.php");

$webpage = new WebPage(
    "Beachgoers - Log-in",
    array("global-style.css"),
    array("https://unpkg.com/axios/dist/axios.min.js"),
    array("js/auth/login.js", "js/footer/footer.js")
);

require("template/base.php");
