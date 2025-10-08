import type { HelloReply, FullnameHelloRequest, HelloRequest } from "../types/hello";

export class GreeterService {
  sayHello(request: HelloRequest): HelloReply {
    const { name } = request;
    return { message: `Hello, ${name}!` };
  }

  sayGoodbye(request: HelloRequest): HelloReply {
    const { name } = request;
    return { message: `Goodbye, ${name}!` };
  }

  sayFullname(request: FullnameHelloRequest): HelloReply {
    const { first_name, last_name } = request;
    const fullname = `${first_name} ${last_name}`.trim();
    return { message: `Hello, ${fullname}!` };
  }
}