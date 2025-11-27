const redis = require('redis');

let redisClient = null;

const connectRedis = async () => {
  try {
    redisClient = redis.createClient({
      url: process.env.REDIS_URL || 'redis://localhost:6379',
      password: process.env.REDIS_PASSWORD || undefined,
      retry_strategy: (options) => {
        if (options.error && options.error.code === 'ECONNREFUSED') {
          console.error('Redis server refused connection');
          return new Error('Redis server refused connection');
        }
        if (options.total_retry_time > 1000 * 60 * 60) {
          console.error('Redis retry time exhausted');
          return new Error('Redis retry time exhausted');
        }
        if (options.attempt > 10) {
          console.error('Redis max retry attempts reached');
          return undefined;
        }
        return Math.min(options.attempt * 100, 3000);
      }
    });

    redisClient.on('connect', () => {
      console.log('✅ Redis Connected');
    });

    redisClient.on('error', (err) => {
      console.error('Redis Client Error:', err);
    });

    redisClient.on('ready', () => {
      console.log('✅ Redis Ready');
    });

    redisClient.on('end', () => {
      console.log('Redis connection ended');
    });

    await redisClient.connect();

  } catch (error) {
    console.error('Redis connection failed:', error);
    // Don't exit process, Redis is optional for caching
  }
};

const getRedisClient = () => {
  return redisClient;
};

const setCache = async (key, value, expireTime = 3600) => {
  try {
    if (!redisClient) return;
    await redisClient.setEx(key, expireTime, JSON.stringify(value));
  } catch (error) {
    console.error('Redis set error:', error);
  }
};

const getCache = async (key) => {
  try {
    if (!redisClient) return null;
    const value = await redisClient.get(key);
    return value ? JSON.parse(value) : null;
  } catch (error) {
    console.error('Redis get error:', error);
    return null;
  }
};

const deleteCache = async (key) => {
  try {
    if (!redisClient) return;
    await redisClient.del(key);
  } catch (error) {
    console.error('Redis delete error:', error);
  }
};

const clearCache = async () => {
  try {
    if (!redisClient) return;
    await redisClient.flushAll();
  } catch (error) {
    console.error('Redis clear error:', error);
  }
};

module.exports = {
  connectRedis,
  getRedisClient,
  setCache,
  getCache,
  deleteCache,
  clearCache
}; 