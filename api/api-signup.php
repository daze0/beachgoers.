<?php
require_once("../bootstrap.php");

$signup_data["signup_success"] = false;

if (isset($_POST["email"]) && isset($_POST["username"]) && isset($_POST["password"]) && 
    isset($_POST["name"]) && isset($_POST["surname"]) && isset($_FILES["profilepicture"])) {
    // Register new user if not registered yet:
    // - create db helper method that registers new record in db
    // - create db helper method that verifies if given record is already in db
    //     ::if given record is not already in db then signup_success = true
    $signup_data["signup_email_available"] = (count($dbh->checkUserEmailRegistration($_POST["email"])) == 0) ? true : false;
    $signup_data["signup_username_available"] = (count($dbh->checkUsernameRegistration($_POST["username"])) == 0) ? true : false;

    if ($signup_data["signup_email_available"] && $signup_data["signup_username_available"]) {
        $userimgFilename = uploadImg("profilepicture");
        $newlyRegisteredUser = $dbh->registerUser($_POST["email"], $_POST["username"], $_POST["password"], $_POST["name"], $_POST["surname"], $userimgFilename);
        registerLoggedUser($newlyRegisteredUser[0]);
        $signup_data["username"] = $_POST["username"];
    } else {
        $signup_data["signup_error"] = "Invalid username or password.";
    }
}

if (isUserLoggedIn()) {
    $signup_data["signup_success"] = true;
}

header('Content-Type: application/json');
echo json_encode($signup_data);
?>
