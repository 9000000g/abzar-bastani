-- MySQL dump 10.13  Distrib 5.7.16, for Linux (x86_64)
--
-- Host: localhost    Database: bastani
-- ------------------------------------------------------
-- Server version	5.7.16-0ubuntu0.16.04.1

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
  `job` varchar(45) CHARACTER SET utf8 DEFAULT NULL,
  `address` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `phone` varchar(45) DEFAULT NULL,
  `fax` varchar(45) DEFAULT NULL,
  `site` varchar(45) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `description` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `companies`
--

LOCK TABLES `companies` WRITE;
/*!40000 ALTER TABLE `companies` DISABLE KEYS */;
INSERT INTO `companies` VALUES (1,'ابزار باستانی','فروش ماشیت آلات صنعتی','تهران، بزرگراه آیت اله سعیدی، شهرک صنعتی چهار دانگه، بین خیابان 19 و 20، جنب پمپ بنزین','09191133181',NULL,'www.abzarbastani.com',NULL,NULL),(2,'پیشگام فن آوران آرکا','پرینتر سه بعدی','تهران ، خیابان شهید بهشتی، خیابان مفتح شمالی، کوچه دهم، پلاک 2، طبقه 3، واحد 13','88175509','88176679','www.arka3dprinter.com','info@arka3dprinter.com','فروش پرینترهای سه بعدی فروش فیلامنت طراحی محصول خدمات پرینت سه بعدی');
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
INSERT INTO `countries` VALUES (10,'AR','آرژانتین'),(30,'BR','برزیل'),(38,'CA','کانادا'),(44,'CN','چین'),(47,'CO','کلمبیا'),(56,'DK','دانمارک'),(72,'FR','فرانسه'),(80,'DE','آلمان'),(84,'GR','یونان'),(99,'IN','هند'),(102,'IR','ایران'),(104,'IE','ایرلند'),(105,'IL','اسرائیل'),(106,'IT','ایتالیا'),(110,'JP','ژاپن'),(115,'KP','کره شمالی'),(116,'KR','کره جنوبی'),(155,'NL','هلند'),(182,'RU','روسیه'),(190,'SA','عربستان صعودی'),(200,'ZA','آفریقای جنوبی'),(202,'ES','اسپانیا'),(213,'TW','تایوان'),(216,'TH','تایلند'),(222,'TR','ترکیه'),(223,'TM','ترکمنستان'),(230,'US','آمریکا');
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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `groups`
--

