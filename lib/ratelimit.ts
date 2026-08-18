import { createClient } from 'redis';

let client: ReturnType<typeof createClient> | null = null;

async function getRedis() {
  if (!client) {
    client = createClient({ url: process.env.REDIS_URL });
    client.on('error', (err) => console.error('Redis error:', err));
    await client.connect();
  }
  return client;
}

export async function checkRateLimit(
  key: string,
  limit: number,
  windowSeconds: number
): Promise<{ success: boolean; remaining: number }> {
  try {
    const redis = await getRedis();
    const current = await redis.incr(key);
    if (current === 1) {
      await redis.expire(key, windowSeconds);
    }
    const remaining = Math.max(0, limit - current);
    return { success: current <= limit, remaining };
  } catch (e) {
    console.error('Rate limit error:', e);
    return { success: true, remaining: 1 };
  }
}

export async function loginLimit(ip: string) {
  return checkRateLimit(`cyboeta:login:${ip}`, 5, 900);
}

export async function registerLimit(ip: string) {
  return checkRateLimit(`cyboeta:register:${ip}`, 3, 3600);
}
