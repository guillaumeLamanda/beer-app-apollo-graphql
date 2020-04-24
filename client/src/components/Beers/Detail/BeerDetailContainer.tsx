import React, { FC } from "react";
import BeerDetail from "./BeerDetail";
import { useBeer } from "../../../hooks/beers/useBeer";
import { useParams } from "react-router-dom";

const BeerDetailContainer: FC = () => {
  const { beerId } = useParams<{ beerId: string }>();
  const { beer, loading, error } = useBeer(beerId);
  if (loading) return <p>Chargement...</p>;
  if (error) return <p>{error.message}</p>;
  if (!beer) return null;
  return <BeerDetail beer={beer} />;
};

export default BeerDetailContainer;
