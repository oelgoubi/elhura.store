-- MySQL dump 10.13  Distrib 5.7.33, for Linux (x86_64)
--
-- Host: localhost    Database: elhura_db
-- ------------------------------------------------------
-- Server version	5.7.33

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
-- Table structure for table `Address`
--

DROP TABLE IF EXISTS `Address`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Address` (
  `idAddress` int(11) NOT NULL,
  `street` varchar(254) DEFAULT NULL,
  `postalCode` int(11) DEFAULT NULL,
  `city` varchar(254) DEFAULT NULL,
  `region` varchar(254) DEFAULT NULL,
  `country` varchar(254) DEFAULT NULL,
  PRIMARY KEY (`idAddress`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Address`
--

LOCK TABLES `Address` WRITE;
/*!40000 ALTER TABLE `Address` DISABLE KEYS */;
/*!40000 ALTER TABLE `Address` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Admin`
--

DROP TABLE IF EXISTS `Admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Admin` (
  `idUser` int(11) NOT NULL,
  `idAddress` int(11) DEFAULT NULL,
  `idRole` int(11) DEFAULT NULL,
  `username` varchar(254) DEFAULT NULL,
  `password` varchar(254) DEFAULT NULL,
  `email` varchar(254) DEFAULT NULL,
  `firstName` varchar(254) DEFAULT NULL,
  `lastName` varchar(254) DEFAULT NULL,
  `birthDate` datetime DEFAULT NULL,
  `birthPlace` varchar(254) DEFAULT NULL,
  `isValid` tinyint(1) NOT NULL DEFAULT '0',
  `validationCode` varchar(6) DEFAULT NULL,
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`idUser`),
  KEY `FK_adminAddress` (`idAddress`),
  KEY `FK_userRole` (`idRole`),
  CONSTRAINT `FK_adminAddress` FOREIGN KEY (`idAddress`) REFERENCES `Address` (`idAddress`),
  CONSTRAINT `FK_userRole` FOREIGN KEY (`idRole`) REFERENCES `Role` (`idRole`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Admin`
--

LOCK TABLES `Admin` WRITE;
/*!40000 ALTER TABLE `Admin` DISABLE KEYS */;
/*!40000 ALTER TABLE `Admin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Article`
--

DROP TABLE IF EXISTS `Article`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Article` (
  `idArticle` int(11) NOT NULL,
  `idCategory` int(11) DEFAULT NULL,
  `idUser` int(11) DEFAULT NULL,
  `designation` varchar(254) DEFAULT NULL,
  `unitPrice` decimal(8,0) DEFAULT NULL,
  `wholesalePrice` decimal(8,0) DEFAULT NULL,
  `avatarUrl` text,
  `description` text,
  PRIMARY KEY (`idArticle`),
  KEY `FK_articleCategory` (`idCategory`),
  KEY `FK_articleCompany` (`idUser`),
  CONSTRAINT `FK_articleCategory` FOREIGN KEY (`idCategory`) REFERENCES `Category` (`idCategory`),
  CONSTRAINT `FK_articleCompany` FOREIGN KEY (`idUser`) REFERENCES `Company` (`idUser`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Article`
--

LOCK TABLES `Article` WRITE;
/*!40000 ALTER TABLE `Article` DISABLE KEYS */;
INSERT INTO `Article` VALUES (1,1,3,'MSI',400,395,'https://images-na.ssl-images-amazon.com/images/I/818rz3CIaFL._AC_SL1500_.jpg','3-layered Stainless steel filter traps the smallest coffee grounds to produce an exceptional full-bodied flavor, filter is easy to disassemble and clean.'),(2,1,3,'MSI',400,395,'https://images-na.ssl-images-amazon.com/images/I/71FhMLBP9XL._AC_SL1500_.jpg','No two coffee drinkers are the same – so, the flexibility to customize how and what you brew is key. From fresh grounds to K-Cup pods, the Hamilton Beach FlexBrew 2-Way Coffee Maker gives you the options to please fans of all types of coffees.'),(3,1,3,'Keurig K-Duo',300,295,'https://images-na.ssl-images-amazon.com/images/I/61-KUPluVYL._AC_SL1500_.jpg','Use both ground coffee and k-cup pods. Multiple brew sizes: brew an 8, 10, or 12-cup carafe and an 237, 296, or 355ml (8, 10, or 12 oz. ) cup ');
/*!40000 ALTER TABLE `Article` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `CartElement`
--

DROP TABLE IF EXISTS `CartElement`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `CartElement` (
  `idCartElement` int(11) NOT NULL,
  `idArticle` int(11) DEFAULT NULL,
  `idUser` int(11) DEFAULT NULL,
  `quantityArticleCartElement` int(11) DEFAULT NULL,
  PRIMARY KEY (`idCartElement`),
  KEY `FK_cartElementArticle` (`idArticle`),
  KEY `FK_cartElementClient` (`idUser`),
  CONSTRAINT `FK_cartElementArticle` FOREIGN KEY (`idArticle`) REFERENCES `Article` (`idArticle`),
  CONSTRAINT `FK_cartElementClient` FOREIGN KEY (`idUser`) REFERENCES `Client` (`idUser`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `CartElement`
--

LOCK TABLES `CartElement` WRITE;
/*!40000 ALTER TABLE `CartElement` DISABLE KEYS */;
/*!40000 ALTER TABLE `CartElement` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Category`
--

DROP TABLE IF EXISTS `Category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Category` (
  `idCategory` int(11) NOT NULL,
  `nameCategory` varchar(254) DEFAULT NULL,
  PRIMARY KEY (`idCategory`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Category`
--

LOCK TABLES `Category` WRITE;
/*!40000 ALTER TABLE `Category` DISABLE KEYS */;
INSERT INTO `Category` VALUES (1,'Laptop');
/*!40000 ALTER TABLE `Category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Client`
--

DROP TABLE IF EXISTS `Client`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Client` (
  `idUser` int(11) NOT NULL,
  `idRole` int(11) DEFAULT NULL,
  `idShipping` int(11) DEFAULT NULL,
  `idAddress` int(11) DEFAULT NULL,
  `username` varchar(254) DEFAULT NULL,
  `password` varchar(254) DEFAULT NULL,
  `email` varchar(254) DEFAULT NULL,
  `firstName` varchar(254) DEFAULT NULL,
  `lastName` varchar(254) DEFAULT NULL,
  `birthDate` datetime DEFAULT NULL,
  `birthplace` varchar(254) DEFAULT NULL,
  `isValid` tinyint(1) NOT NULL DEFAULT '0',
  `validationCode` varchar(6) DEFAULT NULL,
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`idUser`),
  KEY `FK_clientAddress` (`idAddress`),
  KEY `FK_clientShipping` (`idShipping`),
  CONSTRAINT `FK_clientAddress` FOREIGN KEY (`idAddress`) REFERENCES `Address` (`idAddress`),
  CONSTRAINT `FK_clientShipping` FOREIGN KEY (`idShipping`) REFERENCES `Shipping` (`idShipping`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Client`
--

LOCK TABLES `Client` WRITE;
/*!40000 ALTER TABLE `Client` DISABLE KEYS */;
INSERT INTO `Client` VALUES (4,1,NULL,NULL,NULL,'$2a$08$QGcviDtF8EQxvShHICb2x.9TtLrgsZlMvHfsr5ptJ/mARNwkgS1OO','mb.raharison@gmail.com',NULL,NULL,NULL,NULL,1,'496969','2021-02-08 11:03:36','2021-02-08 11:04:43');
/*!40000 ALTER TABLE `Client` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Command`
--

DROP TABLE IF EXISTS `Command`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Command` (
  `idCommand` int(11) NOT NULL,
  `dateCommand` int(11) DEFAULT NULL,
  `status` varchar(254) DEFAULT NULL,
  `commandLinesNumber` int(11) DEFAULT NULL,
  `total` int(11) DEFAULT NULL,
  PRIMARY KEY (`idCommand`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Command`
--

LOCK TABLES `Command` WRITE;
/*!40000 ALTER TABLE `Command` DISABLE KEYS */;
/*!40000 ALTER TABLE `Command` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `CommandLine`
--

DROP TABLE IF EXISTS `CommandLine`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `CommandLine` (
  `idCommandLine` int(11) NOT NULL,
  `idCommand` int(11) DEFAULT NULL,
  `idShipping` int(11) DEFAULT NULL,
  `idArticle` int(11) DEFAULT NULL,
  `quantityArticleCommandLine` int(11) DEFAULT NULL,
  `subtotal` decimal(8,0) DEFAULT NULL,
  PRIMARY KEY (`idCommandLine`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `CommandLine`
--

LOCK TABLES `CommandLine` WRITE;
/*!40000 ALTER TABLE `CommandLine` DISABLE KEYS */;
/*!40000 ALTER TABLE `CommandLine` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Company`
--

DROP TABLE IF EXISTS `Company`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Company` (
  `idUser` int(11) NOT NULL,
  `idRole` int(11) DEFAULT NULL,
  `idAddress` int(11) DEFAULT NULL,
  `username` varchar(254) DEFAULT NULL,
  `password` varchar(254) DEFAULT NULL,
  `email` varchar(254) DEFAULT NULL,
  `name` varchar(254) DEFAULT NULL,
  `siret` varchar(254) DEFAULT NULL,
  `documents` datetime DEFAULT NULL,
  `isValid` tinyint(1) NOT NULL DEFAULT '0',
  `validationCode` varchar(6) DEFAULT NULL,
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`idUser`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Company`
--

LOCK TABLES `Company` WRITE;
/*!40000 ALTER TABLE `Company` DISABLE KEYS */;
INSERT INTO `Company` VALUES (3,2,NULL,NULL,'$2a$08$/TJUrhxot7KNH/M5Bz0H6eg5Xi/1GM6x5e0xshxmAJMJyzOo8HzO2','mbola.raharison@gmail.com',NULL,NULL,NULL,0,'397053','2021-02-07 20:35:28','2021-02-07 20:35:28');
/*!40000 ALTER TABLE `Company` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Role`
--

DROP TABLE IF EXISTS `Role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Role` (
  `idRole` int(11) NOT NULL,
  `nameRole` varchar(254) DEFAULT NULL,
  PRIMARY KEY (`idRole`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Role`
--

LOCK TABLES `Role` WRITE;
/*!40000 ALTER TABLE `Role` DISABLE KEYS */;
INSERT INTO `Role` VALUES (0,'Admin'),(1,'Client'),(2,'Company');
/*!40000 ALTER TABLE `Role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Shipping`
--

DROP TABLE IF EXISTS `Shipping`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Shipping` (
  `idShipping` int(11) NOT NULL,
  `shippingAddress` int(11) DEFAULT NULL,
  `billingAddress` int(11) DEFAULT NULL,
  PRIMARY KEY (`idShipping`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Shipping`
--

LOCK TABLES `Shipping` WRITE;
/*!40000 ALTER TABLE `Shipping` DISABLE KEYS */;
/*!40000 ALTER TABLE `Shipping` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Tag`
--

DROP TABLE IF EXISTS `Tag`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Tag` (
  `idTag` int(11) NOT NULL,
  `nameTag` varchar(254) DEFAULT NULL,
  PRIMARY KEY (`idTag`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Tag`
--

LOCK TABLES `Tag` WRITE;
/*!40000 ALTER TABLE `Tag` DISABLE KEYS */;
/*!40000 ALTER TABLE `Tag` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `articleTags`
--

DROP TABLE IF EXISTS `articleTags`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `articleTags` (
  `idArticle` int(11) NOT NULL,
  `idTag` int(11) NOT NULL,
  PRIMARY KEY (`idArticle`,`idTag`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `articleTags`
--

LOCK TABLES `articleTags` WRITE;
/*!40000 ALTER TABLE `articleTags` DISABLE KEYS */;
/*!40000 ALTER TABLE `articleTags` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `favorites`
--

DROP TABLE IF EXISTS `favorites`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `favorites` (
  `idArticle` int(11) NOT NULL,
  `idUser` int(11) NOT NULL,
  PRIMARY KEY (`idArticle`,`idUser`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `favorites`
--

LOCK TABLES `favorites` WRITE;
/*!40000 ALTER TABLE `favorites` DISABLE KEYS */;
/*!40000 ALTER TABLE `favorites` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-02-08 11:15:31
