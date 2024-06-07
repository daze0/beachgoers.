<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

/**
 * Class for db communication.
 */
class DatabaseHelper
{
    private const PAGINATION_BATCH_SIZE = 2;
    private $db;

    public function __construct($servername, $username, $password, $dbname, $port)
    {
        $this->db = new mysqli($servername, $username, $password, $dbname, $port);
        if ($this->db->connect_error) {
            die("Connection failed: " . $this->db->connect_error);
        }
    }

    /**
     * Creates a new record for the new user.
     */
    public function registerUser($email, $username, $password, $name, $surname, $userimg, $telegramUsername)
    {
        $passwordHash = password_hash($password, PASSWORD_DEFAULT);
        $query = "INSERT INTO `user` (`username`, `password`, `email`, `name`, `surname`, `userimg`, `telegramUsername`) VALUES (?, ?, ?, ?, ?, ?, ?);";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param("sssssss", $username, $passwordHash, $email, $name, $surname, $userimg, $telegramUsername);
        $stmt->execute();
        $result = $stmt->get_result();

        return $this->getUserByUsername($username);
    }

    public function updateUserProfileImg($userid, $userImg)
    {
        $query = "UPDATE `user` SET `userImg`=? WHERE `userid`=?";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param("si", $userImg, $userid);
        $stmt->execute();
        $stmt->close();
    }

    /**
     * Returns false if email has already been used, true otherwise.
     */
    public function checkUserEmailRegistration($email)
    {
        $query = "SELECT email FROM user WHERE email=?";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param("s", $email);
        $stmt->execute();
        $result = $stmt->get_result();

        return $result->fetch_all(MYSQLI_ASSOC);
    }

    /**
     * Returns false if username has already been used, true otherwise.
     */
    public function checkUsernameRegistration($username)
    {
        $query = "SELECT username FROM user WHERE username=?";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param("s", $username);
        $stmt->execute();
        $result = $stmt->get_result();

        return $result->fetch_all(MYSQLI_ASSOC);
    }

    /**
     * Checks if login credentials are valid.
     * Returns an empty associative array if they're not, 
     * otherwise the user record is returned.
     */
    public function checkLogin($username, $password)
    {
        $query = "SELECT * FROM user WHERE username=?";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param("s", $username);
        $stmt->execute();
        $result = $stmt->get_result();
        $users = $result->fetch_all(MYSQLI_ASSOC);
        if (empty($users)) return false;
        $user = $users[0];
        if (password_verify($password, $user['password'])) {
            return $user;
        } else {
            return [];
        }
    }

    public function getUserFollowersNumById($userid)
    {
        $query = "SELECT COUNT(*) FROM user_follows_user WHERE followed=?";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param("i", $userid);
        $stmt->execute();
        $result = $stmt->get_result();

        return $result->fetch_all(MYSQLI_NUM);
    }

