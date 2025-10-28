/**
 * PM2 Ecosystem Configuration
 * Used for production deployment with PM2 process manager
 * 
 * Usage:
 *   pm2 start ecosystem.config.js
 *   pm2 restart ecosystem.config.js
 *   pm2 stop ecosystem.config.js
 *   pm2 delete ecosystem.config.js
 */

module.exports = {
  apps: [
    {
      name: 'timming-loveu',
      script: 'npm',
      args: 'start',
      cwd: './',
      instances: 'max', // Use all available CPU cores
      exec_mode: 'cluster', // Enable cluster mode for better performance
      
      // Environment variables
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
      },
      
      // Logging
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      error_file: './logs/error.log',
      out_file: './logs/out.log',
      merge_logs: true,
      
      // Advanced features
      watch: false, // Don't watch files in production
      ignore_watch: ['node_modules', 'logs', '.next', 'public/uploads'],
      
      // Auto-restart configuration
      max_memory_restart: '1G', // Restart if memory exceeds 1GB
      min_uptime: '10s', // Consider app crashed if uptime is less than 10s
      max_restarts: 10, // Max number of unstable restarts
      autorestart: true, // Auto-restart on crash
      
      // Graceful shutdown
      kill_timeout: 5000, // Time to wait for graceful shutdown
      listen_timeout: 3000, // Time to wait for app to be ready
      
      // Process management
      wait_ready: false,
      shutdown_with_message: false,
    },
  ],

  // Deploy configuration (optional)
  deploy: {
    production: {
      user: 'ubuntu',
      host: 'your-server.com',
      ref: 'origin/main',
      repo: 'git@github.com:your-username/timming-loveu.git',
      path: '/var/www/timming-loveu',
      'pre-deploy-local': '',
      'post-deploy': 'npm install && npm run build && pm2 reload ecosystem.config.js --env production',
      'pre-setup': '',
    },
  },
};
