<?php
require_once("../bootstrap.php");

$signup_data["signup_success"] = false;

if (
    isset($_POST["email"]) && isset($_POST["username"]) && isset($_POST["password"]) &&
    isset($_POST["name"]) && isset($_POST["surname"]) && isset($_FILES["profilepicture"]) && isset($_POST["telegramusername"])
) {
    // Verify data fields content
    if (
        strlen($_POST["email"]) == 0 || strlen($_POST["username"]) == 0 ||
        strlen($_POST["password"]) == 0 || strlen($_POST["telegramusername"]) == 0
    ) {
        $signup_data["signup_error"] = "Missing one or more required field";
    }

    // Register new user if not registered yet:
    $signup_data["signup_email_available"] = (count($dbh->checkUserEmailRegistration($_POST["email"])) == 0) ? true : false;
    $signup_data["signup_username_available"] = (count($dbh->checkUsernameRegistration($_POST["username"])) == 0) ? true : false;

    if ($signup_data["signup_email_available"] && $signup_data["signup_username_available"]) {
        $userimgFilename = uploadImg("profilepicture");
        if (is_array($userimgFilename)) {
            //uploadimg failed
            if (!isset($signup_data["signup_error"])) {
                $signup_data["signup_error"] = $userimgFilename[0];
            }
        } else {
            $newlyRegisteredUser = $dbh->registerUser($_POST["email"], $_POST["username"], $_POST["password"], $_POST["name"], $_POST["surname"], $userimgFilename, $_POST["telegramusername"]);
            registerLoggedUser($newlyRegisteredUser[0]);
            $signup_data["username"] = $_POST["username"];
        }
    } else {
        $signup_data["signup_error"] = "Invalid username or password.";
    }
}

if (isUserLoggedIn()) {
    $signup_data["signup_success"] = true;
}

header('Content-Type: application/json');
echo json_encode($signup_data);