    public function getUserFollowersById($userid)
    {
        $query = "SELECT userid, username, userimg FROM user_follows_user, user WHERE followed=? AND follower=userid";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param("i", $userid);
        $stmt->execute();
        $result = $stmt->get_result();

        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function getUserFollowingNumById($userid)
    {
        $query = "SELECT COUNT(*) FROM user_follows_user WHERE follower=?";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param("i", $userid);
        $stmt->execute();
        $result = $stmt->get_result();

        return $result->fetch_all(MYSQLI_NUM);
    }

    public function getUserFollowingById($userid)
    {
        $query = "SELECT userid, username, userimg FROM user_follows_user, user WHERE follower=? AND followed=userid";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param("i", $userid);
        $stmt->execute();
        $result = $stmt->get_result();

        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function getUserPostsNumById($userid)
    {
        $query = "SELECT COUNT(*) FROM post WHERE author=?";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param("i", $userid);
        $stmt->execute();
        $result = $stmt->get_result();

        return $result->fetch_all(MYSQLI_NUM);
    }

    public function getUserLikesNumById($userid)
    {
        $query = "SELECT COUNT(*) FROM post, user_likes_post WHERE post=postid AND author=?";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param("i", $userid);
        $stmt->execute();
        $result = $stmt->get_result();

        return $result->fetch_all(MYSQLI_NUM);
    }

    /**
     * Returns the full user record given his/hers/its username.
     */
    public function getUsernameById($userid)
    {
        $query = "SELECT username FROM user WHERE userid=?";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param("i", $userid);
        $stmt->execute();
        $result = $stmt->get_result();

        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function getUserImgById($userid)
    {
        $query = "SELECT userimg FROM user WHERE userid=?";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param("i", $userid);
        $stmt->execute();
        $result = $stmt->get_result();

        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function getUserTelegramUsernameById($userid)
    {
        $query = "SELECT telegramUsername FROM user WHERE userid=?";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param("i", $userid);
        $stmt->execute();
        $result = $stmt->get_result();

        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function getUserTelegramChatIdById($userid)
    {
        $query = "SELECT telegramChatId FROM user WHERE userid=?";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param("i", $userid);
        $stmt->execute();
        $result = $stmt->get_result();

        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function getUserById($id)
    {
        $query = "SELECT * FROM user WHERE userid=?";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param("i", $id);
        $stmt->execute();
        $result = $stmt->get_result();

        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function getUserByTelegramUsername($telegramUsername)
    {
        $query = "SELECT * FROM user WHERE telegramUsername=?";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param("s", $telegramUsername);
        $stmt->execute();
        $result = $stmt->get_result();

        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function getUserTelegramChatIdByTelegramUsername($telegramUsername)
    {
        $query = "SELECT telegramChatId FROM user WHERE telegramUsername=?";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param("s", $telegramUsername);
        $stmt->execute();
        $result = $stmt->get_result();

        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function updateUserTelegramChatId($telegramUsername, $telegramChatId)
    {
        $result = $this->getUserTelegramChatIdByTelegramUsername($telegramUsername);
        if (!isset($result[0])) {
            return false;
        }
        if ($result[0]["telegramChatId"] == $telegramChatId) {
            return false;
        }

        $query = "UPDATE user SET telegramChatId = ? WHERE telegramUsername = ?";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param("ss", $telegramChatId, $telegramUsername);
        $stmt->execute();
        return true;
    }

    public function getPostsByUserId($userid, $page_num)
    {
        $batch_size = self::PAGINATION_BATCH_SIZE;
        $offset = self::PAGINATION_BATCH_SIZE * ($page_num - 1);

        $query = "SELECT author, postid, img, content, createdAt FROM post 
        WHERE author=? 
        ORDER BY createdAt DESC
        LIMIT ? OFFSET ?";
        // TODO: repeat same pagination setup as the method below
        $stmt = $this->db->prepare($query);
        $stmt->bind_param("iii", $userid, $batch_size, $offset);
        $stmt->execute();
        $result = $stmt->get_result();

        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function getFeedPostsByUserId($userid, $page_num, $include_personal)
    {
        $batch_size = self::PAGINATION_BATCH_SIZE;
        $offset = self::PAGINATION_BATCH_SIZE * ($page_num - 1);

        $stmt = null;
        if (!$include_personal) {
            $query = "SELECT author, postid, img, content, createdAt FROM post 
            WHERE author IN (SELECT followed FROM user_follows_user WHERE follower=?) 
            ORDER BY createdAt DESC 
            LIMIT ? OFFSET ?";
            $stmt = $this->db->prepare($query);
            $stmt->bind_param("iii", $userid, $batch_size, $offset);
            $stmt->execute();
        } else {
            $query = "SELECT author, postid, img, content, createdAt FROM post 
            WHERE author IN (SELECT followed FROM user_follows_user WHERE follower=?) OR author=?
            ORDER BY createdAt DESC 
            LIMIT ? OFFSET ?";
            $stmt = $this->db->prepare($query);
            $stmt->bind_param("iiii", $userid, $userid, $batch_size, $offset);
            $stmt->execute();
        }
        $result = $stmt->get_result();
        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function getPostLikesById($postid)
    {
        $query = "SELECT COUNT(*) FROM user_likes_post WHERE post=?";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param("i", $postid);
        $stmt->execute();
        $result = $stmt->get_result();

        return $result->fetch_all(MYSQLI_NUM);
    }

    public function getCommentsByPostId($postid)
    {
        // Refactoring note: change post with postid
        $query = "SELECT commentid, userid, post, username, userimg, comment, likes, createdAt FROM comment, user WHERE post=? AND userid=user ORDER BY commentid DESC";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param("i", $postid);
        $stmt->execute();
        $result = $stmt->get_result();
        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function addFollowerToUser($followerid, $followedid)
    {
        if (!$this->isUserFollowedByUser($followedid, $followerid)) {
            $query = "INSERT INTO `user_follows_user` (`followed`, `follower`) VALUES (?, ?);";
            $stmt = $this->db->prepare($query);
            $stmt->bind_param("ii", $followedid, $followerid);
            $stmt->execute();
            $result = $stmt->get_result();
        }
    }

    public function removeFollowerFromUser($followerid, $followedid)
    {
        $query = "DELETE FROM user_follows_user WHERE followed=? AND follower=?";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param("ii", $followedid, $followerid);
        $stmt->execute();
        $result = $stmt->get_result();
    }

    public function isUserFollowedByUser($followed_userid, $follower_userid)
    {
        $query = "SELECT COUNT(*) FROM user_follows_user WHERE followed=? AND follower=?";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param("ii", $followed_userid, $follower_userid);
        $stmt->execute();
        $stmt->bind_result($count);
        $stmt->fetch();
        $stmt->close();

        if ($count == 0) {
            return false;
        } else {
            return true;
        }
    }

    public function createNewPost($userid, $postimg, $postcontent)
    {
        $query = "INSERT INTO `post` (`author`, `img`, `content`) VALUES (?, ?, ?)";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param("sss", $userid, $postimg, $postcontent);
        $stmt->execute();
        $stmt->close();
    }

    public function doesUserAlreadyLikePost($userid, $postid)
    {
        $query = "SELECT COUNT(*) FROM user_likes_post WHERE user=? AND post=?";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param("ii", $userid, $postid);
        $stmt->execute();
        $stmt->bind_result($count);
        $stmt->fetch();
        $stmt->close();

        if ($count == 0) {
            return false;
        } else {
            return true;
        }
    }

    public function addLikeToPost($userid, $postid)
    {
        $query = "INSERT INTO `user_likes_post` (`user`, `post`) VALUES (?, ?)";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param("ii", $userid, $postid);
        $stmt->execute();
        $stmt->close();
    }

    public function removeLikeFromPost($userid, $postid)
    {
        $query = "DELETE FROM user_likes_post WHERE user=? AND post=?";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param("ii", $userid, $postid);
        $stmt->execute();
        $stmt->close();
    }

    public function addCommentToPost($postid, $comment)
    {
        $query = "INSERT INTO `comment` (`user`, `post`, `comment`) VALUES (?, ?, ?)";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param("iis", $_SESSION["userid"], $postid, $comment);
        $stmt->execute();
        $stmt->close();
    }

    public function getCommentById($commentid)
    {
        $query = "SELECT commentid, user, post, comment, createdAt FROM comment WHERE commentid=?";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param("i", $commentid);
        $stmt->execute();
        $result = $stmt->get_result();

        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function removeCommentById($commentid)
    {
        $query = "DELETE FROM comment WHERE commentid=?";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param("i", $commentid);
        $stmt->execute();
        $stmt->close();
    }


    public function getPostById($postid)
    {
        $query = "SELECT postid, author, img, content, createdAt FROM post WHERE postid=?";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param("i", $postid);
        $stmt->execute();
        $result = $stmt->get_result();

        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function removePostById($postid)
    {
        $query = "DELETE FROM post WHERE postid=?";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param("i", $postid);
        $stmt->execute();
        $stmt->close();
    }

    public function doesUserAlreadyLikeComment($userid, $commentid)
    {
        $query = "SELECT COUNT(*) FROM user_likes_comment WHERE user=? AND comment=?";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param("ii", $userid, $commentid);
        $stmt->execute();
        $stmt->bind_result($count);
        $stmt->fetch();
        $stmt->close();

        if ($count == 0) {
            return false;
        } else {
            return true;
        }
    }

    public function addLikeToComment($userid, $commentid)
    {
        $query = "INSERT INTO `user_likes_comment` (`user`, `comment`) VALUES (?, ?)";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param("ii", $userid, $commentid);
        $stmt->execute();
        $stmt->close();
        $this->updateCommentLikesCount($commentid);
    }

    public function removeLikeFromComment($userid, $commentid)
    {
        $query = "DELETE FROM user_likes_comment WHERE user=? AND comment=?";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param("ii", $userid, $commentid);
        $stmt->execute();
        $stmt->close();
        $this->updateCommentLikesCount($commentid);
    }

    public function updateCommentLikesCount($commentid)
    {
        $countQuery = "SELECT COUNT(*) as likes FROM user_likes_comment WHERE comment=?";
        $stmt = $this->db->prepare($countQuery);
        $stmt->bind_param("i", $commentid);
        $stmt->execute();
        $result = $stmt->get_result();
        $likes = $result->fetch_all(MYSQLI_ASSOC)[0]['likes'];

        $query = "UPDATE comment SET likes = ? WHERE commentid = ?";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param("ii", $likes, $commentid);
        $stmt->execute();
    }

    public function doesUserExistByUsername($username)
    {
        $query = "SELECT COUNT(*) FROM user WHERE username=?";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param("s", $username);
        $stmt->execute();
        $stmt->bind_result($count);
        $stmt->fetch();
        $stmt->close();

        if ($count == 0) {
            return false;
        } else {
            return true;
        }
    }

    /**
     * Returns the user id given his/hers/its username.
     */
    public function getUserIdByUsername($username)
    {
        $query = "SELECT userid FROM user WHERE username=?";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param("s", $username);
        $stmt->execute();
        $result = $stmt->get_result();

        return $result->fetch_all(MYSQLI_ASSOC);
    }

    /**
     * Returns ordered suggestions for user with userid that sent query inputQuery.
     * Suggestions are made of a unique set of follower/following users whose
     * usernames are matched against an input query.
     * Limited to max N(=5) results
     */
    public function getSearchSuggestions($userid, $inputQuery, $maxSuggestions)
    {
        /*$query = "SELECT DISTINCT u.username, u.userimg 
        FROM (
            SELECT followed AS userid FROM user_follows_user WHERE follower = ? UNION
            SELECT follower AS userid FROM user_follows_user WHERE followed = ?
        ) AS relationships
        JOIN user u ON u.userid = relationships.userid
        ORDER BY CASE 
            WHEN u.username LIKE CONCAT(?, '%') THEN 1
            WHEN u.username LIKE CONCAT('%', ?, '%') THEN 2
            WHEN u.username LIKE CONCAT('%', ?) THEN 3
            ELSE 4
        END, u.username
        LIMIT ?;
        ";*/
        $query = "SELECT u.userid, u.username, u.userimg 
         FROM user u
         WHERE u.username LIKE CONCAT('%', ?, '%') 
         ORDER BY CASE 
             WHEN u.username LIKE ? THEN 1
             WHEN u.username LIKE CONCAT(?, '%') THEN 2
             WHEN u.username LIKE CONCAT('%', ?, '%') THEN 3
             WHEN u.username LIKE CONCAT('%', ?) THEN 4
             ELSE 5
         END, u.username
         LIMIT ?;
         ";
        $stmt = $this->db->prepare($query);
        //$stmt->bind_param("iisssi", $userid, $userid, $inputQuery, $inputQuery, $inputQuery, $maxSuggestions);
        $stmt->bind_param("sssssi", $inputQuery, $inputQuery, $inputQuery, $inputQuery, $inputQuery, $maxSuggestions);
        $stmt->execute();
        $result = $stmt->get_result();

        return $result->fetch_all(MYSQLI_ASSOC);
    }

    /**
     * Returns the full user record given his/hers/its username.
     */
    private function getUserByUsername($username)
    {
        $query = "SELECT * FROM user WHERE username=?";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param("s", $username);
        $stmt->execute();
        $result = $stmt->get_result();

        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function addNotification($userid, $content)
    {
        $query = "INSERT INTO `notification` (`user`, `content`) VALUES (?, ?)";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param("is", $userid, $content);
        $stmt->execute();
        $stmt->close();
    }

    public function getLastUserNotifications($userid, $count = 10)
    {
        $query = "SELECT * FROM `notification` WHERE `user`=? ORDER BY `read` ASC, `createdAt` DESC LIMIT ?";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param("ii", $userid, $count);
        $stmt->execute();
        $result = $stmt->get_result();
        $notifications = $result->fetch_all(MYSQLI_ASSOC);

        $idsToRead = [];
        foreach ($notifications as $notification) {
            if (!$notification["read"]) {
                $idsToRead[] = $notification["id"];
            }
        }
        if (!empty($idsToRead)) {
            $this->setNotificationsReadState($idsToRead);
        }

        return $notifications;
    }

    public function getUnreadUserNotificationsCount($userid)
    {
        $query = "SELECT COUNT(*) FROM `notification` WHERE `user`=? AND `read`=0";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param("i", $userid);
        $stmt->execute();
        $result = $stmt->get_result();

        return $result->fetch_all(MYSQLI_NUM)[0][0];
    }

    protected function setNotificationsReadState($idsNotifications)
    {
        $query = "UPDATE `notification` SET `read`=1 WHERE `id` IN (" . implode(", ", $idsNotifications) . ")";
        $stmt = $this->db->prepare($query);
        $stmt->execute();
        $stmt->close();
    }

    // Add db communication methods below
}
