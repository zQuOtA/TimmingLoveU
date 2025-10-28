
#!/bin/bash
# Health check script for production monitoring

set -e

# Configuration
HOST="${HOST:-localhost}"
PORT="${PORT:-3000}"
ENDPOINT="${ENDPOINT:-/api/health}"
TIMEOUT="${TIMEOUT:-5}"

URL="http://${HOST}:${PORT}${ENDPOINT}"

echo "🏥 Running health check on ${URL}..."

# Perform health check
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" --connect-timeout $TIMEOUT "$URL")

if [ "$HTTP_CODE" -eq 200 ]; then
  echo "✅ Health check passed (HTTP $HTTP_CODE)"
  exit 0
else
  echo "❌ Health check failed (HTTP $HTTP_CODE)"
  exit 1
fi