LOCK TABLES `groups` WRITE;
/*!40000 ALTER TABLE `groups` DISABLE KEYS */;
INSERT INTO `groups` VALUES (1,'ماشین‌آلات'),(2,'ابزارآلات');
/*!40000 ALTER TABLE `groups` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `importers`
--

DROP TABLE IF EXISTS `importers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `importers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `alias` varchar(45) CHARACTER SET utf8 NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `importers`
--

LOCK TABLES `importers` WRITE;
/*!40000 ALTER TABLE `importers` DISABLE KEYS */;
INSERT INTO `importers` VALUES (1,'معین توس'),(2,'مولن');
/*!40000 ALTER TABLE `importers` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `industries`
--

LOCK TABLES `industries` WRITE;
/*!40000 ALTER TABLE `industries` DISABLE KEYS */;
INSERT INTO `industries` VALUES (1,'چوب و ام‌دی‌اف'),(2,'فلز'),(3,'لاستیک و پلاستیک'),(4,'ساختمان');
/*!40000 ALTER TABLE `industries` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `messages`
--

DROP TABLE IF EXISTS `messages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `messages` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user` int(11) DEFAULT NULL,
  `message` varchar(1455) DEFAULT NULL,
  `product` varchar(45) DEFAULT NULL,
  `read` tinyint(1) DEFAULT '0',
  `type` int(11) DEFAULT NULL COMMENT '1 for buy (product code should be one of products)\n2 for sale \n3 for buyNewItem (not in products)\n4 for normal messages\n5 for ads',
  `date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `confirmed` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `messages`
--

LOCK TABLES `messages` WRITE;
/*!40000 ALTER TABLE `messages` DISABLE KEYS */;
INSERT INTO `messages` VALUES (1,3,'سلام. خیلی محصول خوبی به نظر میرسه. همینو میخوام.','M0031',1,1,'2016-12-15 23:48:20',0),(2,1,'سلام. من یه محصولی جدید میخوام. دارین؟',NULL,1,3,'2016-12-16 02:23:36',0),(3,1,'dsfsf',NULL,1,3,'2016-12-24 08:11:58',0),(4,1,'سلام. چند؟','M0031',1,1,'2016-12-30 08:27:31',1),(5,1,'این محصول رو میخوام به شما بفروشم.',NULL,1,2,'2016-12-30 08:31:33',0),(6,1,'دستگاه بالابر جدید شرکت ابر رایانه',NULL,1,5,'2016-12-30 08:47:15',1),(7,1,'این یک درخواست بصورت تست میباشد. اتریبیوت ng-model همانطور که از نامش پیداست، برای دریافت مدل استفاده می‌شود. مقادیری که در اتریبیوت‌های دل‌بخواهی on-value و off-value وارد می‌شود، برای مقدار مدل، هنگام انتخاب‌شده و بالعکس استفاده می‌شود. در صورتی که این دو اتریبیوت مقداردهی نشوند، true و false در نظر گرفته می‌شود.\r\n\r\nهمچنین در نظر داشته باشید که اگر مقدار ngModel در ابتدای کار مقداری خارج از onValue یا offValue باشد، مقدار offValue به طور پیش‌فرض برای آن در نظر گرفته می‌شود.',NULL,1,5,'2016-12-30 10:02:36',0);
/*!40000 ALTER TABLE `messages` ENABLE KEYS */;
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
  `subgroup` int(11) DEFAULT NULL,
  `importer` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (14,'لبه چسبان','M0031','EB-101',2016,'CN',0,1,1,1,1,2),(15,'دستگاه خوب','x273','x273',1987,'CN',1,2,2,2,25,2),(16,'آل کلر','x897','e225',1879,'AL',1,2,2,2,2,2),(17,'A2','A222','8742',19999,'DZ',0,6,2,2,2,2),(18,'تست','zcxzxc','sdcsc',234234,'TM',0,NULL,NULL,NULL,NULL,NULL),(19,'تست جدید','ab556','84',1987,'TW',0,5,1,2,29,1),(20,'test jadid','x599','A220',1998,'IN',0,6,1,1,24,-1),(21,'تست جدید','x2222','1231231',1788,'TH',1,3,1,1,30,1),(22,'dfsdfsdf','sdfsdfsdf','dsfsdfds',234234,'TW',0,3,1,2,25,2),(23,'تست جدید','sdaasd','asdsadasd',234234,'TW',1,4,3,1,27,1);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subgroups`
--

DROP TABLE IF EXISTS `subgroups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `subgroups` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `alias` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subgroups`
--

LOCK TABLES `subgroups` WRITE;
/*!40000 ALTER TABLE `subgroups` DISABLE KEYS */;
INSERT INTO `subgroups` VALUES (1,'لبه چسبان'),(2,'دور كن'),(3,'سوراخ زن الیت'),(4,'CNC'),(5,'CNC فرز'),(6,'نوار PVC'),(7,'اره تیز كنی'),(8,'پرس وكیوم '),(9,'اره های افقی بر'),(10,'حكاكی لیزری'),(11,'روكش ام دی اف'),(12,'كرنر زن'),(13,'پانل بر'),(14,'پرس ملامینه'),(15,'مكنده صنعتی'),(16,'فرز میزی'),(17,'پوشال مرغداری'),(18,'CNC خراطی'),(19,'روكش یو وی'),(20,'خط تولید نئوپان'),(21,'روكش هایگلاس'),(22,'رولینگ خم كن'),(23,'رول فرمینگ'),(24,'گیوتین هیدرولیك'),(25,'كارواش'),(26,'سایر محصولات'),(27,'مکنده'),(28,'دریل'),(29,'فرز'),(30,'نامشخص');
/*!40000 ALTER TABLE `subgroups` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `userproducts`
--

DROP TABLE IF EXISTS `userproducts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `userproducts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `phone` varchar(45) NOT NULL,
  `product` varchar(455) DEFAULT NULL,
  `description` varchar(455) DEFAULT NULL,
  `confirmed` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `userproducts`
--

LOCK TABLES `userproducts` WRITE;
/*!40000 ALTER TABLE `userproducts` DISABLE KEYS */;
INSERT INTO `userproducts` VALUES (18,'آقای حسنی','09123213333','دستگاه لبه پر فلان','این دستگاه سه ماه دست ما بوده. تقریبا نو هستش. برای بازدید تماس بگیرید',0),(19,'عبس حمسدس','091233213123123','دستگاه بالابر فلان','سلام این یه متن تسته',0),(20,'sdf','sdf','fsd','sdfsdf',0);
/*!40000 ALTER TABLE `userproducts` ENABLE KEYS */;
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
  `type` int(11) NOT NULL DEFAULT '1',
  `phone` varchar(45) DEFAULT NULL,
  `mobile` varchar(45) DEFAULT NULL,
  `businessName` varchar(45) CHARACTER SET utf8 DEFAULT NULL,
  `address` varchar(455) CHARACTER SET utf8 DEFAULT NULL,
  PRIMARY KEY (`id`,`username`,`password`,`alias`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'bastani','123456','آقای باستانی',1,NULL,NULL,NULL,NULL),(2,'amir','123456','Amir Agha',2,NULL,NULL,NULL,NULL),(3,'nainemom','123456','Nainemom',2,NULL,'09365586015',NULL,'تهرانپارس - خیابان استخر - بوستان هفت - پلاک 11');
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

-- Dump completed on 2016-12-30 13:53:18
