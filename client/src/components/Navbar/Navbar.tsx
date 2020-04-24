import React, { FC } from "react";
import { Nav, Heading, Box, Text, Anchor } from "grommet";
import { AnchorLink } from "../AnchorLink/AnchorLink";

type Props = {};

const Navbar: FC<Props> = () => (
  <Nav
    pad={{ horizontal: "small" }}
    background="brand"
    justify="between"
    direction="row"
    align="center"
  >
    <Heading size="small">Beer App</Heading>
    <Box direction="row" gap="small">
      <AnchorLink color="text-strong" to="/beers" label="bières" />
      <AnchorLink color="text-strong" to="/users" label="utilisateurs" />
    </Box>
    <Box>
      <Text>User</Text>
    </Box>
  </Nav>
);

export default Navbar;
