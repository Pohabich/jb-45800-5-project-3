-- phpMyAdmin SQL Dump
-- version 5.2.3
-- https://www.phpmyadmin.net/
--
-- Host: db
-- Generation Time: Jul 11, 2026 at 09:05 PM
-- Server version: 9.6.0
-- PHP Version: 8.3.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `project3`
--
CREATE DATABASE IF NOT EXISTS `project3` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;
USE `project3`;

-- --------------------------------------------------------

--
-- Table structure for table `likes`
--

DROP TABLE IF EXISTS `likes`;
CREATE TABLE IF NOT EXISTS `likes` (
  `user_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `vacation_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  PRIMARY KEY (`user_id`,`vacation_id`),
  KEY `vacation_id` (`vacation_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `likes`
--

INSERT INTO `likes` (`user_id`, `vacation_id`) VALUES
('550e8400-e29b-41d4-a716-446655440003', '1d3f5a7c-2b4e-4c6d-8a9b-5c6d7e8f9a01'),
('550e8400-e29b-41d4-a716-446655440006', '1d3f5a7c-2b4e-4c6d-8a9b-5c6d7e8f9a01'),
('550e8400-e29b-41d4-a716-446655440002', '2b6f9d3a-1c4e-4a7b-9d2c-3e4f5a6b7c81'),
('550e8400-e29b-41d4-a716-446655440004', '2b6f9d3a-1c4e-4a7b-9d2c-3e4f5a6b7c81'),
('550e8400-e29b-41d4-a716-446655440005', '2e4a6c8d-1f3b-4a7c-9d5e-7a8b9c0d1e82'),
('550e8400-e29b-41d4-a716-446655440002', '3f1c2b6a-9d4e-4d7a-8f2a-1b2c3d4e5f60'),
('550e8400-e29b-41d4-a716-446655440006', '3f1c2b6a-9d4e-4d7a-8f2a-1b2c3d4e5f60'),
('550e8400-e29b-41d4-a716-446655440003', '4a7c9e1b-2d3f-4b6a-8c5d-9e0f1a2b3c41'),
('550e8400-e29b-41d4-a716-446655440004', '4a7c9e1b-2d3f-4b6a-8c5d-9e0f1a2b3c41'),
('550e8400-e29b-41d4-a716-446655440004', '5c7e1a3b-4d6f-4a8c-9b2d-1f2a3b4c5d61'),
('550e8400-e29b-41d4-a716-446655440006', '5c7e1a3b-4d6f-4a8c-9b2d-1f2a3b4c5d61'),
('e37273e5-4135-427a-97ac-b909d69c6ed4', '5c7e1a3b-4d6f-4a8c-9b2d-1f2a3b4c5d61'),
('550e8400-e29b-41d4-a716-446655440003', '6e8a1c3d-4f5b-4a7c-9d2e-7b8c9d0e1f12'),
('550e8400-e29b-41d4-a716-446655440002', '7a9d1c2e-5b6f-4a8c-9d10-2c3b4a5e6f71'),
('550e8400-e29b-41d4-a716-446655440003', '7a9d1c2e-5b6f-4a8c-9d10-2c3b4a5e6f71'),
('e37273e5-4135-427a-97ac-b909d69c6ed4', '7a9d1c2e-5b6f-4a8c-9d10-2c3b4a5e6f71'),
('550e8400-e29b-41d4-a716-446655440004', '8b2d4f6a-1c3e-4a7b-9d5c-0e1f2a3b4c51'),
('550e8400-e29b-41d4-a716-446655440005', '8b2d4f6a-1c3e-4a7b-9d5c-0e1f2a3b4c51'),
('550e8400-e29b-41d4-a716-446655440002', '9c2a1b4d-6e7f-4c8a-9d3b-4a5b6c7d8e92'),
('550e8400-e29b-41d4-a716-446655440005', '9c2a1b4d-6e7f-4c8a-9d3b-4a5b6c7d8e92'),
('550e8400-e29b-41d4-a716-446655440005', '9d1f3a5b-2c4e-4b7a-8d6c-3e4f5a6b7c71'),
('550e8400-e29b-41d4-a716-446655440006', '9d1f3a5b-2c4e-4b7a-8d6c-3e4f5a6b7c71');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL DEFAULT 'USER',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `first_name`, `last_name`, `email`, `password`, `role`, `created_at`, `updated_at`) VALUES
('550e8400-e29b-41d4-a716-446655440002', 'Emma', 'Johnson', 'emma.johnson@example.com', '7f7737fddd2842bc2afdbf1868aaa8e986b83133a1f010fe96535c15e4584628', 'USER', '2026-06-22 07:36:03', '2026-06-22 07:36:03'),
('550e8400-e29b-41d4-a716-446655440003', 'Michael', 'Brown', 'michael.brown@example.com', '7f7737fddd2842bc2afdbf1868aaa8e986b83133a1f010fe96535c15e4584628', 'USER', '2026-06-22 07:36:03', '2026-06-22 07:36:03'),
('550e8400-e29b-41d4-a716-446655440004', 'Sophia', 'Davis', 'sophia.davis@example.com', '7f7737fddd2842bc2afdbf1868aaa8e986b83133a1f010fe96535c15e4584628', 'USER', '2026-06-22 07:36:03', '2026-06-22 07:36:03'),
('550e8400-e29b-41d4-a716-446655440005', 'James', 'Wilson', 'james.wilson@example.com', '7f7737fddd2842bc2afdbf1868aaa8e986b83133a1f010fe96535c15e4584628', 'USER', '2026-06-22 07:36:03', '2026-06-22 07:36:03'),
('550e8400-e29b-41d4-a716-446655440006', 'Olivia', 'Taylor', 'olivia.taylor@example.com', '7f7737fddd2842bc2afdbf1868aaa8e986b83133a1f010fe96535c15e4584628', 'USER', '2026-06-22 07:36:03', '2026-06-22 07:36:03'),
('aa767ca2-49fb-48c1-b93c-4ade882ab1a9', 'Site', 'God', 'admin@jbt.com', '7f7737fddd2842bc2afdbf1868aaa8e986b83133a1f010fe96535c15e4584628', 'ADMIN', '2026-06-17 11:44:39', '2026-06-17 11:44:39'),
('ccd4cc2a-8f43-4428-a3c6-080547500540', 'User', 'Tester', 'user@jbt.com', '7f7737fddd2842bc2afdbf1868aaa8e986b83133a1f010fe96535c15e4584628', 'USER', '2026-06-17 12:05:14', '2026-06-17 12:05:14'),
('e37273e5-4135-427a-97ac-b909d69c6ed4', 'Test', 'Register', 'test@jwt.com', '7f7737fddd2842bc2afdbf1868aaa8e986b83133a1f010fe96535c15e4584628', 'USER', '2026-07-05 09:17:27', '2026-07-05 09:17:27');

-- --------------------------------------------------------

--
-- Table structure for table `vacations`
--

DROP TABLE IF EXISTS `vacations`;
CREATE TABLE IF NOT EXISTS `vacations` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `location` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `start_date` datetime NOT NULL,
  `end_date` datetime NOT NULL,
  `price` int NOT NULL,
  `image_url` varchar(255) NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `vacations`
--

INSERT INTO `vacations` (`id`, `location`, `description`, `start_date`, `end_date`, `price`, `image_url`, `created_at`, `updated_at`) VALUES
('1422a7a5-d3c0-4e3d-9b06-a291c79ab698', ' Moscow', ' Cremlin, Red square and more over', '2026-07-17 21:00:00', '2026-08-23 21:00:00', 1000, 'http://localhost:4566/com.project3.dev.vacation/0cca60d5-c64f-40f1-8214-115243016b6d.jpg', '2026-06-24 18:27:00', '2026-06-24 18:27:00'),
('1d3f5a7c-2b4e-4c6d-8a9b-5c6d7e8f9a01', 'Nice', 'Mediterranean coastline with palm promenades, pebble beaches, warm climate, and elegant seaside atmosphere with cafs and art culture.', '2026-06-18 00:00:00', '2026-07-06 00:00:00', 5200, 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34', '2026-06-17 06:57:25', '2026-06-17 06:57:25'),
('2b6f9d3a-1c4e-4a7b-9d2c-3e4f5a6b7c81', 'Bali', 'Tropical island with rice terraces, temples, surfing beaches, jungles, and a cultural mix of spirituality and modern travel experiences.', '2026-06-18 00:00:00', '2026-07-04 00:00:00', 3100, 'https://images.unsplash.com/photo-1537953773345-d172ccf13cf1', '2026-06-17 06:57:25', '2026-06-17 06:57:25'),
('2e4a6c8d-1f3b-4a7c-9d5e-7a8b9c0d1e82', 'Koh Samui', 'Palm beaches, waterfalls, luxury resorts, yoga retreats, and calm tropical atmosphere with warm ocean waters.', '2026-08-08 00:00:00', '2026-08-22 00:00:00', 3600, 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21', '2026-06-17 06:57:25', '2026-06-17 06:57:25'),
('3f1c2b6a-9d4e-4d7a-8f2a-1b2c3d4e5f60', 'Santorini', 'Whitewashed cliffside villages, blue domes, and volcanic caldera views with dramatic sunsets and narrow scenic streets above the sea.', '2026-06-01 00:00:00', '2026-06-15 00:00:00', 4200, 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21', '2026-06-17 06:57:25', '2026-06-17 06:57:25'),
('4a7c9e1b-2d3f-4b6a-8c5d-9e0f1a2b3c41', 'Mykonos', 'Whitewashed houses, windmills, beach clubs, nightlife, and crystal-clear waters in a vibrant Aegean island atmosphere.', '2026-06-28 00:00:00', '2026-07-12 00:00:00', 7000, 'https://images.unsplash.com/photo-1505731132164-cca6a1d9f1d3', '2026-06-17 06:57:25', '2026-06-17 06:57:25'),
('5c7e1a3b-4d6f-4a8c-9b2d-1f2a3b4c5d61', 'Dubrovnik', 'Medieval stone walls, historic old town, marble streets, and Adriatic sea views creating a dramatic coastal heritage city.', '2026-07-12 00:00:00', '2026-07-28 00:00:00', 4800, 'https://images.unsplash.com/photo-1505761671935-60b3a7427bad', '2026-06-17 06:57:25', '2026-06-17 06:57:25'),
('6e8a1c3d-4f5b-4a7c-9d2e-7b8c9d0e1f12', 'Amalfi Coast', 'Cliffside villages, winding coastal roads, lemon groves, and turquoise waters forming one of the most scenic coastal landscapes.', '2026-06-17 00:00:00', '2026-07-09 00:00:00', 6500, 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d', '2026-06-17 06:57:25', '2026-06-17 06:57:25'),
('7a9d1c2e-5b6f-4a8c-9d10-2c3b4a5e6f71', 'Maldives', 'Crystal lagoons, overwater villas, coral reefs, and white beaches offering a peaceful luxury escape for swimming, diving, and relaxation.', '2026-06-17 00:00:00', '2026-06-30 00:00:00', 8900, 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8', '2026-06-17 06:57:25', '2026-06-17 06:57:25'),
('7f9a1c3d-2e4b-4c6a-8d5f-9b0c1d2e3f92', 'Hvar', 'Sunny island with lavender fields, stone towns, yachts, nightlife, and clear Adriatic waters.', '2026-08-10 00:00:00', '2026-08-24 00:00:00', 5400, 'https://images.unsplash.com/photo-1501785888041-af3ef285b470', '2026-06-17 06:57:25', '2026-06-17 06:57:25'),
('8b2d4f6a-1c3e-4a7b-9d5c-0e1f2a3b4c51', 'Bora Bora', 'Turquoise lagoons, overwater bungalows, coral reefs, and volcanic peaks rising above a pristine tropical paradise.', '2026-07-15 00:00:00', '2026-07-30 00:00:00', 9800, 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee', '2026-06-17 06:57:25', '2026-06-17 06:57:25'),
('9c2a1b4d-6e7f-4c8a-9d3b-4a5b6c7d8e92', 'Phuket', 'Tropical beaches, limestone cliffs, island tours, nightlife, and cultural attractions with warm sea and vibrant coastal energy.', '2026-06-17 00:00:00', '2026-07-04 00:00:00', 2700, 'https://images.unsplash.com/photo-1528181304800-259b08848526', '2026-06-17 06:57:25', '2026-06-17 06:57:25'),
('9d1f3a5b-2c4e-4b7a-8d6c-3e4f5a6b7c71', 'Seychelles', 'Granite islands, palm beaches, turquoise water, and untouched nature reserves offering a serene tropical escape.', '2026-08-05 00:00:00', '2026-08-19 00:00:00', 9200, 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21', '2026-06-17 06:57:25', '2026-06-17 06:57:25'),
('e253b169-1b64-4320-9717-442abfaa6347', 'Jerusalem', ' Western wal', '2026-07-17 21:00:00', '2026-08-23 21:00:00', 1000, 'http://localhost:4566/com.project3.dev.vacation/0cbdc6f5-87a0-4450-98c3-c9b7ad8f3992.jpeg', '2026-06-24 18:47:07', '2026-06-24 18:47:07'),
('e917fdc5-6d3a-11f1-9d9f-a21d85f4578c', 'Test', 'This is for test field id', '2026-06-21 06:29:57', '2026-06-28 09:29:59', 300, 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21', '2026-06-21 06:29:57', '2026-06-21 06:29:57'),
('f2531211-6458-4167-a0d9-34f71db0be06', ' London', ' Tower, Big Ben and more over to see', '2026-07-17 21:00:00', '2026-08-03 21:00:00', 10000, 'http://localhost:4566/com.project3.dev.vacation/e1f88d74-b7e5-4f4a-9af6-d323260e80a1.jpg', '2026-06-24 18:08:26', '2026-06-24 18:08:26');

--
-- Constraints for dumped tables
--

--
-- Constraints for table `likes`
--
ALTER TABLE `likes`
  ADD CONSTRAINT `likes_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `likes_ibfk_2` FOREIGN KEY (`vacation_id`) REFERENCES `vacations` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
