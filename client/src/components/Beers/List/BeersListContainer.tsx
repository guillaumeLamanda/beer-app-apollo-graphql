import React, { FC } from "react";
import BeersList from "./BeersList";
import { useBeersPreview } from "../../../hooks";

const BeersListContainer: FC = () => {
  const {
    beers,
    loading,
    error,
    page,
    previousPage,
    nextPage,
  } = useBeersPreview();

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>{error.message}</p>;
  return (
    <BeersList
      beers={beers}
      page={page}
      onPrevious={previousPage}
      onNext={nextPage}
    />
  );
};

export default BeersListContainer;
