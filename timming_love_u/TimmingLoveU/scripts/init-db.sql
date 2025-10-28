
-- Initial database setup for PostgreSQL
-- This script runs automatically when the database container starts

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- Create indexes for better performance (Prisma will handle table creation)
-- Additional custom indexes can be added here

-- Grant necessary permissions
GRANT ALL PRIVILEGES ON DATABASE timming_loveu TO timming;

-- Log setup completion
SELECT 'Database initialization completed' AS status;
