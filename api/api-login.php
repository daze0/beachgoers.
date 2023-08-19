<?php
require_once("../bootstrap.php");

$login_data["login_success"] = false;

if (isset($_POST["username"]) && isset($_POST["password"])) {
    $login_result = $dbh->checkLogin($_POST["username"], $_POST["password"]);
    if (count($login_result) == 0) {
        $login_data["login_error"] = "Wrong username or password.";
    } else {
        registerLoggedUser($login_result[0]);
    }
}

if(isUserLoggedIn()) {
    $login_data["login_success"] = true;
    $login_data["username"] = $_SESSION["username"];
    if (isset($_GET["logout"]) && $_GET["logout"]) {
        unregisterLoggedUser();
        $login_data["login_success"] = false;
        header("Location: ../index.php");
    }
} else {
    if(isset($_GET["logout"]) && $_GET["logout"]) {
        $login_data["login_success"] = false;
        header("Location: ../index.php");
    }
}

header("Content-Type: application/json");
echo json_encode($login_data);

?>
