import Fastify, { type FastifyInstance } from "fastify";

export class HttpServer {
  private app: FastifyInstance;

  constructor(private port: number = 3000) {
    this.app = Fastify({ logger: true });
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
    await this.app.listen({ port: this.port });
  }

  async shutdown(): Promise<void> {
    await this.app.close();
  }

  getApp(): FastifyInstance {
    return this.app;
  }
}