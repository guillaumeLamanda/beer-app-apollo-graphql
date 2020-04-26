import React, { FC } from "react";
import Auth from "./Auth";
import { useLogin } from "../../hooks";

const AuthContainer: FC = () => {
  const { login, error } = useLogin();

  return <Auth onLogin={login} error={error?.message} />;
};

export default AuthContainer;
