ALTER TABLE `user_likes_post` DROP FOREIGN KEY `fk_user_likes_post_post`; 
ALTER TABLE `user_likes_post` 
    ADD CONSTRAINT `fk_user_likes_post_post` 
    FOREIGN KEY (`post`) 
    REFERENCES `post`(`postid`)
    ON DELETE CASCADE 
    ON UPDATE CASCADE;

ALTER TABLE `comment` DROP FOREIGN KEY `fk_comment_post`; 
ALTER TABLE `comment` 
    ADD CONSTRAINT `fk_comment_post` 
    FOREIGN KEY (`post`) 
    REFERENCES `post`(`postid`) 
    ON DELETE CASCADE 
    ON UPDATE CASCADE;