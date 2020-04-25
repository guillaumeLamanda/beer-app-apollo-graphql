import { gql } from "apollo-boost";
import { BeerPreviewFragment } from "../beers";
import { User } from "@ba/schema/src";
import { useQuery } from "@apollo/react-hooks";
import { useMemo } from "react";

const query = gql`
  query useUser($userId: ID!) {
    user(id: $userId) {
      id
      name
      beers {
        ...BeerPreviewFragment
      }
    }
  }

  ${BeerPreviewFragment}
`;

type TData = { user: User };
type TVarible = { userId: string };

export const useUser = (userId: string) => {
  const { data, ...rest } = useQuery<TData, TVarible>(query, {
    variables: {
      userId,
    },
  });

  const user = useMemo(() => data?.user, [data]);

  return {
    user,
    ...rest,
  };
};
