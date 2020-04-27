import React, { FC } from "react";
import { Beer } from "@ba/schema";
import { Box } from "grommet";
import { AnchorLink } from "../../AnchorLink/AnchorLink";

export type BeersListProps = {
  beers: Array<Pick<Beer, "id" | "name">>;
};

export const BeersList: FC<BeersListProps> = ({ beers }) =>
  !!beers.length ? (
    <Box as="ul">
      {beers.map(({ id, name }) => (
        <Box key={id} pad="medium">
          <AnchorLink to={`/beers/${id}`} label={name} />
        </Box>
      ))}
    </Box>
  ) : (
    <p>Aucunes bières à montrer</p>
  );
