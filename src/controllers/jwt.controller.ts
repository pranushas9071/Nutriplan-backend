import { Request, Response } from "express";
import { jwtService } from "../services";

class JwtController {
  verifyToken(req: Request, res: Response, next: any) {
    // const excluded = [
    //   "/user/checkUser",
    //   "/user/searchUser",
    //   "/user/searchEmail",
    //   "/user/addUser",
    //   "/user/getRole"
    // ];
    // if (excluded.indexOf(req.path) > -1) {
    //   next();
    // } else {
    //   if (req.headers.authorization) {
    //     const token = req.headers.authorization.split(" ")[1];
    //     const result = jwtService.verifyToken(token);
    //     if (result == "success") next();
    //     else {
    //       res
    //         .status(401)
    //         .send({ success: false, message: "Failed to authenticate token." });
    //     }
    //   } else {
    //     res.status(403).send({
    //       success: false,
    //       message: "No token provided.",
    //     });
    //   }
    // }
  }
}
export const jwtController = new JwtController();
