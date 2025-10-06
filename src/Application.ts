import { GrpcServiceRegistry } from "./grpc/GrpcServiceRegistry";
import { GrpcServer } from "./grpc/server";
import { GreeterGrpcService } from "./grpc/services/GreeterGrpcService";
import { HttpServer } from "./http/server";

export class Application {
  private grpcServer: GrpcServer;
  private httpServer: HttpServer;

  constructor() {
    // Create service registry
    const registry = new GrpcServiceRegistry();
    
    // Register all gRPC services
    registry.registerAll([
      new GreeterGrpcService(),
    //   new UserGrpcService(),
    //   new ProductGrpcService(),
      // Add more services here
    ]);

    this.grpcServer = new GrpcServer(registry);
    this.httpServer = new HttpServer(3000);
  }

  async start(): Promise<void> {
    try {
      await this.httpServer.start();
      await this.grpcServer.start();
      console.log("✓ Application started successfully");
    } catch (error) {
      console.error("✗ Failed to start application:", error);
      throw error;
    }
  }

  async shutdown(): Promise<void> {
    await this.httpServer.shutdown();
    this.grpcServer.shutdown();
  }
}