import type * as grpc from "@grpc/grpc-js";

export interface HelloRequest {
  name: string;
}

export interface HelloReply {
  message: string;
}

export interface FullnameHelloRequest {
  first_name: string;
  last_name: string;
}

export interface GreeterServer extends grpc.UntypedServiceImplementation {
  SayHello: grpc.handleUnaryCall<HelloRequest, HelloReply>;
  SayGoodbye: grpc.handleUnaryCall<HelloRequest, HelloReply>;
  SayFullname: grpc.handleUnaryCall<FullnameHelloRequest, HelloReply>
}

export interface GreeterClient extends grpc.Client {
  SayHello(request: HelloRequest, callback: (error: grpc.ServiceError | null, response: HelloReply) => void): grpc.ClientUnaryCall;
  SayGoodbye(request: HelloRequest, callback: (error: grpc.ServiceError | null, response: HelloReply) => void): grpc.ClientUnaryCall;
  SayFullname(request: HelloRequest, callback: (error: grpc.ServiceError | null, response: HelloReply) => void): grpc.ClientUnaryCall;
}
