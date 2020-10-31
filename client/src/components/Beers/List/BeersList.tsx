import React, { FC } from "react";
import { Beer } from "@ba/schema";
import { Box, InfiniteScroll } from "grommet";
import { AnchorLink } from "../../AnchorLink/AnchorLink";

export type BeersListProps = {
  beers: Array<Pick<Beer, "id" | "name">>;
};

export const BeersList: FC<BeersListProps> = ({ beers }) =>
  beers.length ? (
    <InfiniteScroll items={beers}>
      {({ id, name }: Beer) => (
        <Box key={id} pad="medium">
          <AnchorLink to={`/beers/${id}`} label={name} />
        </Box>
      )}
    </InfiniteScroll>
  ) : (
    <p>Aucunes bières à montrer</p>
  );
