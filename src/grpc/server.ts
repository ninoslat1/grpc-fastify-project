import grpc from "@grpc/grpc-js";
import { GrpcServiceRegistry } from "./GrpcServiceRegistry.js";

export class GrpcServer {
  private server: grpc.Server;
  private registry: GrpcServiceRegistry;

  constructor(
    registry: GrpcServiceRegistry,
    private address: string = "0.0.0.0:50051"
  ) {
    this.server = new grpc.Server();
    this.registry = registry;
  }

  async start(): Promise<void> {
    this.registry.loadServicesIntoServer(this.server);

    return new Promise((resolve, reject) => {
      this.server.bindAsync(
        this.address,
        grpc.ServerCredentials.createInsecure(),
        (err, port) => {
          if (err) {
            reject(err);
          } else {
            console.log(`gRPC server running at ${this.address}`);
            console.log(`Registered services: ${this.registry.getRegisteredServices().join(", ")}`);
            resolve();
          }
        }
      );
    });
  }

  shutdown(): void {
    this.server.forceShutdown();
  }
}