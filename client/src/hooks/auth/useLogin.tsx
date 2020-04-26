import { gql } from "apollo-boost";
import { useMutation } from "@apollo/react-hooks";
import { User } from "@ba/schema/src";
import { meQuery } from "../users";
import { BeerPreviewFragment } from "../beers";

const mutation = gql`
  mutation login($name: String!) {
    login(name: $name) {
      id
      name
      token
      beers {
        ...BeerPreviewFragment
      }
    }
  }
  ${BeerPreviewFragment}
`;

type TData = { login: User };
type TVariables = { name: string };

export const useLogin = () => {
  const [loginMutation, res] = useMutation<TData, TVariables>(mutation, {
    update: (cache, { data }) => {
      cache.writeQuery({
        query: meQuery,
        data: { me: data?.login },
      });
    },
  });

  const login = async (name: string) => {
    const res = await loginMutation({
      variables: {
        name,
      },
    });
    if (res.data?.login.token)
      localStorage.setItem("token", res.data.login.token);
  };

  return { login, ...res };
};
