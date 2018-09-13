-- MySQL dump 10.13  Distrib 8.0.12, for macos10.13 (x86_64)
--
-- Host: 127.0.0.1    Database: alumni
-- ------------------------------------------------------
-- Server version	8.0.12

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `partners`
--

DROP TABLE IF EXISTS `partners`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `partners` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `companyName` varchar(50) NOT NULL,
  `companyAddress` varchar(200) NOT NULL,
  `companyIndustry` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `partners`
--

LOCK TABLES `partners` WRITE;
/*!40000 ALTER TABLE `partners` DISABLE KEYS */;
INSERT INTO `partners` VALUES (1,'AccelByte Inc.','Jl. Palagan Tentara Pelajar KM. 7 No. 27, Sariharjo, Ngaglik, Kabupaten Sleman, Yogyakarta, Indonesia 55581','Software and Technology Company Startup'),(2,'PT. ADS KOMUNIKASI INDONESIA.','Wisma Abadi Lt. 4, B3Jl. Balikpapan Kav. 29-31, Petojo Selatan, Gambir, Jakarta Pusat, 10160','Digital Agency'),(3,'PT. Amartha Mikro Fintek.','Jl. Ampera Raya No.16 Jakarta Selatan, Indonesia 12560','Financial Technology'),(4,'As Above Jewelry','United States of America','Marketplace'),(5,'PT. ARTENOV','alan Raya Tole Iskandar No.33B, Pancoran MAS, Depok, Pancoran MAS, Kota Depok, Jawa Barat 16412','Perusahaan penyedia teknologi Smart City'),(6,'PT BOX ALADIN ASIAPASIFIC','Jl. Sultan Iskandar Muda No. 5 Daerah Khusus Ibukota Jakarta 12240','Situs belanja pulsa online yang menggunakan sistem lelang'),(7,'Cozmeed Network International','Jalan Slamet Riyadi 100, Solo ','Direct Selling berbasis online dengan menawarkan produk outdoor live style.'),(8,'Content Collision','APL Office Tower, Lantai 16 Unit 9, Podomoro City (Central Park), Jl. Let. Jend. S. Parman, Kav. 28 Jakarta 11470 - Indonesia','Media Agency'),(9,'Dana Didik','Jl. Bangka, Mampang Prapatan. Jaksel','Penggalangan dana (crowdfunding) untuk pinjaman pendidikan tinggi'),(10,'DewaWeb','Jl. Panjang no. 5, Kebon Jeruk','Cloud hosting'),(11,'PT Dexa Medica','Titan Center 3rd Floor Jalan Boulevard Bintaro Block B7/B1 No. 05 Bintaro Jaya Sector 7 Tangerang 15224, Indonesia ','Perusahaan Farmasi Etikal'),(12,'Engrasia','Office 8 Senopati B1 Ground Floor Jakarta','Marketplace yang mempromosikan kerajinan asli dari pengrajin lokal'),(13,'Evhive','Jl. Timor, Gondangdia','Coworking Space'),(14,'Handmadenesia','Jl.MH Thamrin','Online marketplace para masyarakat kreatif Indonesia.'),(15,'SIAP','Komplek Kampung Padi B11, Dago Pojok - Bandung, Indonesia','Social Entrepreneurs'),(16,'Member.id','The Maja Building, 2nd Floor Jalan Kyai Maja No. 39, Gunung, Kebayoran Baru, Jakarta Selatan.','Loyalty consulting and technology'),(17,'Kumparan','Jl. Jati Murni, Jaksel','Platform Media Kolaboratif'),(18,'Nodeflux','Jl. Kemang Timur, Jaksel','Information Technology and Services'),(19,'Warung Pintar','Jl. Dr. Ide Anak Agung,Kuningan','Micro retail technology company'),(20,'PT. Zahir Internasional','Jln. Kemang Selatan 1C No. 20, Kemang, Jakarta Selatan, 12730','Business Management Software');
/*!40000 ALTER TABLE `partners` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-09-13 22:57:41
