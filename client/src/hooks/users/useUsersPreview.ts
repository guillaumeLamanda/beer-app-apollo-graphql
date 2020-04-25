import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import { useMemo } from "react";
import { User } from "@ba/schema/src";

const query = gql`
  query useUsersPreview {
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

type TData = {
  users: Array<Pick<User, "id" | "name" | "beers">>;
};

export const useUsersPreview = () => {
  const { data, ...rest } = useQuery<TData>(query);

  const users = useMemo(() => data?.users || [], [data]);

  return {
    users,
    ...rest,
  };
};
