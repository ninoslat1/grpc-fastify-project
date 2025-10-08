import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const PROTO_DIR = path.join(__dirname, "../../proto");

export const PROTO_FILES = {
  GREETER: path.join(PROTO_DIR, "hello.proto"),
  USER: path.join(PROTO_DIR, "user.proto")
//   USER: path.join(PROTO_DIR, "user.proto"),
//   PRODUCT: path.join(PROTO_DIR, "product.proto"),
  
} as const;