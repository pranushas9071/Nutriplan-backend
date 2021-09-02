import { userService } from "./user.service";

class UserValidationService {
  async loginCheck(username: string, password: string) {
    const data = await userService.checkUser(username);
    return new Promise((res, rej) => {
      if (data == null) {
        rej("No user found");
      } else {
        if (password == data.password) res("Correct password");
        else rej("Incorrect password");
      }
    });
  }
}

export const userValidationService = new UserValidationService();
