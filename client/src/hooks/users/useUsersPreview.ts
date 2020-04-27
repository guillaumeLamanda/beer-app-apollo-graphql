import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import { useMemo } from "react";
import { UsersPreviewQuery } from "./__generated__/UsersPreviewQuery";

const query = gql`
  query UsersPreviewQuery {
    users {
      id
      name
      beers {
        id
        name
      }
    }
  }
`;

export const useUsersPreview = () => {
  const { data, ...rest } = useQuery<UsersPreviewQuery>(query);

  const users = useMemo(() => data?.users || [], [data]);

  return {
    users,
    ...rest,
  };
};
