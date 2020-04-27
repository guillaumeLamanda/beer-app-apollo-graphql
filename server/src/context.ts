import { getUserFromRequest } from "./utils/authentification";
import { User } from "@ba/schema";
import { BeersAPI } from "./beers";
import { UserDataSource } from "./users";
import { Request } from "express";

export type Context = {
  user: Pick<User, "id"> | null;
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
  };
};
