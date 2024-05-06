<?php
require_once("../bootstrap.php");

$search_data = array();

if (isUserLoggedIn()) {
    if (isset($_GET["q"])) {
        if ($dbh->doesUserExistByUsername($_GET["q"])) {
            $search_data["result_uid"] = $dbh->getUserIdByUsername($_GET["q"])[0]["userid"];
            $search_data["search_success"] = true;
        } else {
            $search_data["search_success"] = false;
        }
    }
}

header("Content-Type: application/json");
echo json_encode($search_data);
