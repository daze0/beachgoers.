<?php
class BotHelper{
    private $token;
    private $dbh; //DatabaseHelper

    public function __construct($token, $dbh){
        $this->token = $token;
        $this->dbh = $dbh;
    }

    public function sendBotActivatedNotification($chat_id): bool{
        return $this->sendMessage($chat_id, "Beachgoers notification activated!");
    }

    public function sendNewLikeNotification($post, $postAuthor, $user): bool{
        //TODO UPDATE TEXT
        return $this->sendMessage($postAuthor["telegramChatId"], "New Like to your post ...");
    }

    public function sendNewCommentLikeNotification($comment, $commentAuthor, $user): bool{
        //TODO UPDATE TEXT
        return $this->sendMessage($commentAuthor["telegramChatId"], "New Like to your comment ...");
    }

    public function sendNewCommentNotification($post, $postAuthor, $commentText, $commentAuthor): bool{
        //TODO UPDATE TEXT
        return $this->sendMessage($postAuthor["telegramChatId"], "New comment to your post...");
    }

    public function sendNewFollowerNotification($followed, $follower): bool{
        //TODO UPDATE TEXT
        return $this->sendMessage($followed["telegramChatId"], "New follower...");
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
                    $this->sendBotActivatedNotification($chat_id);
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

    protected function sendMessage($chatId, $text): bool{
        if(empty($chatId) || empty($text)){
            return false;
        }
        $query = http_build_query([
            'chat_id' => $chatId,
            'text' => $text,
        ]);
        $url = "https://api.telegram.org/bot{$this->token}/sendMessage?{$query}";
        $result = file_get_contents($url);
        $resultData = json_decode($result, true);
        return $resultData['ok'];
    }
}
