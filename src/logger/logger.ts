import pino from 'pino';

export const logger = pino({
    level: "info",
    base: undefined,
    timestamp: () => `,"time":"${new Date().toISOString()}"`,
    transport: process.env.NODE_ENV !== "production"
    ? {
        target: "pino-pretty",
        options: {
          colorize: true,
          translateTime: "yyyy-mm-dd HH:MM:ss",
          ignore: "pid,hostname",
        },
      }
    : {
        target: "pino-loki",
        options: {
          batching: true,
          interval: 5,
          host: process.env.LOKI_PINO_URL,
          basicAuth: { username: "a", password: "a" },
          labels: { app: "kiosk-backend" },
          replaceTimestamp: true,
        },
      }
})