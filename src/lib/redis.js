import Redis from "ioredis";

let redis;

if (!redis) {
  redis = new Redis({
    host: "127.0.0.1",
    port: 6379,
  });
}

export default redis;
