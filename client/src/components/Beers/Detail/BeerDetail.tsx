import React, { FC } from "react";
import { Beer } from "@ba/schema";
import { Heading, Paragraph, Box } from "grommet";

type Props = Pick<Beer, "name" | "description">;

const BeerDetail: FC<Props> = ({ name, description }) => (
  <Box fill align="center">
    <Heading>{name}</Heading>
    <Paragraph>{description}</Paragraph>
  </Box>
);

export default BeerDetail;
