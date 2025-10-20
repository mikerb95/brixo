-- Migración desde esquema legado hacia el esquema Brixo v2
-- Ejecuta en bases existentes con tablas antiguas para alinearlas parcialmente.
-- Requiere MySQL 8.0+ para IF NOT EXISTS en columnas. En 5.7, adapta manualmente.

USE brixo;
SET sql_mode = 'STRICT_ALL_TABLES';

-- CLIENTE: fortalecer correo y mover contraseñas a hash
ALTER TABLE CLIENTE
  MODIFY COLUMN correo VARCHAR(320) NOT NULL;

ALTER TABLE CLIENTE
  ADD COLUMN IF NOT EXISTS contrasena_hash VARCHAR(255) NULL,
  ADD COLUMN IF NOT EXISTS created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP;

UPDATE CLIENTE
  SET contrasena_hash = SHA2(contrasena, 256)
  WHERE contrasena IS NOT NULL AND (contrasena_hash IS NULL OR contrasena_hash = '');

ALTER TABLE CLIENTE
  MODIFY COLUMN contrasena_hash VARCHAR(255) NOT NULL;

ALTER TABLE CLIENTE DROP COLUMN IF EXISTS contrasena;

-- CONTRATISTA: idem
ALTER TABLE CONTRATISTA
  MODIFY COLUMN correo VARCHAR(320) NOT NULL;

ALTER TABLE CONTRATISTA
  ADD COLUMN IF NOT EXISTS contrasena_hash VARCHAR(255) NULL,
  ADD COLUMN IF NOT EXISTS verificado TINYINT(1) NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP;

UPDATE CONTRATISTA
  SET contrasena_hash = SHA2(contrasena, 256)
  WHERE contrasena IS NOT NULL AND (contrasena_hash IS NULL OR contrasena_hash = '');

ALTER TABLE CONTRATISTA
  MODIFY COLUMN contrasena_hash VARCHAR(255) NOT NULL;

ALTER TABLE CONTRATISTA DROP COLUMN IF EXISTS contrasena;

-- CATEGORIA y SERVICIO: asegurar integridad básica
ALTER TABLE SERVICIO MODIFY COLUMN id_categoria INT NOT NULL;
-- Nota: si no existe FK, añádelo manualmente con un nombre único en tu instancia.
-- ALTER TABLE SERVICIO ADD CONSTRAINT fk_servicio_categoria FOREIGN KEY (id_categoria) REFERENCES CATEGORIA(id_categoria) ON UPDATE CASCADE ON DELETE RESTRICT;

-- Crear tablas nuevas si no existían en el legado
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
  PRIMARY KEY (id_cliente, id_ubicacion)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS CONTRATISTA_UBICACION (
  id_contratista INT UNSIGNED NOT NULL,
  id_ubicacion INT UNSIGNED NOT NULL,
  es_principal TINYINT(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (id_contratista, id_ubicacion)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS CONTRATISTA_SERVICIO (
  id_contratista INT UNSIGNED NOT NULL,
  id_servicio INT UNSIGNED NOT NULL,
  tarifa_base DECIMAL(12,2) NULL,
  descripcion TEXT NULL,
  disponible TINYINT(1) NOT NULL DEFAULT 1,
  PRIMARY KEY (id_contratista, id_servicio)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
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
  UNIQUE KEY uq_cot_unica (id_solicitud, id_contratista)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS RESERVA (
  id_reserva INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  id_contrato INT UNSIGNED NOT NULL,
  fecha_programada DATETIME NOT NULL,
  duracion_estimada_min INT UNSIGNED NULL,
  estado ENUM('pendiente','confirmada','completada','cancelada') NOT NULL DEFAULT 'pendiente',
  notas TEXT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
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
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS RESENA (
  id_resena INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  id_contrato INT UNSIGNED NOT NULL,
  id_cliente INT UNSIGNED NOT NULL,
  comentario TEXT,
  fecha DATE NOT NULL,
  calificacion TINYINT UNSIGNED NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY uq_resena_contrato (id_contrato)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Nota: Para consolidar pagos antiguos:
--  1) Añade columna id_contrato a PAGO si existe con otro diseño.
--  2) Migra valores relacionando por CONTRATO si es posible.
--  3) Deprecate tablas N:M de pagos cuando no se usen.
