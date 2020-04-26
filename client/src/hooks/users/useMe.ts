import { gql } from "apollo-boost";
import { User } from "@ba/schema/src";
import { useQuery } from "@apollo/react-hooks";
import { useMemo } from "react";
import { BeerPreviewFragment } from "../beers";

export const meQuery = gql`
  query useMe {
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

export type TMeData = { me: User };

export const useMe = () => {
  const { data, ...rest } = useQuery<TMeData>(meQuery);
  const me = useMemo(() => data?.me, [data]);

  return {
    me,
    ...rest,
  };
};
