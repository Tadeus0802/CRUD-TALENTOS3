-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 10-08-2021 a las 13:34:27
-- Versión del servidor: 10.4.20-MariaDB
-- Versión de PHP: 8.0.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `ct`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cuestionarios`
--
CREATE DATABASE ct;
CREATE TABLE `cuestionarios` (
  `idcuestionarios` int(11) NOT NULL,
  `fechaCreacion` varchar(50) NOT NULL,
  `usuarioCreador` varchar(50) NOT NULL,
  `descripcion` varchar(255) NOT NULL,
  `estado` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `enlaces`
--

CREATE TABLE `enlaces` (
  `idcuestionarios` int(11) NOT NULL,
  `idpreguntas` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `preguntas`
--

CREATE TABLE `preguntas` (
  `idpreguntas` int(11) NOT NULL,
  `descripcion` varchar(255) NOT NULL,
  `estado` varchar(50) NOT NULL,
  `categoria` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `preguntas`
--

INSERT INTO `preguntas` (`idpreguntas`, `descripcion`, `estado`, `categoria`) VALUES
(1, '¿Cual es tu deporte favorito?', 'Habilitado', 'Deporte'),
(2, '¿Que opinas de windows?', 'Habilitado', 'Informatica'),
(3, '¿Cuantos km corres?', 'Habilitado', 'Deporte');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `cuestionarios`
--
ALTER TABLE `cuestionarios`
  ADD PRIMARY KEY (`idcuestionarios`);

--
-- Indices de la tabla `enlaces`
--
ALTER TABLE `enlaces`
  ADD UNIQUE KEY `idcuestionarios` (`idcuestionarios`,`idpreguntas`),
  ADD KEY `idpreguntas` (`idpreguntas`);

--
-- Indices de la tabla `preguntas`
--
ALTER TABLE `preguntas`
  ADD PRIMARY KEY (`idpreguntas`),
  ADD UNIQUE KEY `descripcion` (`descripcion`);

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `enlaces`
--
ALTER TABLE `enlaces`
  ADD CONSTRAINT `enlaces_ibfk_1` FOREIGN KEY (`idcuestionarios`) REFERENCES `cuestionarios` (`idcuestionarios`),
  ADD CONSTRAINT `enlaces_ibfk_2` FOREIGN KEY (`idpreguntas`) REFERENCES `preguntas` (`idpreguntas`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
