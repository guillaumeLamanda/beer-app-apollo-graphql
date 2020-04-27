import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import { useMemo } from "react";
import { BeerPreviewFragment } from "../beers";
import { MeQuery } from "./__generated__/MeQuery";

export const meQuery = gql`
  query MeQuery {
    me {
      id
      name
      beers {
        ...BeerPreviewFragment
      }
    }
  }

  ${BeerPreviewFragment}
`;

export const useMe = () => {
  const { data, ...rest } = useQuery<MeQuery>(meQuery);
  const me = useMemo(() => data?.me, [data]);

  return {
    me,
    ...rest,
  };
};
