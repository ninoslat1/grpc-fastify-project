import type * as grpc from "@grpc/grpc-js";

export interface HelloRequest {
  name: string;
}

export interface HelloReply {
  message: string;
}

export interface GreeterServer extends grpc.UntypedServiceImplementation {
  SayHello: grpc.handleUnaryCall<HelloRequest, HelloReply>;
}

export interface GreeterClient extends grpc.Client {
  SayHello(
    request: HelloRequest,
    callback: (error: grpc.ServiceError | null, response: HelloReply) => void
  ): grpc.ClientUnaryCall;
}
