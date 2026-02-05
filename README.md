# Intercel - Sistema de Planes eSIM

Sistema completo para la gestión de planes eSIM de Intercel, incluyendo:

- **Frontend público**: Sitio web con planes dinámicos
- **Panel de administración**: Gestión de planes y categorías
- **API Backend**: Node.js + Express + Prisma
- **Base de datos**: PostgreSQL

## Arquitectura

```
┌─────────────────────────────────────────────────────────────────┐
│                         Traefik                                  │
│                    (Reverse Proxy + SSL)                         │
└────────────┬──────────────┬──────────────┬─────────────────────┘
             │              │              │
             ▼              ▼              ▼
┌────────────────┐ ┌────────────────┐ ┌────────────────┐
│   Frontend     │ │     Admin      │ │      API       │
│  (React/Nginx) │ │  (React/Nginx) │ │ (Node/Express) │
│     :80        │ │      :80       │ │     :8001      │
└────────────────┘ └────────────────┘ └───────┬────────┘
                                              │
                                              ▼
                                    ┌────────────────┐
                                    │   PostgreSQL   │
                                    │     :5432      │
                                    └────────────────┘
```

## URLs de Producción

| Servicio | URL |
|----------|-----|
| Frontend Público | https://intercel.entersys.mx |
| Panel Admin | https://admin.intercel.entersys.mx |
| API | https://api.intercel.entersys.mx |

## Requisitos

- Docker 20.10+
- Docker Compose 2.0+
- Red `traefik-public` existente

## Instalación

### 1. Clonar o copiar archivos al servidor

```bash
# En el servidor
mkdir -p ~/intercel && cd ~/intercel
# Copiar todos los archivos del proyecto
```

### 2. Configurar variables de entorno

```bash
# Copiar y editar el archivo de configuración
cp .env.example .env
nano .env
```

Variables importantes a configurar:

```env
DB_USER=intercel
DB_PASSWORD=<contraseña_segura>
DB_NAME=intercel_db
JWT_SECRET=<secreto_jwt_min_32_caracteres>
ADMIN_EMAIL=admin@intercel.com.mx
ADMIN_PASSWORD=<contraseña_admin_inicial>
```

### 3. Verificar red de Traefik

```bash
docker network ls | grep traefik-public
# Si no existe, crearla:
docker network create traefik-public
```

### 4. Desplegar

```bash
docker compose up -d --build
```

### 5. Verificar estado

```bash
# Ver logs
docker compose logs -f

# Ver estado de contenedores
docker compose ps

# Verificar health checks
docker inspect --format='{{.State.Health.Status}}' intercel-api
```

## Acceso al Panel Admin

1. Ir a https://admin.intercel.entersys.mx
2. Usar las credenciales configuradas en `.env`:
   - Email: ADMIN_EMAIL
   - Password: ADMIN_PASSWORD
3. **Importante**: Cambiar la contraseña después del primer login

## Estructura del Proyecto

```
intercel/
├── docker-compose.yml      # Orquestación de servicios
├── .env                    # Variables de entorno
├── intercel-api/           # Backend API
│   ├── Dockerfile
│   ├── package.json
│   ├── prisma/
│   │   ├── schema.prisma   # Modelo de datos
│   │   └── seed.js         # Datos iniciales
│   └── src/
│       ├── index.js        # Entry point
│       ├── middleware/     # Auth middleware
│       └── routes/         # API routes
├── intercel-web-react/     # Frontend público
│   ├── Dockerfile
│   ├── nginx.conf
│   └── src/
└── intercel-admin/         # Panel de administración
    ├── Dockerfile
    ├── nginx.conf
    └── src/
```

## API Endpoints

### Públicos (sin autenticación)

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/public/plans` | Obtener planes por categoría |
| GET | `/api/public/categories` | Obtener categorías |
| GET | `/api/public/config` | Obtener configuración |
| GET | `/health` | Health check |

### Autenticación

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/api/auth/login` | Login |
| GET | `/api/auth/me` | Usuario actual |
| PUT | `/api/auth/password` | Cambiar contraseña |

### Categorías (requiere auth)

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/categories` | Listar categorías |
| POST | `/api/categories` | Crear categoría |
| PUT | `/api/categories/:id` | Actualizar categoría |
| DELETE | `/api/categories/:id` | Eliminar categoría |

### Planes (requiere auth)

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/plans` | Listar planes |
| GET | `/api/plans/:id` | Obtener plan |
| POST | `/api/plans` | Crear plan |
| PUT | `/api/plans/:id` | Actualizar plan |
| DELETE | `/api/plans/:id` | Eliminar plan |
| POST | `/api/plans/duplicate/:id` | Duplicar plan |

## Comandos Útiles

```bash
# Reiniciar servicios
docker compose restart

# Ver logs de un servicio específico
docker compose logs -f intercel-api

# Reconstruir un servicio
docker compose up -d --build intercel-frontend

# Acceder a la base de datos
docker exec -it intercel-db psql -U intercel -d intercel_db

# Ejecutar migraciones manualmente
docker exec -it intercel-api npx prisma migrate deploy

# Re-seed de la base de datos
docker exec -it intercel-api npm run prisma:seed

# Limpiar y reconstruir todo
docker compose down -v
docker compose up -d --build
```

## Backup de Base de Datos

```bash
# Crear backup
docker exec intercel-db pg_dump -U intercel intercel_db > backup_$(date +%Y%m%d).sql

# Restaurar backup
cat backup.sql | docker exec -i intercel-db psql -U intercel -d intercel_db
```

## Monitoreo

Los servicios están configurados con health checks:

- **API**: `GET /health`
- **Frontend**: `GET /` (nginx)
- **Admin**: `GET /` (nginx)
- **Database**: `pg_isready`

Métricas disponibles en Prometheus/Grafana del servidor.

## Troubleshooting

### El frontend no carga los planes

1. Verificar que la API esté corriendo: `curl https://api.intercel.entersys.mx/health`
2. Verificar CORS en los logs: `docker compose logs intercel-api`
3. El frontend usa datos de fallback si la API no responde

### Error de conexión a base de datos

1. Verificar que el contenedor esté corriendo: `docker compose ps`
2. Verificar health check: `docker inspect intercel-db`
3. Ver logs: `docker compose logs intercel-db`

### Error 502 Bad Gateway

1. Verificar que Traefik esté corriendo
2. Verificar que los contenedores estén en la red `traefik-public`
3. Revisar logs de Traefik

## Recursos

- [Documentación de Traefik](https://doc.traefik.io/traefik/)
- [Prisma ORM](https://www.prisma.io/docs)
- [Material-UI](https://mui.com/)

## Contacto

- **Admin Server**: armando.cortes@entersys.mx
- **Monitoreo**: https://monitoring.entersys.mx
