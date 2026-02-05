# Intercel Web - Deployment Guide

This document provides step-by-step instructions for deploying the Intercel Web application to production.

## Prerequisites

1. **Server with Docker installed**
   - Docker 20.10+
   - Docker Compose 2.0+

2. **Traefik reverse proxy running**
   - Network `traefik-public` must exist
   - Traefik configured with Let's Encrypt for SSL

3. **Git access to repository**
   - https://github.com/EntersysMX/Intercel-Web

## Architecture Overview

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

## Production URLs

| Service | URL |
|---------|-----|
| Frontend (Public) | https://intercel.entersys.mx |
| Admin Panel | https://admin.intercel.entersys.mx |
| API | https://api.intercel.entersys.mx |

## Deployment Steps

### 1. Connect to the Production Server

```bash
# Using gcloud
gcloud compute ssh prod-server --zone=us-central1-c

# Or using SSH directly
ssh user@your-server-ip
```

### 2. Navigate to Project Directory

```bash
cd /srv/app-intercel/Web
```

### 3. Pull Latest Changes

```bash
git pull origin main
```

### 4. Create/Update Environment File

If `.env` doesn't exist, create it:

```bash
cat > .env << 'EOF'
# Database Configuration
DB_USER=intercel
DB_PASSWORD=YOUR_SECURE_PASSWORD_HERE
DB_NAME=intercel_db

# API Configuration
JWT_SECRET=YOUR_JWT_SECRET_MIN_32_CHARS
NODE_ENV=production

# Admin Credentials (used for initial seed)
ADMIN_EMAIL=admin@intercel.com.mx
ADMIN_PASSWORD=YOUR_ADMIN_PASSWORD_HERE
EOF
```

**Important:** Replace placeholder values with secure passwords.

### 5. Verify Traefik Network Exists

```bash
docker network ls | grep traefik-public

# If not found, create it:
docker network create traefik-public
```

### 6. Build and Deploy

```bash
# Build and start all services
docker compose up -d --build
```

### 7. Verify Deployment

```bash
# Check container status
docker compose ps

# All containers should show "healthy" status
```

Expected output:
```
NAME                STATUS
intercel-admin      Up (healthy)
intercel-api        Up (healthy)
intercel-db         Up (healthy)
intercel-frontend   Up (healthy)
```

### 8. Verify API is Working

```bash
# Test health endpoint
curl https://api.intercel.entersys.mx/health

# Test public plans endpoint
curl https://api.intercel.entersys.mx/api/public/plans
```

## Common Operations

### View Logs

```bash
# All services
docker compose logs -f

# Specific service
docker compose logs -f intercel-api
docker compose logs -f intercel-frontend
docker compose logs -f intercel-admin
docker compose logs -f intercel-db
```

### Restart Services

```bash
# Restart all services
docker compose restart

# Restart specific service
docker compose restart intercel-api
```

### Rebuild Specific Service

```bash
# Rebuild and restart only the API
docker compose up -d --build intercel-api

# Rebuild and restart only the frontend
docker compose up -d --build intercel-frontend

# Rebuild and restart only the admin
docker compose up -d --build intercel-admin
```

### Access Database

```bash
# Enter PostgreSQL shell
docker exec -it intercel-db psql -U intercel -d intercel_db

# Common queries:
# List all plans: SELECT * FROM "Plan";
# List all categories: SELECT * FROM "Category";
# List users: SELECT id, email, role FROM "User";
```

### Re-seed Database

If you need to reset the database data:

```bash
# Warning: This will delete all existing data
docker compose down -v
docker compose up -d --build
```

## Backup and Restore

### Create Backup

```bash
docker exec intercel-db pg_dump -U intercel intercel_db > backup_$(date +%Y%m%d_%H%M%S).sql
```

### Restore Backup

```bash
cat backup_file.sql | docker exec -i intercel-db psql -U intercel -d intercel_db
```

## Troubleshooting

### API Container Keeps Restarting

1. Check logs:
   ```bash
   docker logs intercel-api --tail 100
   ```

2. Common causes:
   - Database not ready: Wait for `intercel-db` to be healthy
   - Environment variables missing: Check `.env` file
   - Prisma migration issues: Check Prisma logs

### Frontend/Admin Not Loading Plans

1. Check API is running:
   ```bash
   curl https://api.intercel.entersys.mx/health
   ```

2. Check CORS configuration in docker-compose.yml

3. Check browser console for errors

### Database Connection Issues

1. Verify database container is healthy:
   ```bash
   docker inspect intercel-db | grep -A 5 "Health"
   ```

2. Test database connection:
   ```bash
   docker exec -it intercel-db psql -U intercel -d intercel_db -c "SELECT 1"
   ```

### 502 Bad Gateway

1. Check Traefik is running
2. Verify containers are on `traefik-public` network:
   ```bash
   docker network inspect traefik-public
   ```
3. Check container labels match Traefik configuration

## Security Notes

1. **Change default admin password** after first login at https://admin.intercel.entersys.mx

2. **Keep `.env` file secure** - never commit to git

3. **Regular backups** - set up automated database backups

4. **Monitor health checks** - all containers should stay healthy

## Project Structure

```
/srv/app-intercel/Web/
├── docker-compose.yml      # Main orchestration file
├── .env                    # Environment variables (not in git)
├── DEPLOYMENT.md           # This file
├── README.md               # Project overview
├── init-db/               # Database initialization scripts
├── intercel-api/          # Backend API (Node.js + Express + Prisma)
│   ├── Dockerfile
│   ├── package.json
│   ├── prisma/
│   │   ├── schema.prisma  # Database schema
│   │   └── seed.js        # Initial data
│   └── src/               # API source code
├── intercel-web-react/    # Frontend (React + Vite + MUI)
│   ├── Dockerfile
│   ├── nginx.conf
│   └── src/               # Frontend source code
└── intercel-admin/        # Admin panel (React + Vite + MUI)
    ├── Dockerfile
    ├── nginx.conf
    └── src/               # Admin source code
```

## CI/CD Pipeline (Optional)

For automated deployments, add this workflow to `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Deploy via SSH
        uses: appleboy/ssh-action@master
        with:
          host: ${{ secrets.SERVER_HOST }}
          username: ${{ secrets.SERVER_USER }}
          key: ${{ secrets.SSH_KEY }}
          script: |
            cd /srv/app-intercel/Web
            git pull origin main
            docker compose up -d --build
```

## Support

- **Server Admin:** armando.cortes@entersys.mx
- **Repository:** https://github.com/EntersysMX/Intercel-Web
- **Monitoring:** https://monitoring.entersys.mx
