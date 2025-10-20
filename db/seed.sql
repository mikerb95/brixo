-- Seed de datos de ejemplo para el esquema Brixo
-- Ejecutar después de schema_brixo.sql

USE brixo;

-- Categorías
INSERT IGNORE INTO CATEGORIA (nombre, descripcion) VALUES
  ('Albañilería', 'Construcción, remodelación y mampostería.'),
  ('Electricidad', 'Instalaciones y reparaciones eléctricas.'),
  ('Plomería', 'Sistemas hidráulicos y sanitarios.'),
  ('Pintura', 'Interiores y exteriores.'),
  ('Carpintería', 'Muebles y madera.'),
  ('Construcción General', 'Obras civiles y ampliaciones.')
;

-- Servicios
INSERT IGNORE INTO SERVICIO (nombre, descripcion, precio_estimado, id_categoria) VALUES
  ('Remodelación de baño', 'Cambio de enchapes, grifería y acabados.', 2500000.00, 1),
  ('Instalación eléctrica residencial', 'Cableado y adecuaciones.', 1800000.00, 2),
  ('Destape de tubería', 'Solución de obstrucciones.', 300000.00, 3),
  ('Pintura de apartamento', 'Hasta 80 m².', 1200000.00, 4),
  ('Fabricación de clóset', 'Diseño y fabricación.', 2200000.00, 5),
  ('Construcción de placa', 'Placa de entrepiso en concreto.', 5000000.00, 6)
;

-- Clientes (con hash de contraseña)
INSERT IGNORE INTO CLIENTE (nombre, correo, telefono, direccion, ciudad, fecha_de_registro, contrasena_hash)
VALUES
  ('Juan Pérez', 'juan.perez@example.com', '3001112233', 'Calle 12 #34-56', 'Bogotá', CURDATE(), SHA2('Juan123!', 256)),
  ('Ana Gómez', 'ana.gomez@example.com', '3002223344', 'Carrera 7 #45-67', 'Medellín', CURDATE(), SHA2('Ana123!', 256)),
  ('Luis Rodríguez', 'luis.rod@example.com', '3003334455', 'Av. 30 #10-20', 'Cali', CURDATE(), SHA2('Luis123!', 256)),
  ('María Torres', 'maria.torres@example.com', '3004445566', 'Calle 80 #50-32', 'Bogotá', CURDATE(), SHA2('Maria123!', 256))
;

-- Contratistas
INSERT IGNORE INTO CONTRATISTA (nombre, especialidad, experiencia, portafolio, telefono, correo, ciudad, contrasena_hash, verificado)
VALUES
  ('Carlos Ruiz', 'Electricidad', '5 años', 'portafolio_carlos.pdf', '3101112233', 'carlos.ruiz@example.com', 'Bogotá', SHA2('Carlos123!',256), 1),
  ('Paula Díaz', 'Plomería', '7 años', 'portafolio_paula.pdf', '3102223344', 'paula.diaz@example.com', 'Medellín', SHA2('Paula123!',256), 1),
  ('Jorge Castro', 'Pintura', '4 años', 'portafolio_jorge.pdf', '3103334455', 'jorge.castro@example.com', 'Cali', SHA2('Jorge123!',256), 0)
;

-- Ubicaciones
INSERT INTO UBICACION (ciudad, departamento, direccion, lat, lng) VALUES
  ('Bogotá', 'Cundinamarca', 'Calle 80 #50-32', 4.680, -74.050),
  ('Medellín', 'Antioquia', 'Carrera 45 #16-20', 6.240, -75.570),
  ('Cali', 'Valle del Cauca', 'Av. Roosevelt #25-60', 3.420, -76.520)
;

-- Relaciones de ubicaciones
INSERT IGNORE INTO CLIENTE_UBICACION (id_cliente, id_ubicacion, es_principal) VALUES
  (1,1,1),(2,2,1),(3,3,1)
;

INSERT IGNORE INTO CONTRATISTA_UBICACION (id_contratista, id_ubicacion, es_principal) VALUES
  (1,1,1),(2,2,1),(3,3,1)
;

-- Certificaciones
INSERT IGNORE INTO CERTIFICACION (nombre, entidad_emisora, fecha_obtenida, id_contratista) VALUES
  ('Certificado en Electricidad Básica', 'SENA', '2021-05-10', 1),
  ('Curso de Plomería Avanzada', 'SENA', '2020-08-20', 2)
;

