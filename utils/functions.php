<?php
function isUserLoggedIn() {
    return !empty($_SESSION["userid"]);
}

function registerLoggedUser($user) {
    $_SESSION["userid"] = $user["userid"];
    $_SESSION["username"] = $user["username"];
    $_SESSION["password"] = $user["password"];
    $_SESSION["email"] = $user["email"];
}

function unregisterLoggedUser() {
    unset($_SESSION["userid"]);
    unset($_SESSION["username"]);
    unset($_SESSION["password"]);
    unset($_SESSION["email"]);
}

/**
 * Uploads a file, given its filename:
 *  this function assumes that $_FILES[$filename] is set.
 */
function uploadImg($filename) {
    $targetFile = "../" . UPLOAD_DIR . $_FILES[$filename]["name"];
    $uploadOk = true;
    $imageFileType = strtolower(pathinfo($targetFile, PATHINFO_EXTENSION));

    // Check if it's a real image or a fake one and if the resolution is supported
    $img = getimagesize($_FILES[$filename]["tmp_name"]);
    $width = $img[0];
    $height = $img[1];
    if ($img && $width < 700 && $height < 700) {
        $uploadOk = true;
    } else {
        $uploadOk = false;
    }

    // Check if image already exists
    if (file_exists($targetFile)) {
        $uploadOk = false;
    }

    // Check if image size is below maximum upload size value
    if ($_FILES[$filename]["size"] > 500000) {
        $uploadOk = false;
    }

    // Check if image is a supported one: jpg, png, gif, jpeg formats only
    if ($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "gif" && $imageFileType != "jpeg") {
        $uploadOk = false;
    }

    if (!$uploadOk) {
        return "Security checks failed for file: " . $filename;
    } else {
        if (move_uploaded_file($_FILES[$filename]["tmp_name"], $targetFile)) {
            return $_FILES[$filename]["name"];
        } else {
            return "Failed to move uploaded file";
        }
    }
}
