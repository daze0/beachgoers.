<?php
require_once("bootstrap.php");
require_once("utils/webpage.php");

$webpage = new WebPage(
    "beachgoers. | Sign-up",
    array("global-style.css", "auth.css"),
    array("https://unpkg.com/axios/dist/axios.min.js"),
    array("js/auth/signup.js", "js/footer/footer.js")
);

require("template/base.php");
