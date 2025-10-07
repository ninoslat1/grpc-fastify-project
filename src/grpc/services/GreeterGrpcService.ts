import { PROTO_FILES } from "../../configs/path";
import grpc from "@grpc/grpc-js";
import { GreeterService } from "../../services/GreeterService";
import type { IGrpcService } from "../interfaces/IGrpcService";
import type { FullnameHelloRequest } from "../../types/hello";

export class GreeterGrpcService implements IGrpcService {
  private greeterService: GreeterService;

  constructor() {
    this.greeterService = new GreeterService();
  }

  getServiceName(): string {
    return "Greeter";
  }

  getProtoPath(): string {
    return PROTO_FILES.GREETER;
  }

  getPackageName(): string {
    return "hello";
  }

  getHandlers(): grpc.UntypedServiceImplementation {
    return {
      SayHello: (call: any, callback: any) => {
        const reply = this.greeterService.sayHello(call.request);
        callback(null, reply);
      },
      SayGoodbye: (call: any, callback: any) => {
        const reply = this.greeterService.sayGoodbye(call.request);
        callback(null, reply);
      },
      SayFullname: (call: any, callback: any) => {
        const reply = this.greeterService.sayFullname(call.request);
        callback(null, reply);
      }
    };
  }
}