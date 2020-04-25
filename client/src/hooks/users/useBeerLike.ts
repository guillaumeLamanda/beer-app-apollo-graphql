import { gql } from "apollo-boost";
import { User } from "@ba/schema/src";
import { useMutation } from "@apollo/react-hooks";

const mutation = gql`
  mutation useBeerLike($beerId: ID!) {
    toogleBeerLike(beerId: $beerId) {
      id
      beers {
        id
      }
    }
  }
`;

type TData = {
  toogleBeerLike: User;
};
type TVariables = {
  beerId: string;
};

export const useBeerLike = () => {
  const [likeBeerMutation, { data, ...rest }] = useMutation<TData, TVariables>(
    mutation
  );

  const likeBeer = async (beerId: string) => {
    const res = await likeBeerMutation({ variables: { beerId } });
    return res;
  };

  return {
    likeBeer,
    data,
    ...rest,
  };
};
