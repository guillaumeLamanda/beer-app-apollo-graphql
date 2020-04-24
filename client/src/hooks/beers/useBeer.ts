import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { useMemo } from "react";
import { Beer } from "@ba/schema/src";

const query = gql`
  query useBeer($beerId: ID!) {
    beer(id: $beerId) {
      id
      name
      tagline
      description
    }
  }
`;

type TData = { beer: Beer };
type TVariables = { beerId: string };

export const useBeer = (beerId: string) => {
  const { data, ...rest } = useQuery<TData, TVariables>(query, {
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