-- Oferta de servicios por contratista
-- Suponiendo ids de servicio según el seed de arriba
INSERT IGNORE INTO CONTRATISTA_SERVICIO (id_contratista, id_servicio, tarifa_base, descripcion, disponible) VALUES
  (1, 2, 1700000.00, 'Instalación eléctrica certificada.', 1),
  (2, 3, 350000.00, 'Destapes urgentes 24/7.', 1),
  (3, 4, 1100000.00, 'Pintura interior profesional.', 1)
;

-- Solicitudes de clientes
INSERT INTO SOLICITUD (id_cliente, id_servicio, id_ubicacion, descripcion, presupuesto_maximo, fecha_preferida, estado)
VALUES
  (1, 1, 1, 'Remodelación completa de baño pequeño.', 2600000.00, NOW() + INTERVAL 7 DAY, 'abierta'),
  (2, 2, 2, 'Instalación eléctrica para apartamento nuevo.', 2000000.00, NOW() + INTERVAL 5 DAY, 'abierta'),
  (3, 4, 3, 'Pintura interior, 70 m².', 1300000.00, NOW() + INTERVAL 10 DAY, 'abierta')
;

-- Cotizaciones de contratistas a solicitudes
INSERT INTO COTIZACION (id_solicitud, id_contratista, estado, fecha, observaciones, precio_ofertado)
VALUES
  (1, 2, 'enviada', CURDATE(), 'Incluye materiales básicos.', 2550000.00),
  (1, 1, 'aceptada', CURDATE(), 'Tiempo estimado: 10 días.', 2500000.00),
  (2, 1, 'enviada', CURDATE(), 'Requiere revisión previa.', 1850000.00),
  (3, 3, 'aceptada', CURDATE(), 'Incluye pintura lavable.', 1200000.00)
;

-- Contratos basados en cotizaciones aceptadas (ids de las cotizaciones aceptadas arriba: 2 y 4)
INSERT INTO CONTRATO (id_cotizacion, fecha_inicio, fecha_fin, costo_total, estado, comision_brixo)
VALUES
  (2, CURDATE() + INTERVAL 2 DAY, CURDATE() + INTERVAL 12 DAY, 2500000.00, 'en_curso', 250000.00),
  (4, CURDATE() + INTERVAL 3 DAY, CURDATE() + INTERVAL 8 DAY, 1200000.00, 'pendiente', 120000.00)
;

-- Reservas (1:1 con contrato)
-- Asumiendo id_contrato autoincrement: 1 y 2
INSERT INTO RESERVA (id_contrato, fecha_programada, duracion_estimada_min, estado, notas)
VALUES
  (1, NOW() + INTERVAL 3 DAY, 480, 'confirmada', 'Inicio 8:00 AM'),
  (2, NOW() + INTERVAL 4 DAY, 360, 'pendiente', 'Confirmar proveedor de pintura')
;

-- Pagos del cliente por contrato
INSERT INTO PAGO (id_contrato, monto, moneda, fecha_de_pago, medio_de_pago, estado, proveedor, referencia_externa)
VALUES
  (1, 1250000.00, 'COP', NOW(), 'tarjeta', 'aprobado', 'stripe', CONCAT('pi_', REPLACE(UUID(),'-',''))),
  (1, 1250000.00, 'COP', NOW() + INTERVAL 1 DAY, 'nequi', 'pendiente', NULL, NULL),
  (2, 1200000.00, 'COP', NOW(), 'daviplata', 'aprobado', 'wompi', CONCAT('txn_', REPLACE(UUID(),'-','')))
;

-- Desembolsos a contratistas
-- Para contrato 1, contratista viene de la cotización correspondiente (contratista 1)
INSERT INTO DESEMBOLSO (id_contrato, id_contratista, monto, moneda, fecha, medio, estado, referencia_externa)
VALUES
  (1, 1, 2250000.00, 'COP', NOW() + INTERVAL 2 DAY, 'transferencia', 'pendiente', NULL),
  (2, 3, 1080000.00, 'COP', NOW() + INTERVAL 2 DAY, 'transferencia', 'pendiente', NULL)
;

-- Reseñas (una por contrato)
-- Cliente para contrato 1 es el de la solicitud original (cliente 1); para contrato 2, cliente 3
INSERT IGNORE INTO RESENA (id_contrato, id_cliente, comentario, fecha, calificacion)
VALUES
  (1, 1, 'Excelente trabajo, muy cumplido.', CURDATE() + INTERVAL 15 DAY, 5),
  (2, 3, 'Buen servicio aunque se demoró un poco.', CURDATE() + INTERVAL 12 DAY, 4)
;

-- Fin del seed
