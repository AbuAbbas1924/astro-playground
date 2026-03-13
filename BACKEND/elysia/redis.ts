import Redis from "ioredis";

// export const redis = new Redis({
//   host: process.env.REDIS_HOST,
//   port: parseInt(process.env.REDIS_PORT),
//   password: process.env.REDIS_PASSWORD,
//   // db: 0,
//   // keyPrefix: "elysia:",
//   // enableReadyCheck: true,
//   // lazyConnect: true,
//   // reconnectOnError: (err) => {
//   //   return true;
//   // },
// });

export const pub = new Redis({host: 'localhost', port: 6379});
pub.on("connect", () => { console.error("Redis PUB connected"); });
pub.on("error", (err) => { console.error("Redis Pub Error:", err); });
export const sub = new Redis({ host: 'localhost', port: 6379 });
sub.on("connect", () => { console.error("Redis SUB connected"); });
sub.on("error", (err) => { console.error("Redis Sub Error:", err); });