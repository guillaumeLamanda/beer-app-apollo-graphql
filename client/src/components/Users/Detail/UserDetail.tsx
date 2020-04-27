import React, { FC } from "react";
import { User } from "@ba/schema/src";
import { Heading } from "grommet";
import { BeersList, BeersListProps } from "../../Beers";

type Props = Pick<User, "name"> & BeersListProps;

const UserDetail: FC<Props> = ({ name, beers }) => (
  <>
    <Heading>{name}</Heading>
    <BeersList beers={beers} />
  </>
);

export default UserDetail;
