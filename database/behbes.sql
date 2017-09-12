-- MySQL dump 10.13  Distrib 5.7.9, for Win64 (x86_64)
--
-- Host: 165.227.82.170    Database: behbes
-- ------------------------------------------------------
-- Server version	5.7.19-0ubuntu0.16.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table ` Users`
--

DROP TABLE IF EXISTS ` Users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE ` Users` (
  `UserID` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `Username` varchar(25) NOT NULL,
  `Password` varchar(255) NOT NULL,
  `Salt` varchar(10) NOT NULL,
  `FirstName` varchar(25) NOT NULL,
  `LastName` varchar(25) NOT NULL,
  `Email` varchar(45) DEFAULT NULL,
  `RegisterTimeStamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `BabyID` int(11) DEFAULT NULL,
  PRIMARY KEY (`UserID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Baby`
--

DROP TABLE IF EXISTS `Baby`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Baby` (
  `BabyID` int(11) NOT NULL AUTO_INCREMENT,
  `Name` varchar(25) NOT NULL,
  `Sex` varchar(6) DEFAULT NULL,
  `ParentID` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`BabyID`),
  KEY `UserID_idx` (`ParentID`),
  CONSTRAINT `UserID` FOREIGN KEY (`ParentID`) REFERENCES `Users` (`UserID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `History`
--

DROP TABLE IF EXISTS `History`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `History` (
  `HistoryID` int(11) NOT NULL AUTO_INCREMENT,
  `Date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `BabyID` int(11) NOT NULL,
  PRIMARY KEY (`HistoryID`),
  KEY `BabyID_idx` (`BabyID`),
  CONSTRAINT `BabyID` FOREIGN KEY (`BabyID`) REFERENCES `Baby` (`BabyID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Illnesses`
--

DROP TABLE IF EXISTS `Illnesses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Illnesses` (
  `IllnessID` int(11) NOT NULL AUTO_INCREMENT,
  `Name` varchar(45) NOT NULL,
  `Description` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`IllnessID`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Message`
--

DROP TABLE IF EXISTS `Message`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Message` (
  `MessageID` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `UserID` int(10) unsigned DEFAULT NULL,
  `MessageRoomID` int(11) DEFAULT NULL,
  `MessageText` varchar(140) DEFAULT NULL,
  `SendTime` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`MessageID`),
  KEY `MessageRoomID_idx` (`MessageRoomID`),
  KEY `UserID_idx` (`UserID`),
  CONSTRAINT `MessageRoomID` FOREIGN KEY (`MessageRoomID`) REFERENCES `MessageRoom` (`MessageRoomID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `SenderID` FOREIGN KEY (`UserID`) REFERENCES `Users` (`UserID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `MessageRoom`
--

DROP TABLE IF EXISTS `MessageRoom`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `MessageRoom` (
  `MessageRoomID` int(11) NOT NULL AUTO_INCREMENT,
  `CreationDate` timestamp NULL DEFAULT NULL,
  `CreatorID` int(10) unsigned NOT NULL,
  PRIMARY KEY (`MessageRoomID`),
  KEY `UserID_idx` (`CreatorID`),
  CONSTRAINT `CreatorID` FOREIGN KEY (`CreatorID`) REFERENCES `Users` (`UserID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Remedies`
--

DROP TABLE IF EXISTS `Remedies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Remedies` (
  `IllnessID` int(11) NOT NULL,
  `Type` varchar(14) DEFAULT NULL,
  `Hyperlink` varchar(255) NOT NULL,
  `Description` varchar(127) DEFAULT NULL,
  KEY `IllnessIDFK_idx` (`IllnessID`),
  CONSTRAINT `IllnessIDFK` FOREIGN KEY (`IllnessID`) REFERENCES `Illnesses` (`IllnessID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Session`
--

DROP TABLE IF EXISTS `Session`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Session` (
  `SessionID` varchar(36) NOT NULL,
  `UserID` int(10) unsigned DEFAULT NULL,
  `Expiration` timestamp NULL DEFAULT NULL,
  `LoginTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `LogoutTime` timestamp NULL DEFAULT NULL,
  `State` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`SessionID`),
  KEY `UserLoginID_idx` (`UserID`),
  CONSTRAINT `UserLoginID` FOREIGN KEY (`UserID`) REFERENCES `Users` (`UserID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `SymptomHistory`
--

DROP TABLE IF EXISTS `SymptomHistory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `SymptomHistory` (
  `HistoryID` int(11) NOT NULL,
  `SymptomID` int(11) NOT NULL,
  PRIMARY KEY (`HistoryID`,`SymptomID`),
  KEY `SymptomID_idx` (`SymptomID`),
  CONSTRAINT `HistID` FOREIGN KEY (`HistoryID`) REFERENCES `History` (`HistoryID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `SympID` FOREIGN KEY (`SymptomID`) REFERENCES `Symptoms` (`SymptomID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `SymptomIllness`
--

DROP TABLE IF EXISTS `SymptomIllness`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `SymptomIllness` (
  `SymptomID` int(11) NOT NULL,
  `IllnessID` int(11) NOT NULL,
  PRIMARY KEY (`SymptomID`,`IllnessID`),
  KEY `illnessID_idx` (`IllnessID`),
  CONSTRAINT `SymptomID` FOREIGN KEY (`SymptomID`) REFERENCES `Symptoms` (`SymptomID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `illnessID` FOREIGN KEY (`IllnessID`) REFERENCES `Illnesses` (`IllnessID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Symptoms`
--

DROP TABLE IF EXISTS `Symptoms`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Symptoms` (
  `SymptomID` int(11) NOT NULL AUTO_INCREMENT,
  `Description` varchar(120) NOT NULL,
  PRIMARY KEY (`SymptomID`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Users`
--

DROP TABLE IF EXISTS `Users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Users` (
  `UserID` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `Username` varchar(25) NOT NULL,
  `Password` varchar(255) NOT NULL,
  `Salt` varchar(10) NOT NULL,
  `FirstName` varchar(25) NOT NULL,
  `LastName` varchar(25) NOT NULL,
  `Email` varchar(45) DEFAULT NULL,
  `RegisterTimeStamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`UserID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping routines for database 'behbes'
--
/*!50003 DROP PROCEDURE IF EXISTS `CloseSession` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`behbes_master_user`@`%` PROCEDURE `CloseSession`(IN Token VARCHAR(36))
BEGIN

	UPDATE Session
    SET LogoutTime = NOW(), State=False
    WHERE SessionID=Token;
    SELECT "True" as status;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `CreateSession` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`behbes_master_user`@`%` PROCEDURE `CreateSession`(IN UserID INT, INOUT Token VARCHAR(36))
BEGIN
	SET Token= UUID();
    INSERT INTO Session(UserID, SessionID,LoginTime, Expiration)
	VALUES (UserID,Token,NOW(),DATE_ADD(NOW(),INTERVAL 5 DAY));
    SELECT Token;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `CreateUser` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`behbes_master_user`@`%` PROCEDURE `CreateUser`(IN UsernameVal VARCHAR(25), PasswordHashVal VARCHAR(255), FirstNameVal VARCHAR(25), LastNameVal VARCHAR(25), EmailVal VARCHAR(45), SaltVal VARCHAR(10))
BEGIN
	INSERT INTO Users(Username, Password, FirstName, LastName, Salt, Email, RegisterTimeStamp)
    VALUES (UsernameVal, PasswordHashVal, FirstNameVal, LastNameVal, SaltVal,EmailVal, NOW());
    SELECT "True" AS STATUS;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `GetCountSymptomsPerIllness` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`behbes_master_user`@`%` PROCEDURE `GetCountSymptomsPerIllness`()
BEGIN
select i1.Name,count(*) from SymptomIllness as s1 INNER JOIN Symptoms as s2 ON s1.SymptomID=s2.SymptomID INNER JOIN Illnesses as i1 ON s1.IllnessID = i1.IllnessID GROUP BY i1.Name;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `GetSalt` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`behbes_master_user`@`%` PROCEDURE `GetSalt`(IN UsernameVal VARCHAR(25))
BEGIN
	SELECT Salt FROM Users WHERE Username=UsernameVal;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `ValidateSession` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`behbes_master_user`@`%` PROCEDURE `ValidateSession`(IN TokenVal VARCHAR(36))
BEGIN
	IF EXISTS (SELECT UserID FROM Session WHERE SessionID=TokenVal)
    THEN
		SELECT UserID FROM Session WHERE SessionID=TokenVal AND Expiration>NOW() AND State=True;
	END IF;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `ValidateUser` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`behbes_master_user`@`%` PROCEDURE `ValidateUser`(IN UsernameVal VARCHAR(25), PasswordHash VARCHAR(255))
BEGIN
DECLARE ReturnUserID INT;
DECLARE SessionToken VARCHAR(36);
DECLARE ReturnFirstName VARCHAR(25);
DECLARE ReturnLastName VARCHAR(25);
DECLARE ReturnEmail VARCHAR(25);
	IF EXISTS (SELECT UserID FROM Users WHERE Username=UsernameVal AND Password=PasswordHash)
    THEN 
		SET ReturnUserID = (SELECT UserID FROM Users WHERE Username=UsernameVal AND Password=PasswordHash);
		SET ReturnFirstName = (SELECT FirstName FROM Users WHERE Username=UsernameVal AND Password=PasswordHash);
		SET ReturnLastName = (SELECT LastName FROM Users WHERE Username=UsernameVal AND Password=PasswordHash);
		SET ReturnEmail = (SELECT Email FROM Users WHERE Username=UsernameVal AND Password=PasswordHash);
		
        CALL CreateSession(ReturnUserID, SessionToken);
		SELECT ReturnUserID as UserID, SessionToken as Token, ReturnFirstName as FirstName, ReturnLastName as LastName, ReturnEmail as Email;
	END IF; 
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-09-08 21:33:46
