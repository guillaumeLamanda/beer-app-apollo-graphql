import React from "react";
import { BeersList, Pagination } from "../../components";
import { useBeersPreview } from "../../hooks";
import { Box } from "grommet";

export const BeersPage = () => {
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
    <>
      <Box fill>
        <BeersList beers={beers} />
      </Box>
      <Pagination page={page} onPrevious={previousPage} onNext={nextPage} />
    </>
  );
};
