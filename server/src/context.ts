import { getUserFromRequest } from "./utils/authentification";
import { User } from "@ba/schema";
import { BeersAPI } from "./beers";
import { UserDataSource } from "./users";
import { Request } from "express";
import { PrismaClient } from "@prisma/client";

export type Context = {
  user: Pick<User, "id"> | null;
  prisma: PrismaClient;
  dataSources: {
    beersApi: BeersAPI;
    userDs: UserDataSource;
  };
};

export const context = ({
  req,
}: {
  req: Request;
}): Omit<Context, "dataSources"> => {
  return {
    user: getUserFromRequest(req),
    prisma: new PrismaClient(),
  };
};
