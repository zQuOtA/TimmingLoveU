import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

/**
 * Health Check API Endpoint
 * Returns the health status of the application and its dependencies
 */
export async function GET(request: NextRequest) {
  try {
    const startTime = Date.now();
    
    // Check database connectivity
    const dbHealthy = await checkDatabase();
    
    // Calculate response time
    const responseTime = Date.now() - startTime;
    
    // Determine overall health
    const isHealthy = dbHealthy;
    
    const healthStatus = {
      status: isHealthy ? 'healthy' : 'unhealthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      responseTime: `${responseTime}ms`,
      checks: {
        database: dbHealthy ? 'healthy' : 'unhealthy',
      },
      version: process.env.npm_package_version || '1.0.0',
      environment: process.env.NODE_ENV || 'development',
    };
    
    return NextResponse.json(
      healthStatus,
      { status: isHealthy ? 200 : 503 }
    );
  } catch (error) {
    console.error('Health check error:', error);
    
    return NextResponse.json(
      {
        status: 'unhealthy',
        timestamp: new Date().toISOString(),
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 503 }
    );
  }
}

/**
 * Check database connectivity
 */
async function checkDatabase(): Promise<boolean> {
  try {
    // Simple query to check if database is responsive
    await prisma.$queryRaw`SELECT 1`;
    return true;
  } catch (error) {
    console.error('Database health check failed:', error);
    return false;
  }
}

// HEAD method for simple health checks (used by load balancers)
export async function HEAD(request: NextRequest) {
  try {
    const dbHealthy = await checkDatabase();
    return new NextResponse(null, { status: dbHealthy ? 200 : 503 });
  } catch {
    return new NextResponse(null, { status: 503 });
  }
}
