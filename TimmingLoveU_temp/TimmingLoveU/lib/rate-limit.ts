/**
 * Simple in-memory rate limiter
 * For production, consider using Redis-based rate limiting (e.g., Upstash)
 */

interface RateLimitStore {
  [key: string]: {
    count: number;
    resetTime: number;
  };
}

const store: RateLimitStore = {};

export interface RateLimitConfig {
  interval: number; // Time window in milliseconds
  uniqueTokenPerInterval: number; // Max requests per interval
}

export class RateLimiter {
  private interval: number;
  private uniqueTokenPerInterval: number;

  constructor(config: RateLimitConfig) {
    this.interval = config.interval;
    this.uniqueTokenPerInterval = config.uniqueTokenPerInterval;
  }

  async check(identifier: string): Promise<{ success: boolean; limit: number; remaining: number; reset: number }> {
    const now = Date.now();
    const tokenData = store[identifier];

    // Clean up old entries periodically
    this.cleanup();

    if (!tokenData || now > tokenData.resetTime) {
      // First request or window expired
      store[identifier] = {
        count: 1,
        resetTime: now + this.interval,
      };

      return {
        success: true,
        limit: this.uniqueTokenPerInterval,
        remaining: this.uniqueTokenPerInterval - 1,
        reset: store[identifier].resetTime,
      };
    }

    // Increment count
    tokenData.count++;

    if (tokenData.count > this.uniqueTokenPerInterval) {
      // Rate limit exceeded
      return {
        success: false,
        limit: this.uniqueTokenPerInterval,
        remaining: 0,
        reset: tokenData.resetTime,
      };
    }

    return {
      success: true,
      limit: this.uniqueTokenPerInterval,
      remaining: this.uniqueTokenPerInterval - tokenData.count,
      reset: tokenData.resetTime,
    };
  }

  private cleanup() {
    const now = Date.now();
    const keys = Object.keys(store);
    
    // Only cleanup if we have more than 1000 entries
    if (keys.length < 1000) return;

    for (const key of keys) {
      if (store[key].resetTime < now) {
        delete store[key];
      }
    }
  }
}

/**
 * Rate limiter for API routes
 * 
 * @example
 * ```ts
 * const limiter = new RateLimiter({
 *   interval: 60 * 1000, // 1 minute
 *   uniqueTokenPerInterval: 10, // 10 requests per minute
 * });
 * 
 * const result = await limiter.check(req.ip);
 * if (!result.success) {
 *   return new Response('Too Many Requests', { status: 429 });
 * }
 * ```
 */

// Pre-configured rate limiters
export const apiRateLimiter = new RateLimiter({
  interval: 60 * 1000, // 1 minute
  uniqueTokenPerInterval: 60, // 60 requests per minute
});

export const authRateLimiter = new RateLimiter({
  interval: 15 * 60 * 1000, // 15 minutes
  uniqueTokenPerInterval: 5, // 5 login attempts per 15 minutes
});

export const uploadRateLimiter = new RateLimiter({
  interval: 60 * 60 * 1000, // 1 hour
  uniqueTokenPerInterval: 20, // 20 uploads per hour
});

/**
 * Get client identifier from request
 */
export function getClientIdentifier(request: Request): string {
  // Try to get IP from various headers
  const forwarded = request.headers.get('x-forwarded-for');
  const realIp = request.headers.get('x-real-ip');
  
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  
  if (realIp) {
    return realIp;
  }
  
  // Fallback to a default identifier
  return 'unknown';
}

/**
 * Apply rate limiting to API routes
 * 
 * @example
 * ```ts
 * export async function POST(request: Request) {
 *   const rateLimitResult = await applyRateLimit(request, apiRateLimiter);
 *   if (!rateLimitResult.success) {
 *     return rateLimitResult.response;
 *   }
 *   
 *   // Your API logic here
 * }
 * ```
 */
export async function applyRateLimit(
  request: Request,
  limiter: RateLimiter = apiRateLimiter
): Promise<{ success: true } | { success: false; response: Response }> {
  const identifier = getClientIdentifier(request);
  const result = await limiter.check(identifier);

  if (!result.success) {
    const resetDate = new Date(result.reset);
    
    return {
      success: false,
      response: new Response(
        JSON.stringify({
          error: 'Too Many Requests',
          message: 'Rate limit exceeded. Please try again later.',
          limit: result.limit,
          remaining: result.remaining,
          reset: resetDate.toISOString(),
        }),
        {
          status: 429,
          headers: {
            'Content-Type': 'application/json',
            'X-RateLimit-Limit': result.limit.toString(),
            'X-RateLimit-Remaining': result.remaining.toString(),
            'X-RateLimit-Reset': result.reset.toString(),
            'Retry-After': Math.ceil((result.reset - Date.now()) / 1000).toString(),
          },
        }
      ),
    };
  }

  return { success: true };
}
