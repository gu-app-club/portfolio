-- phpMyAdmin SQL Dump
-- version 4.5.4.1deb2ubuntu2
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Oct 19, 2017 at 04:38 AM
-- Server version: 5.7.19-0ubuntu0.16.04.1
-- PHP Version: 7.0.22-0ubuntu0.16.04.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `gu-port`
--

-- --------------------------------------------------------

--
-- Table structure for table `access_codes`
--

CREATE TABLE `access_codes` (
  `access_code` text NOT NULL,
  `valid` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `access_codes`
--

INSERT INTO `access_codes` (`access_code`, `valid`) VALUES
('test', 0),
('test1', 0),
('testtest', 0),
('max', 0),
('unique', 1),
('test', 0);

-- --------------------------------------------------------

--
-- Table structure for table `pages`
--

CREATE TABLE `pages` (
  `pageID` int(11) NOT NULL,
  `userID` text NOT NULL,
  `name` text NOT NULL,
  `author` text NOT NULL,
  `body` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `pages`
--

INSERT INTO `pages` (`pageID`, `userID`, `name`, `author`, `body`) VALUES
(1, '0', 'Szechuan Sauce', 'Rick Sanchez', '# hello\r\ncats and *dogs* woAHHHHH.\r\n\r\n## Subtitle\r\n[link](facebook.com)\r\n\r\n*BOLD [Link](google.com)*'),
(2, '0', 'Another Title', 'Rick Sanchez', '# This is a body'),
(3, '1', 'Another Title', 'Max Sanchez', '# This is another body'),
(4, '9', 'name of thing', 'maxchehab', '# title');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `userID` int(11) NOT NULL,
  `username` text NOT NULL,
  `email` text NOT NULL,
  `access_code` text NOT NULL,
  `password` text NOT NULL,
  `session` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`userID`, `username`, `email`, `access_code`, `password`, `session`) VALUES
(13, 'test', 'test@gmail.com', 'test', 'test', ''),
(16, 'atalhassan', 'atalhassan@gmail.com', 'unique', '$2a$10$T9uUgsyiUsOwAg/So0rHkeKhcYhZ23uVgflebUaK9EHZjqdmVUTZK', 'AC3188B6-76F8-4F23-8BC8-F9F1E4B1408C');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `pages`
--
ALTER TABLE `pages`
  ADD PRIMARY KEY (`pageID`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `pages`
--
ALTER TABLE `pages`
  MODIFY `pageID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `userID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
