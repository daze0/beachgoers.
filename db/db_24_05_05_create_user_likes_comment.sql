CREATE TABLE `connectu`.`user_likes_comment` (`user` INT NOT NULL , `comment` INT NOT NULL , PRIMARY KEY (`user`, `comment`)) ENGINE = InnoDB;
ALTER TABLE `user_likes_comment` ADD CONSTRAINT `fk_user_likes_comment_user` FOREIGN KEY (`user`) REFERENCES `user`(`userid`) ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE `user_likes_comment` ADD CONSTRAINT `fk_user_likes_comment_comment` FOREIGN KEY (`comment`) REFERENCES `comment`(`commentid`) ON DELETE CASCADE ON UPDATE CASCADE;