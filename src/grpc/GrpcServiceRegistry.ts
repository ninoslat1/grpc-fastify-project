import grpc from "@grpc/grpc-js";
import protoLoader from "@grpc/proto-loader";
import type { IGrpcService } from "./interfaces/IGrpcService";

export class GrpcServiceRegistry {
  private services: IGrpcService[] = [];

  register(service: IGrpcService): void {
    this.services.push(service);
  }

  registerAll(services: IGrpcService[]): void {
    this.services.push(...services);
  }

  loadServicesIntoServer(server: grpc.Server): void {
    for (const service of this.services) {
      try {
        const packageDef = protoLoader.loadSync(service.getProtoPath());
        const grpcObject = grpc.loadPackageDefinition(packageDef) as any;
        const packageObj = grpcObject[service.getPackageName()];

        if (!packageObj || !packageObj[service.getServiceName()]) {
          throw new Error(
            `Service ${service.getServiceName()} not found in package ${service.getPackageName()}`
          );
        }

        const serviceDefinition = packageObj[service.getServiceName()].service;
        server.addService(serviceDefinition, service.getHandlers());
        
        console.log(`✓ Registered gRPC service: ${service.getServiceName()}`);
      } catch (error) {
        console.error(`✗ Failed to register service ${service.getServiceName()}:`, error);
        throw error;
      }
    }
  }

  getRegisteredServices(): string[] {
    return this.services.map(s => s.getServiceName());
  }
}