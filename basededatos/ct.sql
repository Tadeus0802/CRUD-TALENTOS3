-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 31-08-2021 a las 05:39:16
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

CREATE TABLE `cuestionarios` (
  `idcuestionarios` int(11) NOT NULL,
  `fechaCreacion` timestamp NOT NULL DEFAULT current_timestamp(),
  `usuarioCreador` varchar(50) NOT NULL,
  `descripcion` varchar(255) NOT NULL,
  `estado` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `cuestionarios`
--

INSERT INTO `cuestionarios` (`idcuestionarios`, `fechaCreacion`, `usuarioCreador`, `descripcion`, `estado`) VALUES
(1, '2021-08-31 03:26:37', 'ariel3', 'Cuestionario EJemplo', 'Habilitado'),
(2, '2021-08-31 03:26:40', 'ariel3', 'Cuestionario EJemplo2', 'Habilitado');

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
  `categoria` varchar(50) NOT NULL,
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `idUser` int(11) NOT NULL,
  `user` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `fullName` varchar(150) NOT NULL,
  `rol` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`idUser`, `user`, `password`, `fullName`, `rol`) VALUES
(1, 'ariel3', '$2a$08$mwG7OxhxAkXTZr.67TODUeTYJhXgBDLDCBudY4.yyxVaxRNN7hYFe', ' ezequiel santangelo', 'user'),
(2, 'ariel3259', '$2a$08$7pyfbqI.qGjupPTwCH0J.OpFwD0EK6qExwKwLGxx3NpWDw9AjYtnC', 'Ariel Ezequiel Santangelo', 'admin'),
(3, 'ariel33', '$2a$08$I0VQpX/87MIgKGcByH7SGOf/m4KJWq2OAm2itSovyDQ8vlAEXmTK2', 'ARIEL SANTANGELO', 'user');

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
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`idUser`),
  ADD UNIQUE KEY `user` (`user`),
  ADD UNIQUE KEY `fullName` (`fullName`);

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
