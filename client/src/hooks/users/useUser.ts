import { gql } from "apollo-boost";
import { BeerPreviewFragment } from "../beers";
import { useQuery } from "@apollo/react-hooks";
import { useMemo } from "react";
import { UserQuery, UserQueryVariables } from "./__generated__/UserQuery";

const query = gql`
  query UserQuery($userId: ID!) {
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

export const useUser = (userId: string) => {
  const { data, ...rest } = useQuery<UserQuery, UserQueryVariables>(query, {
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
