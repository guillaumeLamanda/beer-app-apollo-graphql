import { gql } from "apollo-boost";
import { useMutation } from "@apollo/react-hooks";
import { meQuery } from "../users";
import { BeerPreviewFragment } from "../beers";
import { Login, LoginVariables } from "./__generated__/Login";

const mutation = gql`
  mutation Login($name: String!) {
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

export const useLogin = () => {
  const [loginMutation, res] = useMutation<Login, LoginVariables>(mutation, {
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
