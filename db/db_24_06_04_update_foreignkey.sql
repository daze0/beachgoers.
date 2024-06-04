ALTER TABLE `user_follows_user` DROP FOREIGN KEY `fk_user_follows_user_followed`; 
ALTER TABLE `user_follows_user` ADD CONSTRAINT `fk_user_follows_user_followed` FOREIGN KEY (`followed`) REFERENCES `user`(`userid`) ON DELETE CASCADE ON UPDATE CASCADE; 
ALTER TABLE `user_follows_user` DROP FOREIGN KEY `fk_user_follows_user_follower`; 
ALTER TABLE `user_follows_user` ADD CONSTRAINT `fk_user_follows_user_follower` FOREIGN KEY (`follower`) REFERENCES `user`(`userid`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `user_likes_post` ADD PRIMARY KEY(`user`, `post`);

ALTER TABLE `user_likes_post` DROP FOREIGN KEY `fk_user_likes_post_user`; 
ALTER TABLE `user_likes_post` ADD CONSTRAINT `fk_user_likes_post_user` FOREIGN KEY (`user`) REFERENCES `user`(`userid`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `post` ADD CONSTRAINT `fk_post_author` FOREIGN KEY (`author`) REFERENCES `user`(`userid`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `comment` DROP FOREIGN KEY `fk_comment_user`; 
ALTER TABLE `comment` ADD CONSTRAINT `fk_comment_user` FOREIGN KEY (`user`) REFERENCES `user`(`userid`) ON DELETE CASCADE ON UPDATE CASCADE;