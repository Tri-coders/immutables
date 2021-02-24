-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Feb 23, 2021 at 06:24 PM
-- Server version: 10.4.10-MariaDB
-- PHP Version: 7.3.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `metacognition`
--

-- --------------------------------------------------------

--
-- Table structure for table `documents`
--

CREATE TABLE `documents` (
  `sub_topic_id` int(11) NOT NULL,
  `doc_name` varchar(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `faculty_details`
--

CREATE TABLE `faculty_details` (
  `id` int(11) NOT NULL,
  `name` varchar(30) NOT NULL,
  `password` varchar(10) NOT NULL,
  `email` varchar(45) NOT NULL,
  `subject_name` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `flag`
--

CREATE TABLE `flag` (
  `id` int(11) NOT NULL,
  `switch` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `flag`
--

INSERT INTO `flag` (`id`, `switch`) VALUES
(1, 'doc_doc'),
(2, 'doc_quiz'),
(3, 'doc_video'),
(4, 'quiz_doc'),
(5, 'quiz_video'),
(6, 'video_doc'),
(7, 'video_video');

-- --------------------------------------------------------

--
-- Table structure for table `log_1`
--

CREATE TABLE `log_1` (
  `session_id` bigint(20) NOT NULL,
  `sub_topic_id` int(11) NOT NULL,
  `start_time` time NOT NULL,
  `end_time` time NOT NULL,
  `time_spent` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `log_2`
--

CREATE TABLE `log_2` (
  `session_id` bigint(20) NOT NULL,
  `init_id` int(11) NOT NULL,
  `new_id` int(11) NOT NULL,
  `type` int(11) NOT NULL,
  `start_time` time NOT NULL,
  `end_time` time NOT NULL,
  `time_spent` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `log_3`
--

CREATE TABLE `log_3` (
  `session_id` bigint(20) NOT NULL,
  `id` int(11) NOT NULL,
  `type` int(11) NOT NULL,
  `init_ques_no` int(11) NOT NULL,
  `jumped_ques_no` int(11) NOT NULL,
  `choices` text NOT NULL,
  `time_spent` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `log_4`
--

CREATE TABLE `log_4` (
  `session_id` bigint(20) NOT NULL,
  `sub_topic_id` int(11) NOT NULL,
  `doc1_name` varchar(45) NOT NULL,
  `doc2_name` varchar(45) NOT NULL,
  `flag_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `session`
--

CREATE TABLE `session` (
  `session_id` bigint(20) NOT NULL,
  `student_id` int(11) NOT NULL,
  `date` date NOT NULL,
  `start_time` time NOT NULL,
  `end_time` time NOT NULL,
  `time_spent` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `subject_details`
--

CREATE TABLE `subject_details` (
  `subject_id` int(11) NOT NULL,
  `faculty_id` int(11) NOT NULL,
  `subject_name` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `sub_topic_details`
--

CREATE TABLE `sub_topic_details` (
  `sub_topic_id` int(11) NOT NULL,
  `sub_topic_name` varchar(30) NOT NULL,
  `topic_id` int(11) NOT NULL,
  `quiz_csv` varchar(35) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `topic_details`
--

CREATE TABLE `topic_details` (
  `topic_id` int(11) NOT NULL,
  `topic_name` varchar(30) NOT NULL,
  `subject_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(200) NOT NULL,
  `class` varchar(20) DEFAULT NULL,
  `branch` varchar(20) DEFAULT NULL,
  `createdAt` date NOT NULL,
  `updatedAt` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `class`, `branch`, `createdAt`, `updatedAt`) VALUES
(1, 'pra', 'pra@gmail.com', '$2a$10$AFXdArlBl.kCpseemuPVLumpXB.xDbYHnucbnKZzk.GNkDg2AD74m', NULL, NULL, '2020-06-02', '2020-06-02'),
(4, 'Sanket Deshmukh', 'meetsanket24@gmail.com', '$2a$10$OSJaG/O0BPS5dW9l.o3/9.bEgiLbci5468Nm3Reu9MChERG60oGM.', NULL, NULL, '2020-11-01', '2020-11-01'),
(5, 'Sanket', 'sanket@gmail.com', '$2a$10$HwBnoH.Iy5LZo55Rs3Pb7ObKwGeQjwaz0n/in8/lLTPYrpLy/GPWC', NULL, NULL, '2020-12-18', '2020-12-18');

-- --------------------------------------------------------

--
-- Table structure for table `video`
--

CREATE TABLE `video` (
  `sub_topic_id` int(11) NOT NULL,
  `url` varchar(35) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `documents`
--
ALTER TABLE `documents`
  ADD KEY `Foreign key 4` (`sub_topic_id`);

--
-- Indexes for table `faculty_details`
--
ALTER TABLE `faculty_details`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `flag`
--
ALTER TABLE `flag`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `log_1`
--
ALTER TABLE `log_1`
  ADD KEY `Foreign key 6` (`session_id`);

--
-- Indexes for table `log_2`
--
ALTER TABLE `log_2`
  ADD KEY `Foreign key 7` (`session_id`);

--
-- Indexes for table `log_3`
--
ALTER TABLE `log_3`
  ADD KEY `Foreign key 8` (`session_id`);

--
-- Indexes for table `log_4`
--
ALTER TABLE `log_4`
  ADD KEY `Foreign key 9` (`session_id`);

--
-- Indexes for table `session`
--
ALTER TABLE `session`
  ADD PRIMARY KEY (`session_id`),
  ADD KEY `Foreign key` (`student_id`);

--
-- Indexes for table `subject_details`
--
ALTER TABLE `subject_details`
  ADD PRIMARY KEY (`subject_id`),
  ADD KEY `Foreign key 1` (`faculty_id`);

--
-- Indexes for table `sub_topic_details`
--
ALTER TABLE `sub_topic_details`
  ADD PRIMARY KEY (`sub_topic_id`),
  ADD KEY `Foreign key 3` (`topic_id`);

--
-- Indexes for table `topic_details`
--
ALTER TABLE `topic_details`
  ADD PRIMARY KEY (`topic_id`),
  ADD KEY `Foreign key 2` (`subject_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `video`
--
ALTER TABLE `video`
  ADD KEY `Foreign key 5` (`sub_topic_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `faculty_details`
--
ALTER TABLE `faculty_details`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `session`
--
ALTER TABLE `session`
  MODIFY `session_id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `sub_topic_details`
--
ALTER TABLE `sub_topic_details`
  MODIFY `sub_topic_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `documents`
--
ALTER TABLE `documents`
  ADD CONSTRAINT `Foreign key 4` FOREIGN KEY (`sub_topic_id`) REFERENCES `sub_topic_details` (`sub_topic_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `log_1`
--
ALTER TABLE `log_1`
  ADD CONSTRAINT `Foreign key 6` FOREIGN KEY (`session_id`) REFERENCES `session` (`session_id`);

--
-- Constraints for table `log_2`
--
ALTER TABLE `log_2`
  ADD CONSTRAINT `Foreign key 7` FOREIGN KEY (`session_id`) REFERENCES `session` (`session_id`);

--
-- Constraints for table `log_3`
--
ALTER TABLE `log_3`
  ADD CONSTRAINT `Foreign key 8` FOREIGN KEY (`session_id`) REFERENCES `session` (`session_id`);

--
-- Constraints for table `log_4`
--
ALTER TABLE `log_4`
  ADD CONSTRAINT `Foreign key 9` FOREIGN KEY (`session_id`) REFERENCES `session` (`session_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `subject_details`
--
ALTER TABLE `subject_details`
  ADD CONSTRAINT `Foreign key 1` FOREIGN KEY (`faculty_id`) REFERENCES `faculty_details` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `sub_topic_details`
--
ALTER TABLE `sub_topic_details`
  ADD CONSTRAINT `Foreign key 3` FOREIGN KEY (`topic_id`) REFERENCES `topic_details` (`topic_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `topic_details`
--
ALTER TABLE `topic_details`
  ADD CONSTRAINT `Foreign key 2` FOREIGN KEY (`subject_id`) REFERENCES `subject_details` (`subject_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `video`
--
ALTER TABLE `video`
  ADD CONSTRAINT `Foreign key 5` FOREIGN KEY (`sub_topic_id`) REFERENCES `sub_topic_details` (`sub_topic_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
