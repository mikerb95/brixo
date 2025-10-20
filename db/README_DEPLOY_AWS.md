# Despliegue de esquema Brixo en AWS RDS (MySQL)

Este repo incluye `db/schema_brixo.sql` con el DDL recomendado para MySQL 8.0+.
Tu instancia es RDS MySQL Community (ver captura). Aquí hay dos formas simples para ejecutar el script.

## Opción A: AWS Query Editor v2 (recomendado, sin exponer la DB)

Requisitos: Permisos IAM para usar Query Editor v2 y una secret en AWS Secrets Manager con credenciales del usuario MySQL.

1. En AWS Console → RDS → Query Editor v2.
2. Crea o selecciona la conexión a la instancia `brixo` (elige la base `brixo` si existe; si no, el script la crea).
3. Abre `db/schema_brixo.sql`, copia su contenido y pégalo en el Query Editor.
4. Ejecuta el script completo. Revisa la consola de resultados por errores.

Notas:
- Si tu motor es MySQL 5.7, los `CHECK` no se aplican; en 8.0 sí. Recomendado 8.0.
- El script configura `STRICT_ALL_TABLES` a nivel de sesión para consistencia.

## Opción B: Cliente MySQL desde tu PC (con SSL)

Evita exponer públicamente la instancia. Si la instancia no es pública (como en tu captura), conecta desde una EC2 dentro de la misma VPC o usa Systems Manager Session Manager con port-forward.

### 1) Conexión directa (solo si la instancia es accesible y el SG lo permite)

En Windows PowerShell, con el cliente `mysql` instalado:

```powershell
# Verifica que tienes mysql.exe en PATH
mysql --version

# Conexión básica (reemplaza valores):
# -h <endpoint> -P 3306 -u <usuario> -p --ssl-mode=REQUIRED
mysql -h brixo.<tu-endpoint>.rds.amazonaws.com -P 3306 -u admin -p --ssl-mode=REQUIRED
```

Ejecutar el script desde archivo:

```powershell
mysql -h brixo.<tu-endpoint>.rds.amazonaws.com -P 3306 -u admin -p --ssl-mode=REQUIRED < ./db/schema_brixo.sql
```

### 2) Systems Manager (sin IP pública)

- Lanza una instancia EC2 en la misma VPC/subred del RDS y adjúntale un rol con `AmazonSSMManagedInstanceCore`.
- Conéctate por Session Manager (sin SSH) y desde ahí ejecuta el cliente `mysql` hacia el endpoint RDS (el SG debe permitir el tráfico desde la subred/EC2).
- Alternativamente, usa port-forward con `session-manager-plugin` desde tu máquina a la EC2 bastion.

## Validación rápida

En Query Editor o cliente mysql, ejecuta:

```sql
USE brixo;
SHOW TABLES;
SELECT COUNT(*) FROM information_schema.TABLES WHERE TABLE_SCHEMA='brixo';
```

## Poblar datos de ejemplo

Ejecuta el seed (opcional) después de crear el esquema:

```sql
SOURCE ./db/seed.sql;
```

En Query Editor v2, copia el contenido de `db/seed.sql` y ejecútalo.

## Migración parcial desde esquema legado

Si ya tienes tablas antiguas, ejecuta cambios graduales con:

```sql
SOURCE ./db/migrations/001_legacy_alter.sql;
```

Adapta los ALTER si tu versión es < 8.0 (algunos IF NOT EXISTS pueden no estar soportados).

## Usuario de aplicación (mínimos privilegios)

Crea un usuario de solo la app y concédele privilegios limitados:

```sql
CREATE USER IF NOT EXISTS 'brixo_app'@'%' IDENTIFIED BY 'cambia_esta_contrasena_segura';
GRANT SELECT, INSERT, UPDATE, DELETE, EXECUTE ON brixo.* TO 'brixo_app'@'%';
FLUSH PRIVILEGES;
```

Usa este usuario en tus variables de entorno de la app (Next.js).

## Integración con la app (Next.js)

- Define variables de entorno: `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`.
- Si usas Prisma/Drizzle, genera cliente y apunta a la base `brixo`.
- En producción, usa SSL (`?ssl-mode=REQUIRED` en el connection string si aplica).

## Archivo del esquema

- `db/schema_brixo.sql`: tablas, claves foráneas, índices y checks.

Si quieres, puedo añadir un `seed.sql` y scripts de migración `ALTER` desde tu esquema anterior.