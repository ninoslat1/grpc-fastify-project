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
    const { firstName, lastName } = request;
    const fullname = `${firstName} ${lastName}`.trim();
    return { message: `Hello, ${fullname}!` };
  }
}