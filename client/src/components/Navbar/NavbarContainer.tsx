import React, { FC } from "react";
import Navbar from "./Navbar";
import { useMe } from "../../hooks";
import { useHistory } from "react-router-dom";

const NavbarContainer: FC = () => {
  const { me: user } = useMe();
  const { push } = useHistory();
  const onAuthClick = () => {
    push("/me");
  };
  return <Navbar userName={user?.name} onAuthClick={onAuthClick} />;
};

export default NavbarContainer;
