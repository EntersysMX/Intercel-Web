# ============================================
# Intercel API Dockerfile
# Multi-stage build for optimized production image
# ============================================

# Stage 1: Build
FROM node:20-alpine AS builder

# Install OpenSSL for Prisma
RUN apk add --no-cache openssl openssl-dev

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY prisma ./prisma/

# Install dependencies
RUN npm install --omit=dev

# Generate Prisma client
RUN npx prisma generate

# Stage 2: Production
FROM node:20-alpine AS production

WORKDIR /app

# Install dumb-init, wget, and OpenSSL for Prisma
RUN apk add --no-cache dumb-init wget openssl

# Create non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

# Copy from builder
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/prisma ./prisma

# Copy source code
COPY src ./src
COPY package*.json ./

# Set ownership
RUN chown -R nodejs:nodejs /app

# Switch to non-root user
USER nodejs

# Expose port
EXPOSE 8001

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD wget -q --spider http://localhost:8001/health || exit 1

# Start with dumb-init
ENTRYPOINT ["dumb-init", "--"]

# Run migrations and start
CMD ["sh", "-c", "npx prisma migrate deploy && npx prisma db seed && node src/index.js"]
