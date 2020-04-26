import React from "react";
import { useMe } from "../../hooks";
import { UserDetail } from "../../components";
import { Auth } from "../../components/Auth";

export const MePage = () => {
  const { me, loading } = useMe();

  if (loading) return <p>Chargement...</p>;
  return me ? <UserDetail {...me} /> : <Auth />;
};
