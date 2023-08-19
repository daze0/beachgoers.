INSERT INTO `user` (`username`, `password`, `email`, `name`, `surname`, `userimg`) VALUES
('workabroad101', 'iamasc4mm3r', 'workabroad101@info.com', 'Eddie', 'Romero', 'profile-picture.png'),
('willsmith', 'actuallyn0tW1llSm1th', 'willsmith@gmail.com', 'Ronnie', 'Blakey', 'profile-picture.png'),
('forgetaboutme', 'rememberm3', 'johnwillings@hotmail.com', 'John', 'Willings', 'profile-picture.png');

ALTER TABLE `user`
    MODIFY `userid` INT NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

INSERT INTO `post` (`author`, `img`, `content`) VALUES
(1, 'promo.png', 'Tired of the same routine? We got your back by providing you the opportunity to give a switch to your life. Register now before our promo ends!');

ALTER TABLE `post`
    MODIFY `postid` INT NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

INSERT INTO `comment` (`user`, `post`, `comment`, `likes`) VALUES
(2, 1, 'Different page, same bullshit.', 145),
(3, 1, "I'm in, who's with me?", 2);

ALTER TABLE `comment`
    MODIFY `commentid` INT NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

INSERT INTO `user_likes_post` (`user`, `post`) VALUES
(3, 1);

INSERT INTO `user_follows_user` (`followed`, `follower`) VALUES
(1, 3),
(3, 1),
(3, 2);