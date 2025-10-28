
#!/bin/bash
# Script to run Prisma migrations in production

set -e

echo "🚀 Starting production database migration..."

# Check if DATABASE_URL is set
if [ -z "$DATABASE_URL" ]; then
  echo "❌ ERROR: DATABASE_URL environment variable is not set"
  exit 1
fi

# Generate Prisma Client
echo "📦 Generating Prisma Client..."
npx prisma generate

# Run migrations
echo "🔄 Running database migrations..."
npx prisma migrate deploy

# Optional: Seed database if needed
if [ "$SEED_DB" = "true" ]; then
  echo "🌱 Seeding database..."
  npx prisma db seed
fi

echo "✅ Migration completed successfully!"
