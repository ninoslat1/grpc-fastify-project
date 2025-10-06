import { PROTO_FILES } from "../../configs/path";
import grpc from "@grpc/grpc-js";
import { GreeterService } from "../../services/GreeterService";
import type { IGrpcService } from "../interfaces/IGrpcService";

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
        const name = call.request.name;
        const reply = this.greeterService.sayHello(name);
        callback(null, reply);
      },
      SayGoodbye: (call: any, callback: any) => {
        const name = call.request.name;
        const reply = this.greeterService.sayGoodbye(name);
        callback(null, reply);
      }
    };
  }
}