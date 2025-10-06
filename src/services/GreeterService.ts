import type { HelloRequest, HelloReply } from "../types/hello.js";

export class GreeterService {
  sayHello(name: string): HelloReply {
    return { message: `Hello, ${name}!` };
  }

  sayGoodbye(name: string): HelloReply {
    return { message: `Goodbye, ${name}!` };
  }
}