import { gql } from "apollo-boost";
import { useMutation } from "@apollo/react-hooks";
import { useMe } from "./useMe";
import { queryBeer } from "../beers/useBeer";
import {
  BeerLikeMutation,
  BeerLikeMutationVariables,
} from "./__generated__/BeerLikeMutation";

const mutation = gql`
  mutation BeerLikeMutation($beerId: ID!) {
    toogleBeerLike(beerId: $beerId) {
      id
      beers {
        id
      }
    }
  }
`;

export const useBeerLike = () => {
  const { me } = useMe();
  const [likeBeerMutation, { data, ...rest }] = useMutation<
    BeerLikeMutation,
    BeerLikeMutationVariables
  >(mutation);

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
