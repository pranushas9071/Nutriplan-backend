import dotenv from "dotenv";
import { Request, Response } from "express";
import jsonwebtoken from "jsonwebtoken";

dotenv.config();

class JwtService {
  createToken(username: string,role:string) {
    const secret_key = process.env.JWT_SECRET_KEY;
    const data = {
      username: username,
      role:role
    };
    const token = jsonwebtoken.sign(data, secret_key as string);
    return token;
  }
  verifyToken(token: string) {
    const secret_key = process.env.JWT_SECRET_KEY;
    try {
      const decoded = jsonwebtoken.verify(token, secret_key as string);
      // return "success";
      return {message:"success",data:decoded};
    } catch (err) {
      return {message:"failed",data:err};
    }
  }
}
export const jwtService = new JwtService();

export const jwtAuth = (req: Request, res: Response, next: any) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];
    const result = jwtService.verifyToken(token);
    console.log("res ", result);

    if (result.message == "success") {
      req.body.user = result.data;
      next();
    } else {
      res
        .status(401)
        .send({ success: false, message: "Failed to authenticate token." });
    }
  } else {
    res.status(403).send({
      success: false,
      message: "No token provided.",
    });
  }
};