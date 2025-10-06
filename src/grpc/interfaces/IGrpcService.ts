import grpc from "@grpc/grpc-js";

export interface IGrpcService {
  getServiceName(): string;
  getProtoPath(): string;
  getPackageName(): string;
  getHandlers(): grpc.UntypedServiceImplementation;
}