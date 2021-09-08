import { userService } from "./user.service";
import { jwtService } from "../services";
import bcrypt from "bcrypt";

class UserValidationService {
  async loginCheck(username: string, password: string) {
    const data = await userService.checkUser(username);

    return new Promise((res, rej) => {
      if (data == null) {
        rej("No user found");
      } else {
        const comparisonResult = bcrypt.compareSync(password, data.password);
        if (comparisonResult) {
          const result = jwtService.createToken(username);
          res(result);
        } else rej("Incorrect password");
      }
    });
  }
}

export const userValidationService = new UserValidationService();
