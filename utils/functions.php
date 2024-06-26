<?php
function isUserLoggedIn()
{
    return !empty($_SESSION["userid"]);
}

function registerLoggedUser($user)
{
    $_SESSION["userid"] = $user["userid"];
    $_SESSION["username"] = $user["username"];
    $_SESSION["password"] = $user["password"];
    $_SESSION["email"] = $user["email"];
}

function unregisterLoggedUser()
{
    unset($_SESSION["userid"]);
    unset($_SESSION["username"]);
    unset($_SESSION["password"]);
    unset($_SESSION["email"]);
}

/**
 * Uploads a file, given its filename:
 *  this function assumes that $_FILES[$filename] is set.
 */
function uploadImg($filename)
{
    $errorMsgs = array();

    if ($_FILES[$filename]["tmp_name"] == '') {
        array_push($errorMsgs, "No profile picture provided");
        return $errorMsgs;
    }

    $targetFileName = time() . '_' . str_replace(" ","_",$_FILES[$filename]["name"]);
    $targetFile = "../" . UPLOAD_DIR . $targetFileName;
    $uploadOk = true;
    $imageFileType = strtolower(pathinfo($targetFile, PATHINFO_EXTENSION));

    // Check if it's a real image or a fake one and if the resolution is supported
    $img = getimagesize($_FILES[$filename]["tmp_name"]);
    $width = $img[0];
    $height = $img[1];
    if ($img && $width > 700 && $height > 700) {
        $uploadOk = false;
        array_push($errorMsgs, "Resolution not supported");
    }

    // Check if image already exists
    if (file_exists($targetFile)) {
        $uploadOk = false;
        array_push($errorMsgs, "File already exists");
    }

    // Check if image size is below maximum upload size value
    if ($_FILES[$filename]["size"] > 500000) {
        $uploadOk = false;
        array_push($errorMsgs, "Image size is too big");
    }

    // Check if image is a supported one: jpg, png, gif, jpeg formats only
    if ($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "gif" && $imageFileType != "jpeg") {
        $uploadOk = false;
        array_push($errorMsgs, "Format is not supported");
    }

    if (!$uploadOk) {
        return $errorMsgs;
    } else {
        if (move_uploaded_file($_FILES[$filename]["tmp_name"], $targetFile)) {
            return $targetFileName;
        } else {
            return "Failed to move uploaded file";
        }
    }
}
