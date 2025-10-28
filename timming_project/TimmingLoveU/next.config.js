const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: process.env.NEXT_DIST_DIR || '.next',
  output: process.env.NEXT_OUTPUT_MODE,
  
  experimental: {
    outputFileTracingRoot: path.join(__dirname, '../'),
  },
  
  // Linting and Type Checking Configuration
  eslint: {
    ignoreDuringBuilds: process.env.NODE_ENV === 'production', // Ignore during prod builds
  },
  typescript: {
    ignoreBuildErrors: false, // Always check TypeScript errors
  },
  
  // Image Optimization Configuration
  images: {
    unoptimized: false, // Enable optimization in production
    domains: [], // Add your image domains here (e.g., Cloudinary, S3)
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
  },
  
  // Security Headers
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()'
          }
        ],
      },
      {
        source: '/api/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store, must-revalidate'
          }
        ],
      },
    ];
  },
  
  // Compression
  compress: true,
  
  // Production Optimization
  swcMinify: true,
  
  // Redirects
  async redirects() {
    return [
      // Add any redirects here if needed
    ];
  },
  
  // Rewrites (if needed)
  async rewrites() {
    return [
      // Add any rewrites here if needed
    ];
  },
  
  // Environment Variables
  env: {
    NEXT_PUBLIC_APP_URL: process.env.NEXTAUTH_URL,
  },
  
  // Webpack Configuration (if needed)
  webpack: (config, { isServer }) => {
    // Custom webpack config if needed
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }
    return config;
  },
};

module.exports = nextConfig;
