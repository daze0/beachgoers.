<?php
require_once("../bootstrap.php");

$MAX_SUGGESTIONS = 5;

$search_data = array();

if (isUserLoggedIn()) {
    if (isset($_GET["q"])) {
        if ($dbh->doesUserExistByUsername($_GET["q"])) {
            $search_data["result_uid"] = $dbh->getUserIdByUsername($_GET["q"])[0]["userid"];
            $search_data["search_success"] = true;
        } else {
            $search_data["search_success"] = false;
        }
    } else if (isset($_GET["sq"])) { // sq = suggestions (input) query
        $search_data["suggestions"] = $dbh->getSearchSuggestions(
            $_SESSION["userid"],
            $_GET["sq"],
            $MAX_SUGGESTIONS
        );
    }
}

header("Content-Type: application/json");
echo json_encode($search_data);
