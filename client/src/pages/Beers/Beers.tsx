import React from "react";
import { BeersList, Pagination } from "../../components";
import { useBeersPreview } from "../../hooks";
import { Box, Heading, Text, Anchor } from "grommet";

export const BeersPage = () => {
  const {
    beers,
    loading,
    error,
    page,
    previousPage,
    nextPage,
  } = useBeersPreview();

  return (
    <>
      <Box fill>
        <Heading>Liste des bières</Heading>
        <Text>
          Les bières sont agrégés depuis{" "}
          <Anchor
            href="https://punkapi.com/documentation/v2"
            target="_blank"
            rel="norefer noopener"
            label="PunkAPI"
          />{" "}
        </Text>
        <BeersList beers={beers} />
        {loading && <p>Chargement...</p>}
        {error && <p>{`erreur : ${error.message}`}</p>}
      </Box>
      <Pagination page={page} onPrevious={previousPage} onNext={nextPage} />
    </>
  );
};
