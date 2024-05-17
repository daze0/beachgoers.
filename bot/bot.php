<?php
class BotHelper{
    private $token;
    private $dbh; //DatabaseHelper

    public function __construct($token, $dbh){
        $this->token = $token;
        $this->dbh = $dbh;
    }

    public function sendBotActivatedNotification($user): bool{
        return $this->sendMessage($user, "Beachgoers notification activated!");
    }

    public function sendNewLikeNotification($post, $postAuthor, $user): bool{
        //TODO UPDATE TEXT
        return $this->sendMessage($postAuthor, "New Like to your post ...");
    }

    public function sendNewCommentLikeNotification($comment, $commentAuthor, $user): bool{
        //TODO UPDATE TEXT
        return $this->sendMessage($commentAuthor, "New Like to your comment ...");
    }

    public function sendNewCommentNotification($post, $postAuthor, $commentText, $commentAuthor): bool{
        //TODO UPDATE TEXT
        return $this->sendMessage($postAuthor, "New comment to your post...");
    }

    public function sendNewFollowerNotification($followed, $follower): bool{
        $followerUrl = BASE_URL."profile.php?uid=".$follower["userid"];
        $text = '<b><a href="'.$followerUrl.'">'.$follower["username"]."</a></b> started following you! 🚀";
        return $this->sendMessage(
            $followed, 
            $text
        );
    }

    public function updateChatsIds(){
        $url = "https://api.telegram.org/bot{$this->token}/getUpdates";
        $result = file_get_contents($url);
        $data = json_decode($result, true);
        if($data["ok"]){
            $lastUpdateId = null;
            foreach($data["result"] as $updateResult){
                $message = $updateResult["message"];
                $chat = $message["chat"];
                $chat_id = $chat["id"];
                $telegram_username = $chat["username"];
                if($this->dbh->updateUserTelegramChatId($telegram_username, $chat_id)){
                    $user = $this->dbh->getUserByTelegramUsername($telegram_username)[0];
                    $this->sendBotActivatedNotification($user);
                }
                $lastUpdateId = $updateResult["update_id"];
            }

            if(isset($lastUpdateId)){
                //reset getUpdates list
                $query = http_build_query([
                    'offset' => $lastUpdateId + 1,
                ]);
                $url = "https://api.telegram.org/bot{$this->token}/getUpdates?{$query}";
                $result = file_get_contents($url);
            }
        }
    }

    protected function sendMessage($user, $text): bool{
        $chatId = $user["telegramChatId"];
        if(empty($chatId) || empty($text)){
            return false;
        }

        $this->dbh->addNotification($user["userid"], $text);

        $query = http_build_query([
            'chat_id' => $chatId,
            'text' => $text,
            'parse_mode' => 'HTML'
        ]);
        $url = "https://api.telegram.org/bot{$this->token}/sendMessage?{$query}";
        $result = file_get_contents($url);
        $resultData = json_decode($result, true);
        return $resultData['ok'];
    }
}
