SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

DROP SCHEMA IF EXISTS `mydb` ;
CREATE SCHEMA IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci ;
USE `mydb` ;

-- -----------------------------------------------------
-- Table `mydb`.`brand`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`brand` ;

CREATE  TABLE IF NOT EXISTS `mydb`.`brand` (
  `id` INT NOT NULL AUTO_INCREMENT ,
  `brand` VARCHAR(255) NOT NULL ,
  PRIMARY KEY (`id`) ,
  UNIQUE INDEX `brand_UNIQUE` (`brand` ASC) )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`model`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`model` ;

CREATE  TABLE IF NOT EXISTS `mydb`.`model` (
  `id` INT NOT NULL AUTO_INCREMENT ,
  `model` VARCHAR(255) NOT NULL ,
  `brand_id` INT NOT NULL ,
  PRIMARY KEY (`id`, `brand_id`) ,
  INDEX `fk_model_brand_idx` (`brand_id` ASC) ,
  UNIQUE INDEX `model_UNIQUE` (`model` ASC) ,
  CONSTRAINT `fk_model_brand`
    FOREIGN KEY (`brand_id` )
    REFERENCES `mydb`.`brand` (`id` )
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`vehicle`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`vehicle` ;

CREATE  TABLE IF NOT EXISTS `mydb`.`vehicle` (
  `id` INT NOT NULL AUTO_INCREMENT ,
  `fuel` VARCHAR(45) NOT NULL ,
  `yearModel` INT NOT NULL ,
  `brand_id` INT NOT NULL ,
  `model_id` INT NOT NULL ,
  `value` VARCHAR(45) NOT NULL ,
  PRIMARY KEY (`id`, `brand_id`, `model_id`) ,
  INDEX `fk_vehicle_brand1_idx` (`brand_id` ASC) ,
  INDEX `fk_vehicle_model1_idx` (`model_id` ASC) ,
  CONSTRAINT `fk_vehicle_brand1`
    FOREIGN KEY (`brand_id` )
    REFERENCES `mydb`.`brand` (`id` )
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_vehicle_model1`
    FOREIGN KEY (`model_id` )
    REFERENCES `mydb`.`model` (`id` )
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`user`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`user` ;

CREATE  TABLE IF NOT EXISTS `mydb`.`user` (
  `id` INT NOT NULL AUTO_INCREMENT ,
  `email` VARCHAR(255) NOT NULL ,
  `password` VARCHAR(255) NOT NULL ,
  `usertype` VARCHAR(100)  CHECK (`usertype` in ('admin', 'user')),
  PRIMARY KEY (`id`) ,
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) ,
  UNIQUE INDEX `password_UNIQUE` (`password` ASC) )
ENGINE = InnoDB;

USE `mydb` ;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
