import Fastify from "fastify";
import grpc from "@grpc/grpc-js";
import protoLoader from "@grpc/proto-loader";
import path from "path";
import { fileURLToPath } from "url";
import type { GreeterServer, HelloRequest, HelloReply } from "./src/types/hello.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROTO_PATH = path.join(__dirname, "./proto/hello.proto");

// Load proto definition
const packageDef = protoLoader.loadSync(PROTO_PATH);
const grpcObject = grpc.loadPackageDefinition(packageDef) as any;
const helloPackage = grpcObject.hello;

// Implementasi gRPC
const sayHello: grpc.handleUnaryCall<HelloRequest, HelloReply> = (call, callback) => {
  const name = call.request.name;
  callback(null, { message: `Hello, ${name}!` });
};

// Buat Fastify instance
const fastify = Fastify({ logger: true });

// Endpoint HTTP
fastify.get("/", async () => ({ status: "gRPC Server Running 🚀" }));

// Jalankan gRPC server
function startGrpcServer() {
  const server = new grpc.Server();

  if (helloPackage?.Greeter?.service) {
    server.addService(helloPackage.Greeter.service, { SayHello: sayHello } as GreeterServer);
  } else {
    fastify.log.error("Failed to load gRPC service definition");
    return;
  }

  const address = "0.0.0.0:50051";
  server.bindAsync(address, grpc.ServerCredentials.createInsecure(), (err, port) => {
    if(err){
      fastify.log.error(err)
    }
    fastify.log.info(`gRPC server running at ${address}`);
  });
}

async function start() {
  await fastify.listen({ port: 3000 });
  startGrpcServer();
}

start();
