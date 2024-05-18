CREATE TABLE `connectu`.`notification` (
    `id` INT NOT NULL AUTO_INCREMENT , 
    `user` INT NOT NULL , 
    `content` TEXT NOT NULL , 
    `read` TINYINT NOT NULL DEFAULT '0' , 
    `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP , 
    PRIMARY KEY (`id`)
) ENGINE = InnoDB;

ALTER TABLE `notification` 
    ADD CONSTRAINT `fk_notification_user` 
    FOREIGN KEY (`user`) 
    REFERENCES `user`(`userid`) 
    ON DELETE CASCADE 
    ON UPDATE CASCADE;