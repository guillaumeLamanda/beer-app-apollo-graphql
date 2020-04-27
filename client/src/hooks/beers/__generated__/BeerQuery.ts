/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: BeerQuery
// ====================================================

export interface BeerQuery_beer {
  __typename: "Beer";
  id: string;
  name: string;
  tagline: string;
  description: string;
  isLiked: boolean;
}

export interface BeerQuery {
  beer: BeerQuery_beer;
}

export interface BeerQueryVariables {
  beerId: string;
}
