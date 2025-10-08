import type { HelloReply, FullnameHelloRequest, HelloRequest } from "../types/hello";
import type { LoginPayload, LoginRequest } from "../types/user";

export class UserService {
  Login(request: LoginRequest): LoginPayload {
    const { user_name, password } = request;

    if (user_name === "admin"){
        return { message: `Berhasil autentikasi`, status: 200 };
    }

      return { message: `Gagal autentikasi`, status: 403 };
  }
}