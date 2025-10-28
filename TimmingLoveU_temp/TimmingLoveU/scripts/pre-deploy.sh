
#!/bin/bash
# Pre-deployment checks and preparations

set -e

echo "🔍 Running pre-deployment checks..."

# Check Node.js version
echo "📌 Checking Node.js version..."
node --version

# Check npm version
echo "📌 Checking npm version..."
npm --version

# Install dependencies
echo "📦 Installing dependencies..."
npm ci

# Generate Prisma Client
echo "🔧 Generating Prisma Client..."
npx prisma generate

# Run type checking
echo "🔍 Running TypeScript type checking..."
npx tsc --noEmit

# Run linting
echo "🧹 Running ESLint..."
npm run lint || echo "⚠️  Linting warnings found (non-blocking)"

# Run tests
echo "🧪 Running tests..."
npm test

# Build application
echo "🏗️  Building application..."
npm run build

echo "✅ Pre-deployment checks completed successfully!"
