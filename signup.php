<?php
require_once("bootstrap.php");
require_once("utils/webpage.php");

$webpage = new WebPage("ConnectU - Sign-up", array("global-style.css"), array("https://unpkg.com/axios/dist/axios.min.js", "js/utils/functions.js", "js/signup.js", "js/auth-layout.js", "js/signup-costraints.js", "js/footer.js"));

require("template/base.php");
?>
