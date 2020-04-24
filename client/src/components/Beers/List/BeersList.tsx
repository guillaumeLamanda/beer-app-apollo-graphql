import React, { FC } from "react";
import { Beer } from "@ba/schema";
import { Box } from "grommet";
import { AnchorLink } from "../../AnchorLink/AnchorLink";
import BeersPagination, { BeersPaginationProps } from "./BeersPagination";

type Props = {
  beers: Array<Pick<Beer, "id" | "name">>;
} & BeersPaginationProps;

const BeersList: FC<Props> = ({ beers, ...props }) => (
  <>
    <Box as="ul">
      {beers.map(({ id, name }) => (
        <Box key={id} pad="medium">
          <AnchorLink to={`/beers/${id}`} label={name} />
        </Box>
      ))}
    </Box>
    <BeersPagination {...props} />
  </>
);

export default BeersList;
