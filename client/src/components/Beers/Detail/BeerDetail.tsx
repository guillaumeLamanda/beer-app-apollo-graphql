import React, { FC } from "react";
import { Beer } from "@ba/schema";
import { Heading, Paragraph, Box } from "grommet";

type Props = {
  beer: Beer;
};

const BeerDetail: FC<Props> = ({ beer }) => (
  <Box fill align="center">
    <Heading>{beer.name}</Heading>
    <Paragraph>{beer.description}</Paragraph>
  </Box>
);

export default BeerDetail;
