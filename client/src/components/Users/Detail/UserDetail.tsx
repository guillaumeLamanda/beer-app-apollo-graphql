import React, { FC } from "react";
import { User } from "@ba/schema/src";
import { Heading } from "grommet";
import { BeersList } from "../../Beers";

const UserDetail: FC<User> = ({ name, beers }) => (
  <>
    <Heading>{name}</Heading>
    <BeersList beers={beers} />
  </>
);

export default UserDetail;
