import jwt from "jsonwebtoken";
import { Context } from "..";
import { Request } from "express";
import { User } from "@ba/schema";

const secret = "anAwesomeSecret";

export const getUserFromRequest = (req: Request): Context["user"] => {
  try {
    const [, token] = req.header("authorization").split(" ");
    return jwt.verify(token, secret) as Context["user"];
  } catch (error) {
    return null;
  }
};

export const generateToken = (user: User): string =>
  jwt.sign({ id: user.id }, secret);
