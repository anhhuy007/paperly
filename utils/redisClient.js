import { createClient } from "redis";

const redisClient = createClient({
  url: "redis://127.0.0.1:6379",
});

redisClient.on("error", (err) => console.error("Redis Error:", err));

// Connect to Redis
(async () => {
  await redisClient.connect();
})();

export default redisClient;