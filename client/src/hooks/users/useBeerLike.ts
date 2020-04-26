import { gql } from "apollo-boost";
import { User } from "@ba/schema/src";
import { useMutation } from "@apollo/react-hooks";
import { useMe } from "./useMe";
import { queryBeer } from "../beers/useBeer";

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
  const { me } = useMe();
  const [likeBeerMutation, { data, ...rest }] = useMutation<TData, TVariables>(
    mutation
  );

  const likeBeer = async (beerId: string) => {
    if (me) {
      await likeBeerMutation({
        variables: { beerId },
        refetchQueries: [{ query: queryBeer, variables: { beerId } }],
      });
    }
  };

  return {
    likeBeer,
    data,
    ...rest,
  };
};
