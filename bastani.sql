-- MySQL dump 10.13  Distrib 5.7.15, for Linux (x86_64)
--
-- Host: localhost    Database: bastani
-- ------------------------------------------------------
-- Server version	5.7.13-0ubuntu0.16.04.2

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
-- Table structure for table `brands`
--

DROP TABLE IF EXISTS `brands`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `brands` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `alias` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `brands`
--

LOCK TABLES `brands` WRITE;
/*!40000 ALTER TABLE `brands` DISABLE KEYS */;
INSERT INTO `brands` VALUES (1,'Bosch'),(2,'Hitachi'),(3,'Makita'),(4,'Dewalt'),(5,'Ronix'),(6,'NEG'),(7,'AEG');
/*!40000 ALTER TABLE `brands` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `companies`
--

DROP TABLE IF EXISTS `companies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `companies` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `alias` varchar(45) CHARACTER SET utf8 NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `companies`
--

LOCK TABLES `companies` WRITE;
/*!40000 ALTER TABLE `companies` DISABLE KEYS */;
INSERT INTO `companies` VALUES (1,'معین توس'),(2,'مولن');
/*!40000 ALTER TABLE `companies` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `countries`
--

DROP TABLE IF EXISTS `countries`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `countries` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `value` varchar(2) NOT NULL DEFAULT '',
  `text` varchar(100) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=247 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `countries`
--

LOCK TABLES `countries` WRITE;
/*!40000 ALTER TABLE `countries` DISABLE KEYS */;
INSERT INTO `countries` VALUES (1,'AF','افغانستان'),(2,'AL','آلبانی'),(3,'DZ','الجزایر'),(4,'DS','ساموآی آمریکا'),(5,'AD','آندورا'),(6,'AO','آنگولا'),(7,'AI','آنگویلا'),(8,'AQ','جنوبگان'),(9,'AG','آنتیگوا و باربودا'),(10,'AR','آرژانتین'),(11,'AM','ارمنستان'),(12,'AW','آروبا'),(13,'AU','استرالیا'),(14,'AT','اتریش'),(15,'AZ','آذربایجان'),(16,'BS','باهاما'),(17,'BH','بحرین'),(18,'BD','بنگلادش'),(19,'BB','باربادوس'),(20,'BY','بلاروس'),(21,'BE','بلژیک'),(22,'BZ','بلیز'),(23,'BJ','بنین'),(24,'BM','برمودا'),(25,'BT','بوتان'),(26,'BO','بولیوی'),(27,'BA','بوسنی و هرزگوین'),(28,'BW','بوتسوانا'),(29,'BV','جزیره بووه'),(30,'BR','برزیل'),(31,'IO','قلمرو بریتانیا در اقیانوس هند'),(32,'BN','برونئی'),(33,'BG','بلغارستان'),(34,'BF','بورکینافاسو'),(35,'BI','بوروندی'),(36,'KH','کامبوج'),(37,'CM','کامرون'),(38,'CA','کانادا'),(39,'CV','کیپ ورد'),(40,'KY','جزایر کیمن'),(41,'CF','جمهوری آفریقای مرکزی'),(42,'TD','چاد'),(43,'CL','شیلی'),(44,'CN','چین'),(45,'CX','جزیره کریسمس'),(46,'CC','جزایر کوکوس'),(47,'CO','کلمبیا'),(48,'KM','کومور'),(49,'CG','کنگو'),(50,'CK','جزایر کوک'),(51,'CR','کاستاریکا'),(52,'HR','کرواسی'),(53,'CU','کوبا'),(54,'CY','قبرس'),(55,'CZ','جمهوری چک'),(56,'DK','دانمارک'),(57,'DJ','جیبوتی'),(58,'DM','دومینیکا'),(59,'DO','جمهوری دومینیکن'),(60,'TP','تیمور شرقی'),(61,'EC','اکوادور'),(62,'EG','مصر'),(63,'SV','السالوادور'),(64,'GQ','گینه استوایی'),(65,'ER','اریتره'),(66,'EE','استونی'),(67,'ET','اتیوپی'),(68,'FK','جزایر فالکلند'),(69,'FO','جزایر فارو'),(70,'FJ','فیجی'),(71,'FI','فنلاند'),(72,'FR','فرانسه'),(73,'FX','متروپولیتان فرانسه'),(74,'GF','گویان فرانسه'),(75,'PF','پلی‌نزی فرانسه'),(76,'TF','سرزمین‌های جنوبی و جنوبگانی فرانسه'),(77,'GA','گابن'),(78,'GM','گامبیا'),(79,'GE','گرجستان'),(80,'DE','آلمان'),(81,'GH','غنا'),(82,'GI','جبل طارق'),(83,'GK','گرنزی'),(84,'GR','یونان'),(85,'GL','گرینلند'),(86,'GD','گرنادا'),(87,'GP','گوادلوپ'),(88,'GU','گوآم'),(89,'GT','گواتمالا'),(90,'GN','پاپوآ گینه نو'),(91,'GW','گینه بیسائو'),(92,'GY','گویان'),(93,'HT','هائیتی'),(94,'HM','جزیره هرد و جزایر مک‌دونالد'),(95,'HN','هندوراس'),(96,'HK','هونگ کونگ'),(97,'HU','مجارستان'),(98,'IS','ایسلند'),(99,'IN','هند'),(100,'IM','جزیره من'),(101,'ID','اندونزی'),(102,'IR','ایران'),(103,'IQ','عراق'),(104,'IE','ایرلند'),(105,'IL','اسرائیل'),(106,'IT','ایتالیا'),(107,'CI','ساحل عاج'),(108,'JE','نیوجرسی'),(109,'JM','جامائیکا'),(110,'JP','ژاپن'),(111,'JO','اردن'),(112,'KZ','قزاقستان'),(113,'KE','کنیا'),(114,'KI','کیریباتی'),(115,'KP','کره شمالی'),(116,'KR','کره جنوبی'),(117,'XK','کوزوو'),(118,'KW','کویت'),(119,'KG','قرقیزستان'),(120,'LA','لائوس'),(121,'LV','لتونی'),(122,'LB','لبنان'),(123,'LS','لسوتو'),(124,'LR','لیبریا'),(125,'LY','لیبی'),(126,'LI','لیختن‌اشتاین'),(127,'LT','لیتوانی'),(128,'LU','لوکزامبورگ'),(129,'MO','ماکائو'),(130,'MK','مقدونیه'),(131,'MG','ماداگاسکار'),(132,'MW','مالاوی'),(133,'MY','مالزی'),(134,'MV','مالدیو'),(135,'ML','مالی'),(136,'MT','مالت'),(137,'MH','جزایر مارشال'),(138,'MQ','مارتینیک'),(139,'MR','موریتانی'),(140,'MU','موریس'),(141,'TY','مایوت'),(142,'MX','مکزیک'),(143,'FM','ایالات فدرال میکرونزی'),(144,'MD','مولداوی'),(145,'MC','موناکو'),(146,'MN','مغولستان'),(147,'ME','مونته‌نگرو'),(148,'MS','مونتسرات'),(149,'MA','مراکش'),(150,'MZ','موزامبیک'),(151,'MM','میانمار'),(152,'NA','نامیبیا'),(153,'NR','نائورو'),(154,'NP','نپال'),(155,'NL','هلند'),(156,'AN','کوراسائو'),(157,'NC','کالدونیای جدید'),(158,'NZ','نیوزیلند'),(159,'NI','نیکاراگوئه'),(160,'NE','نیجر'),(161,'NG','نیجریه'),(162,'NU','نیووی'),(163,'NF','جزیره نورفک'),(164,'MP','جزایر ماریانای شمالی'),(165,'NO','نروژ'),(166,'OM','عمان'),(167,'PK','پاکستان'),(168,'PW','پالائو'),(169,'PS','فلسطین'),(170,'PA','پاناما'),(171,'PG','پاپوآ گینه نو'),(172,'PY','پاراگوئه'),(173,'PE','پرو'),(174,'PH','فیلیپین'),(175,'PN','جزایر پیت‌کرن'),(176,'PL','لهستان'),(177,'PT','پرتغال'),(178,'PR','پورتوریکو'),(179,'QA','قطر'),(180,'RE','رئونیون'),(181,'RO','رومانی'),(182,'RU','روسیه'),(183,'RW','رواندا'),(184,'KN','سنت کیتس و نویس'),(185,'LC','سنت لوسیا'),(186,'VC','سنت وینسنت و گرنادین‌ها'),(187,'WS','ساموآ'),(188,'SM','سن مارینو'),(189,'ST','سائوتومه و پرنسیپ'),(190,'SA','عربستان صعودی'),(191,'SN','سنگال'),(192,'RS','صربستان'),(193,'SC','سیشل'),(194,'SL','سیرالئون'),(195,'SG','سنگاپور'),(196,'SK','اسلواکی'),(197,'SI','اسلوونی'),(198,'SB','جزایر سلیمان'),(199,'SO','سومالی'),(200,'ZA','آفریقای جنوبی'),(201,'GS','جزایر جورجیای جنوبی و ساندویچ جنوبی'),(202,'ES','اسپانیا'),(203,'LK','سری‌لانکا'),(204,'SH','سنت هلن'),(205,'PM','سن-پیر-ا-میکلون'),(206,'SD','سودان'),(207,'SR','سورینام'),(208,'SJ','سوالبارد و یان ماین'),(209,'SZ','سوازیلند'),(210,'SE','سوئد'),(211,'CH','سوئیس'),(212,'SY','سوریه'),(213,'TW','تایوان'),(214,'TJ','تاجیکستان'),(215,'TZ','تانزانیا'),(216,'TH','تایلند'),(217,'TG','توگو'),(218,'TK','توکلائو'),(219,'TO','تونگا'),(220,'TT','ترینیداد و توباگو'),(221,'TN','تونس'),(222,'TR','ترکیه'),(223,'TM','ترکمنستان'),(224,'TC','جزایر تورکس و کایکوس'),(225,'TV','تووالو'),(226,'UG','اوگاندا'),(227,'UA','اکراین'),(228,'AE','امارات متحده عربی'),(229,'GB','بریتانیا'),(230,'US','ایالات متحده آمریکا'),(231,'UM','جزایر کوچک حاشیه‌ای ایالات متحده آمریکا'),(232,'UY','اروگوئه'),(233,'UZ','ازبکستان'),(234,'VU','وانواتو'),(235,'VA','واتیکان'),(236,'VE','ونزوئلا'),(237,'VN','ویتنام'),(238,'VG','جزایر ویرجین بریتانیا'),(239,'VI','جزایر ویرجین ایالات متحده آمریکا'),(240,'WF','والیس و فوتونا'),(241,'EH','صحرای غربی'),(242,'YE','یمن'),(243,'YU','یوگوسلاوی'),(244,'ZR','زئیر'),(245,'ZM','زامبیا'),(246,'ZW','زیمباوه');
/*!40000 ALTER TABLE `countries` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `groups`
--

DROP TABLE IF EXISTS `groups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `groups` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `alias` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `groups`
--

LOCK TABLES `groups` WRITE;
/*!40000 ALTER TABLE `groups` DISABLE KEYS */;
INSERT INTO `groups` VALUES (1,'لبه چسبان'),(2,'دور كن'),(3,'سوراخ زن الیت'),(4,'CNC'),(5,'CNC فرز'),(6,'نوار PVC'),(7,'اره تیز كنی'),(8,'پرس وكیوم '),(9,'اره های افقی بر'),(10,'حكاكی لیزری'),(11,'روكش ام دی اف'),(12,'كرنر زن'),(13,'پانل بر'),(14,'پرس ملامینه'),(15,'مكنده صنعتی'),(16,'فرز میزی'),(17,'پوشال مرغداری'),(18,'CNC خراطی'),(19,'روكش یو وی'),(20,'خط تولید نئوپان'),(21,'روكش هایگلاس'),(22,'رولینگ خم كن'),(23,'رول فرمینگ'),(24,'گیوتین هیدرولیك'),(25,'كارواش'),(26,'سایر محصولات'),(27,'مکنده'),(28,'دریل'),(29,'فرز'),(30,'نامشخص');
/*!40000 ALTER TABLE `groups` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `industries`
--

DROP TABLE IF EXISTS `industries`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `industries` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `alias` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `industries`
--

LOCK TABLES `industries` WRITE;
/*!40000 ALTER TABLE `industries` DISABLE KEYS */;
INSERT INTO `industries` VALUES (1,'چوب و ام‌دی‌اف'),(2,'فلز');
/*!40000 ALTER TABLE `industries` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `code` varchar(45) NOT NULL,
  `model` varchar(45) NOT NULL,
  `year` int(11) NOT NULL,
  `country` varchar(2) NOT NULL,
  `used` tinyint(1) NOT NULL DEFAULT '0',
  `brand` int(11) DEFAULT NULL,
  `industry` int(11) DEFAULT NULL,
  `group` int(11) DEFAULT NULL,
  `company` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (14,'لبه چسبان','M0031','EB-101',2016,'CN',0,1,1,1,2);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  `alias` varchar(45) CHARACTER SET utf8 NOT NULL,
  PRIMARY KEY (`id`,`username`,`password`,`alias`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'bastani','123456','آقای باستانی');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2016-09-26 18:33:04
