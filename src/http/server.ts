import Fastify, { type FastifyInstance } from "fastify";
import { logger } from "../logger/logger";
import pinoHttp from 'pino-http';

export class HttpServer {
  private app: FastifyInstance;

  constructor(private port: number = 3000) {
    this.app = Fastify({ logger: {
      level: "info",
        base: undefined,
        timestamp: () => `,"time":"${new Date().toISOString()}"`,
        transport: {
          target: 'pino-loki',
          options: {
            batching: true,
            interval: 5,
            host: process.env.LOKI_PINO_URL,
            basicAuth: {
              username: "a",
              password: "a",
            },
            labels: { app: "kiosk-backend" },
            replaceTimestamp: true,
          },
        },
    } });

    this.setupRoutes();
  }

  private setupRoutes(): void {
    this.app.get("/", async () => ({ 
      status: "gRPC Server Running 🚀" 
    }));

    this.app.get("/health", async () => ({ 
      status: "ok",
      timestamp: new Date().toISOString()
    }));
  }

  async start(): Promise<void> {
    try {
      await this.app.listen({ port: this.port });
      this.app.log.info(`🚀 HTTP server running on port ${this.port}`);
    } catch (err) {
      this.app.log.error(err, '❌ Failed to start server');
      process.exit(1);
    }
  }

  async shutdown(): Promise<void> {
    await this.app.close();
  }

  getApp(): FastifyInstance {
    return this.app;
  }
}