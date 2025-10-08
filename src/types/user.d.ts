import type * as grpc from "@grpc/grpc-js";

export interface LoginRequest {
  user_name: string;
  password: string
}

export interface LoginPayload {
  message: string;
  status: number
}

export interface UserServer extends grpc.UntypedServiceImplementation {
  Login: grpc.handleUnaryCall<LoginRequest, LoginPayload>
}

export interface UserClient extends grpc.Client {
  Login(request: LoginRequest, callback: (error: grpc.ServiceError | null, response: LoginPayload) => void): grpc.ClientUnaryCall;
}