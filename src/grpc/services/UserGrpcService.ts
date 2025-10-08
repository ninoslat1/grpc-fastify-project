import { PROTO_FILES } from "../../configs/path";
import grpc from "@grpc/grpc-js";
import { GreeterService } from "../../services/GreeterService";
import type { IGrpcService } from "../interfaces/IGrpcService";
import type { FullnameHelloRequest } from "../../types/hello";
import { UserService } from "../../services/UserService";

export class UserGrpcService implements IGrpcService {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  getServiceName(): string {
    return "User";
  }

  getProtoPath(): string {
    return PROTO_FILES.USER;
  }

  getPackageName(): string {
    return "user";
  }

  getHandlers(): grpc.UntypedServiceImplementation {
    return {
      Login: (call: any, callback: any) => {
        const reply = this.userService.Login(call.request);
        callback(null, reply);
      },
    };
  }
}