import dotenv from "dotenv";
import jsonwebtoken from "jsonwebtoken";

dotenv.config();

class JwtService {
  createToken(username: string) {
    const secret_key = process.env.JWT_SECRET_KEY;
    const data = {
      username: username,
    };
    const token = jsonwebtoken.sign(data, secret_key as string);
    return token;
  }
  verifyToken(token: string) {
    const secret_key = process.env.JWT_SECRET_KEY;
    try {
      const decoded = jsonwebtoken.verify(token, secret_key as string);
      return "success";
    } catch (err) {
      return "failed";
    }
  }
}
export const jwtService = new JwtService();
