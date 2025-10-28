
#!/bin/bash
# Post-deployment tasks

set -e

echo "🚀 Running post-deployment tasks..."

# Wait for application to be ready
echo "⏳ Waiting for application to start..."
sleep 10

# Run health check
echo "🏥 Running health check..."
./scripts/health-check.sh

# Optional: Clear cache
if [ "$CLEAR_CACHE" = "true" ]; then
  echo "🧹 Clearing cache..."
  # Add cache clearing logic here if needed
fi

# Optional: Send deployment notification
if [ -n "$SLACK_WEBHOOK_URL" ]; then
  echo "📢 Sending deployment notification..."
  curl -X POST -H 'Content-type: application/json' \
    --data "{\"text\":\"✅ Timming LoveU deployed successfully to production!\"}" \
    "$SLACK_WEBHOOK_URL"
fi

echo "✅ Post-deployment tasks completed!"
