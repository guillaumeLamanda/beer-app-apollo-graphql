import React, { FC } from "react";
import { Nav, Heading, Box, Button } from "grommet";
import { AnchorLink } from "../AnchorLink/AnchorLink";
import { User } from "@ba/schema/src";

type Props = { userName?: User["name"]; onAuthClick: () => void };

const Navbar: FC<Props> = ({ userName, onAuthClick }) => (
  <Nav
    pad={{ horizontal: "small" }}
    background="brand"
    justify="between"
    direction="row"
    align="center"
  >
    <Heading size="small">Beer App</Heading>
    <Box direction="row" gap="small">
      <AnchorLink color="text-strong" to="/" label="fil" />
      <AnchorLink color="text-strong" to="/beers" label="bières" />
      <AnchorLink color="text-strong" to="/users" label="utilisateurs" />
    </Box>
    <Box>
      <Button onClick={onAuthClick} label={userName ?? "Se connecter"} />
    </Box>
  </Nav>
);

export default Navbar;
