-- MySQL Script generated by MySQL Workbench
-- Thu Jun  8 15:02:10 2023
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema beachgoers
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema beachgoers
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `beachgoers` ;
USE `beachgoers` ;

-- -----------------------------------------------------
-- Table `beachgoers`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `beachgoers`.`user` (
  `userid` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(20) NOT NULL,
  `password` CHAR(128) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `surname` VARCHAR(45) NOT NULL,
  `userimg` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`userid`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `beachgoers`.`user_follows_user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `beachgoers`.`user_follows_user` (
  `followed` INT NOT NULL,
  `follower` INT NOT NULL,
  INDEX `fk_user_follows_user_followed_idx` (`followed` ASC),
  INDEX `fk_user_follows_user_follower_idx` (`follower` ASC),
  CONSTRAINT `fk_user_follows_user_followed`
    FOREIGN KEY (`followed`)
    REFERENCES `beachgoers`.`user` (`userid`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_user_follows_user_follower`
    FOREIGN KEY (`follower`)
    REFERENCES `beachgoers`.`user` (`userid`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `beachgoers`.`post`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `beachgoers`.`post` (
  `postid` INT NOT NULL AUTO_INCREMENT,
  `author` INT NOT NULL,
  `img` VARCHAR(45) NOT NULL,
  `content` VARCHAR(200) NOT NULL,
  PRIMARY KEY (`postid`),
  INDEX `fk_post_author_idx` (`author` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `beachgoers`.`user_likes_post`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `beachgoers`.`user_likes_post` (
  `user` INT NOT NULL,
  `post` INT NOT NULL,
  INDEX `fk_user_likes_post_user_idx` (`user` ASC),
  INDEX `fk_user_likes_post_post_idx` (`post` ASC),
  CONSTRAINT `fk_user_likes_post_user`
    FOREIGN KEY (`user`)
    REFERENCES `beachgoers`.`user` (`userid`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_user_likes_post_post`
    FOREIGN KEY (`post`)
    REFERENCES `beachgoers`.`post` (`postid`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `beachgoers`.`comment`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `beachgoers`.`comment` (
  `commentid` INT NOT NULL AUTO_INCREMENT,
  `user` INT NOT NULL,
  `post` INT NOT NULL,
  `comment` VARCHAR(45) NOT NULL,
  `likes` INT NOT NULL DEFAULT 0,
  PRIMARY KEY (`commentid`),
  INDEX `fk_comment_user_idx` (`user` ASC),
  INDEX `fk_comment_post_idx` (`post` ASC),
  CONSTRAINT `fk_comment_user`
    FOREIGN KEY (`user`)
    REFERENCES `beachgoers`.`user` (`userid`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_comment_post`
    FOREIGN KEY (`post`)
    REFERENCES `beachgoers`.`post` (`postid`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
