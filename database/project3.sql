-- phpMyAdmin SQL Dump
-- version 5.2.3
-- https://www.phpmyadmin.net/
--
-- Host: db
-- Generation Time: May 31, 2026 at 11:05 AM
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
-- Database: `tsomet_sfarim`
--
CREATE DATABASE IF NOT EXISTS `tsomet_sfarim` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;
USE `tsomet_sfarim`;

-- --------------------------------------------------------

--
-- Table structure for table `authors`
--

DROP TABLE IF EXISTS `authors`;
CREATE TABLE `authors` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `name` varchar(255) NOT NULL,
  `family_name` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `authors`
--

INSERT INTO `authors` (`id`, `name`, `family_name`, `created_at`, `updated_at`) VALUES
('c79ca931-5cdc-11f1-a80d-7ec72e1cdb4d', 'Lev', 'Tolstoi', '2026-05-31 10:32:23', '2026-05-31 10:32:23'),
('c79ce4f6-5cdc-11f1-a80d-7ec72e1cdb4d', 'Alexander', 'Pushkine', '2026-05-31 10:32:23', '2026-05-31 10:32:23'),
('c79d05d7-5cdc-11f1-a80d-7ec72e1cdb4d', 'Alexander', 'Block', '2026-05-31 10:32:23', '2026-05-31 10:32:23');

-- --------------------------------------------------------

--
-- Table structure for table `books`
--

DROP TABLE IF EXISTS `books`;
CREATE TABLE `books` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `author_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `title` varchar(255) NOT NULL,
  `price` float NOT NULL,
  `pages` int NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `books`
--

INSERT INTO `books` (`id`, `author_id`, `title`, `price`, `pages`, `created_at`, `updated_at`) VALUES
('5956be19-5cdf-11f1-a80d-7ec72e1cdb4d', 'c79ca931-5cdc-11f1-a80d-7ec72e1cdb4d', 'War and Peace', 300, 1000, '2026-05-31 10:52:46', '2026-05-31 10:52:46'),
('5956d755-5cdf-11f1-a80d-7ec72e1cdb4d', 'c79ca931-5cdc-11f1-a80d-7ec72e1cdb4d', 'Anne Karenine', 200, 200, '2026-05-31 10:52:46', '2026-05-31 10:52:46'),
('8dc7d5f7-5cdf-11f1-a80d-7ec72e1cdb4d', 'c79ce4f6-5cdc-11f1-a80d-7ec72e1cdb4d', 'Golden fish', 50, 10, '2026-05-31 10:56:27', '2026-05-31 10:56:27');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `authors`
--
ALTER TABLE `authors`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `books`
--
ALTER TABLE `books`
  ADD PRIMARY KEY (`id`),
  ADD KEY `author_id` (`author_id`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `books`
--
ALTER TABLE `books`
  ADD CONSTRAINT `books_ibfk_1` FOREIGN KEY (`author_id`) REFERENCES `authors` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
