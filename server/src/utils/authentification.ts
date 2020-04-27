import jwt from "jsonwebtoken";
import { Request } from "express";
import { Context } from "../context";

const secret = "anAwesomeSecret";

export const getUserFromRequest = (req: Request): Context["user"] => {
  try {
    const [, token] = req.header("authorization").split(" ");
    return jwt.verify(token, secret) as Context["user"];
  } catch (error) {
    return null;
  }
};

export const generateToken = (id: string): string => jwt.sign({ id }, secret);
