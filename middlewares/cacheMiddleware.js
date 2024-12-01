// middlewares/cacheMiddleware.js
import redisClient from '../utils/redisClient.js'

/**
 * A middleware that caches the response body in Redis for a specified expiration time.
 * The cache key is generated by the provided cacheKeyGenerator function.
 *
 * @param {function} cacheKeyGenerator - A function that takes the request object and returns a string,
 *   which is used as the cache key.
 * @param {number} expiration - The expiration time in seconds. Defaults to 300 seconds (5 minutes).
 * @returns {function} - The middleware function.
 * @example
 * const keyGenerator = (req) => `user:${req.params.id}`;
 * const cacheMiddleware = cacheMiddleware(keyGenerator);
 * app.get("/users/:id", cacheMiddleware, (req, res) => {
 *   // ...
 * });
 */
export default function cacheMiddleware(cacheKeyGenerator, expiration = 300) {
  /**
   * The middleware function that will be called during the Express request lifecycle.
   * @param {Object} req - The Express request object.
   * @param {Object} res - The Express response object.
   * @param {function} next - The Express next middleware function.
   */
  return async (req, res, next) => {
    try {
      const cacheKey = cacheKeyGenerator(req)
      const cachedData = await redisClient.get(cacheKey)

      if (cachedData) {
        console.log('Cache hit:', cacheKey)
        // Return the cached data with a 200 status
        res.status(200).json({
          success: true,
          data: JSON.parse(cachedData),
        })
      } else {
        console.log('Cache miss:', cacheKey)
        // The cache key does not exist, so we need to store the response in Redis
        const originalJson = res.json.bind(res)
        res.json = async (body) => {
          try {
            // Store the response body in Redis with the specified expiration time
            await redisClient.setEx(cacheKey, expiration, JSON.stringify(body.data))
          } catch (e) {
            console.error('Redis setEx error:', e)
          }
          // Call the original res.json() function to send the response to the client
          originalJson(body)
        }

        // Call the next middleware in the stack
        next()
      }
    } catch (err) {
      console.error('Cache middleware error:', err)

      // Call the next middleware in the stack if an error occurs
      next()
    }
  }
}
