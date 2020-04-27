/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: BeerLikeMutation
// ====================================================

export interface BeerLikeMutation_toogleBeerLike_beers {
  __typename: "Beer";
  id: string;
}

export interface BeerLikeMutation_toogleBeerLike {
  __typename: "User";
  id: string;
  beers: BeerLikeMutation_toogleBeerLike_beers[];
}

export interface BeerLikeMutation {
  toogleBeerLike: BeerLikeMutation_toogleBeerLike;
}

export interface BeerLikeMutationVariables {
  beerId: string;
}
