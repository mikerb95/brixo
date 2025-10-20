-- Brixo schema (MySQL 8.0+ recommended)
-- Safe to run multiple times; uses IF NOT EXISTS and restrictive FKs.

-- CREATE DATABASE if you don't have it yet
CREATE DATABASE IF NOT EXISTS brixo CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;
USE brixo;

SET sql_mode = 'STRICT_ALL_TABLES';

-- =========================
-- CATALOGO / BASE
-- =========================
CREATE TABLE IF NOT EXISTS ADMINISTRADOR (
  id_administrador INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(255) NOT NULL,
  correo VARCHAR(320) NOT NULL UNIQUE,
  rol ENUM('SuperAdmin','GestorPagos','Soporte','Operaciones') NOT NULL DEFAULT 'Operaciones',
  contrasena_hash VARCHAR(255),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS CATEGORIA (
  id_categoria INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(255) NOT NULL,
  descripcion TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY uq_categoria_nombre (nombre)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS SERVICIO (
  id_servicio INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(255) NOT NULL,
  descripcion TEXT,
  precio_estimado DECIMAL(12,2),
  id_categoria INT UNSIGNED NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_servicio_categoria
    FOREIGN KEY (id_categoria) REFERENCES CATEGORIA(id_categoria)
    ON UPDATE CASCADE ON DELETE RESTRICT,
  KEY idx_servicio_categoria (id_categoria),
  UNIQUE KEY uq_servicio_nombre (nombre)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- =========================
-- ACTORES
-- =========================
CREATE TABLE IF NOT EXISTS CLIENTE (
  id_cliente INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(255) NOT NULL,
  correo VARCHAR(320) NOT NULL UNIQUE,
  telefono VARCHAR(20),
  direccion VARCHAR(255),
  ciudad VARCHAR(255),
  fecha_de_registro DATE,
  contrasena_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS CONTRATISTA (
  id_contratista INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(255) NOT NULL,
  especialidad VARCHAR(255),
  experiencia VARCHAR(255),
  portafolio VARCHAR(255),
  telefono VARCHAR(20),
  correo VARCHAR(320) NOT NULL UNIQUE,
  ciudad VARCHAR(255),
  contrasena_hash VARCHAR(255) NOT NULL,
  verificado TINYINT(1) NOT NULL DEFAULT 0,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS UBICACION (
  id_ubicacion INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  ciudad VARCHAR(255),
  departamento VARCHAR(255),
  direccion VARCHAR(255),
  lat DECIMAL(10,7) NULL,
  lng DECIMAL(10,7) NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS CLIENTE_UBICACION (
  id_cliente INT UNSIGNED NOT NULL,
  id_ubicacion INT UNSIGNED NOT NULL,
  es_principal TINYINT(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (id_cliente, id_ubicacion),
  CONSTRAINT fk_cli_ubi_cliente FOREIGN KEY (id_cliente) REFERENCES CLIENTE(id_cliente)
    ON UPDATE CASCADE ON DELETE CASCADE,
  CONSTRAINT fk_cli_ubi_ubic FOREIGN KEY (id_ubicacion) REFERENCES UBICACION(id_ubicacion)
    ON UPDATE CASCADE ON DELETE CASCADE,
  KEY idx_cli_ubi_principal (id_cliente, es_principal)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS CONTRATISTA_UBICACION (
  id_contratista INT UNSIGNED NOT NULL,
  id_ubicacion INT UNSIGNED NOT NULL,
  es_principal TINYINT(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (id_contratista, id_ubicacion),
  CONSTRAINT fk_con_ubi_con FOREIGN KEY (id_contratista) REFERENCES CONTRATISTA(id_contratista)
    ON UPDATE CASCADE ON DELETE CASCADE,
  CONSTRAINT fk_con_ubi_ubi FOREIGN KEY (id_ubicacion) REFERENCES UBICACION(id_ubicacion)
    ON UPDATE CASCADE ON DELETE CASCADE,
  KEY idx_con_ubi_principal (id_contratista, es_principal)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS CERTIFICACION (
  id_certificado INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(255) NOT NULL,
  entidad_emisora VARCHAR(255),
  fecha_obtenida DATE,
  id_contratista INT UNSIGNED NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_cert_con FOREIGN KEY (id_contratista) REFERENCES CONTRATISTA(id_contratista)
    ON UPDATE CASCADE ON DELETE CASCADE,
  KEY idx_cert_con (id_contratista)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS CONTRATISTA_SERVICIO (
  id_contratista INT UNSIGNED NOT NULL,
  id_servicio INT UNSIGNED NOT NULL,
  tarifa_base DECIMAL(12,2) NULL,
  descripcion TEXT NULL,
  disponible TINYINT(1) NOT NULL DEFAULT 1,
  PRIMARY KEY (id_contratista, id_servicio),
  CONSTRAINT fk_cs_con FOREIGN KEY (id_contratista) REFERENCES CONTRATISTA(id_contratista)
    ON UPDATE CASCADE ON DELETE CASCADE,
  CONSTRAINT fk_cs_ser FOREIGN KEY (id_servicio) REFERENCES SERVICIO(id_servicio)
    ON UPDATE CASCADE ON DELETE RESTRICT,
  KEY idx_cs_servicio (id_servicio)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- =========================
-- FLUJO: solicitud -> cotizaciones -> contrato -> reserva -> pagos
-- =========================
CREATE TABLE IF NOT EXISTS SOLICITUD (
  id_solicitud INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  id_cliente INT UNSIGNED NOT NULL,
  id_servicio INT UNSIGNED NOT NULL,
  id_ubicacion INT UNSIGNED NULL,
  descripcion TEXT,
  presupuesto_maximo DECIMAL(12,2) NULL,
  fecha_preferida DATETIME NULL,
  estado ENUM('abierta','asignada','cancelada','cerrada') NOT NULL DEFAULT 'abierta',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_sol_cliente FOREIGN KEY (id_cliente) REFERENCES CLIENTE(id_cliente)
    ON UPDATE CASCADE ON DELETE RESTRICT,
  CONSTRAINT fk_sol_servicio FOREIGN KEY (id_servicio) REFERENCES SERVICIO(id_servicio)
    ON UPDATE CASCADE ON DELETE RESTRICT,
  CONSTRAINT fk_sol_ubic FOREIGN KEY (id_ubicacion) REFERENCES UBICACION(id_ubicacion)
    ON UPDATE CASCADE ON DELETE SET NULL,
  KEY idx_sol_cliente (id_cliente),
  KEY idx_sol_servicio (id_servicio)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS COTIZACION (
  id_cotizacion INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  id_solicitud INT UNSIGNED NOT NULL,
  id_contratista INT UNSIGNED NOT NULL,
  estado ENUM('pendiente','enviada','aceptada','rechazada','vencida') NOT NULL DEFAULT 'pendiente',
  fecha DATE NOT NULL,
  observaciones VARCHAR(255),
  precio_ofertado DECIMAL(12,2) NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_cot_sol FOREIGN KEY (id_solicitud) REFERENCES SOLICITUD(id_solicitud)
    ON UPDATE CASCADE ON DELETE CASCADE,
  CONSTRAINT fk_cot_con FOREIGN KEY (id_contratista) REFERENCES CONTRATISTA(id_contratista)
    ON UPDATE CASCADE ON DELETE RESTRICT,
  UNIQUE KEY uq_cot_unica (id_solicitud, id_contratista),
  KEY idx_cot_estado (estado)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS CONTRATO (
  id_contrato INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  id_cotizacion INT UNSIGNED NOT NULL,
  fecha_inicio DATE,
  fecha_fin DATE,
  costo_total DECIMAL(12,2) NOT NULL,
  estado ENUM('pendiente','en_curso','finalizado','cancelado') NOT NULL DEFAULT 'pendiente',
  comision_brixo DECIMAL(12,2) NOT NULL DEFAULT 0.00,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_contrato_cot FOREIGN KEY (id_cotizacion) REFERENCES COTIZACION(id_cotizacion)
    ON UPDATE CASCADE ON DELETE RESTRICT,
  KEY idx_contrato_estado (estado)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS RESERVA (
  id_reserva INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  id_contrato INT UNSIGNED NOT NULL,
  fecha_programada DATETIME NOT NULL,
  duracion_estimada_min INT UNSIGNED NULL,
  estado ENUM('pendiente','confirmada','completada','cancelada') NOT NULL DEFAULT 'pendiente',
  notas TEXT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_reserva_contrato FOREIGN KEY (id_contrato) REFERENCES CONTRATO(id_contrato)
    ON UPDATE CASCADE ON DELETE CASCADE,
  UNIQUE KEY uq_reserva_contrato (id_contrato)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- =========================
-- PAGOS y DESEMBOLSOS
-- =========================
CREATE TABLE IF NOT EXISTS PAGO (
  id_pago INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  id_contrato INT UNSIGNED NOT NULL,
  monto DECIMAL(12,2) NOT NULL,
  moneda CHAR(3) NOT NULL DEFAULT 'COP',
  fecha_de_pago DATETIME NOT NULL,
  medio_de_pago ENUM('tarjeta','nequi','daviplata','efectivo','otros') NOT NULL,
  estado ENUM('pendiente','aprobado','fallido','reembolsado') NOT NULL DEFAULT 'pendiente',
  proveedor VARCHAR(50) NULL,
  referencia_externa VARCHAR(191) NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_pago_contrato FOREIGN KEY (id_contrato) REFERENCES CONTRATO(id_contrato)
    ON UPDATE CASCADE ON DELETE RESTRICT,
  KEY idx_pago_contrato (id_contrato),
  KEY idx_pago_estado (estado),
  UNIQUE KEY uq_pago_ref (proveedor, referencia_externa)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS DESEMBOLSO (
  id_desembolso INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  id_contrato INT UNSIGNED NOT NULL,
  id_contratista INT UNSIGNED NOT NULL,
  monto DECIMAL(12,2) NOT NULL,
  moneda CHAR(3) NOT NULL DEFAULT 'COP',
  fecha DATETIME NOT NULL,
  medio ENUM('transferencia','nequi','daviplata','otros') NOT NULL,
  estado ENUM('pendiente','en_proceso','pagado','fallido') NOT NULL DEFAULT 'pendiente',
  referencia_externa VARCHAR(191) NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_des_contrato FOREIGN KEY (id_contrato) REFERENCES CONTRATO(id_contrato)
    ON UPDATE CASCADE ON DELETE RESTRICT,
  CONSTRAINT fk_des_contratista FOREIGN KEY (id_contratista) REFERENCES CONTRATISTA(id_contratista)
    ON UPDATE CASCADE ON DELETE RESTRICT,
  KEY idx_des_contrato (id_contrato),
  KEY idx_des_contratista (id_contratista)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- =========================
-- RESEÑAS
-- =========================
CREATE TABLE IF NOT EXISTS RESENA (
  id_resena INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  id_contrato INT UNSIGNED NOT NULL,
  id_cliente INT UNSIGNED NOT NULL,
  comentario TEXT,
  fecha DATE NOT NULL,
  calificacion TINYINT UNSIGNED NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_res_contrato FOREIGN KEY (id_contrato) REFERENCES CONTRATO(id_contrato)
    ON UPDATE CASCADE ON DELETE RESTRICT,
  CONSTRAINT fk_res_cliente FOREIGN KEY (id_cliente) REFERENCES CLIENTE(id_cliente)
    ON UPDATE CASCADE ON DELETE RESTRICT,
  CONSTRAINT chk_calificacion CHECK (calificacion BETWEEN 1 AND 5),
  UNIQUE KEY uq_resena_contrato (id_contrato),
  KEY idx_res_cliente (id_cliente),
  KEY idx_res_calificacion (calificacion)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
