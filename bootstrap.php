<?php
session_start();
define("UPLOAD_DIR", "./upload/");
define("BASE_URL", "http://127.0.0.1/Connect-U/");
require_once("utils/functions.php");
require_once("db/database.php");
require_once("bot/bot.php");
$dbh = new DatabaseHelper("localhost", "root", "", "ConnectU", 3306);
$botHelper = new BotHelper("6736915215:AAHSyzT4fXP-g7wqBpmlQU8c2IpUn1n1I4M", $dbh);
?>
