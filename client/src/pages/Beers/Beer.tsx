import React, { FC } from "react";
import { BeerDetail, BeerLikeButton } from "../../components";
import { useParams } from "react-router-dom";
import { useBeer } from "../../hooks/beers/useBeer";
import { useBeerLike } from "../../hooks";

export const BeerPage: FC = () => {
  const { beerId } = useParams<{ beerId: string }>();
  const { beer, loading, error } = useBeer(beerId);
  const { likeBeer } = useBeerLike();

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>{error.message}</p>;
  if (!beer) return null;
  return (
    <>
      <BeerLikeButton liked={beer.isLiked} onClick={() => likeBeer(beerId)} />
      <BeerDetail beer={beer} />
    </>
  );
};
