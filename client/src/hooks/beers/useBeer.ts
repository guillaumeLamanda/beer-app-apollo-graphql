import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { useMemo } from "react";
import { Beer } from "@ba/schema/src";

export const queryBeer = gql`
  query useBeer($beerId: ID!) {
    beer(id: $beerId) {
      id
      name
      tagline
      description
      isLiked @client
    }
  }
`;

type LocalBeer = Beer & { isLiked: boolean };
type TData = { beer: LocalBeer };
type TVariables = { beerId: string };

export const useBeer = (beerId: string) => {
  const { data, ...rest } = useQuery<TData, TVariables>(queryBeer, {
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
