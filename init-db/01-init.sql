-- Intercel Database Initialization
-- This file runs automatically when PostgreSQL container starts for the first time

-- Create extensions if needed
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Grant permissions
GRANT ALL PRIVILEGES ON DATABASE intercel_db TO intercel;

-- Note: Prisma will handle table creation via migrations
-- This file is for any additional setup needed
