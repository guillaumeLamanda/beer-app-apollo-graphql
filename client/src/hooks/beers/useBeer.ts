import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { useMemo } from "react";
import { BeerQuery, BeerQueryVariables } from "./__generated__/BeerQuery";

export const queryBeer = gql`
  query BeerQuery($beerId: ID!) {
    beer(id: $beerId) {
      id
      name
      tagline
      description
      isLiked @client
    }
  }
`;

export const useBeer = (beerId: string) => {
  const { data, ...rest } = useQuery<BeerQuery, BeerQueryVariables>(queryBeer, {
    variables: {
      beerId,
    },
  });

  const beer = useMemo(() => data?.beer, [data]);

  return {
    beer,
    ...rest,
  };
};
