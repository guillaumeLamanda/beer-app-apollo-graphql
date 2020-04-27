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
  /**
   * Small Description of the beer
   * **small** mean it is a short text
   */
  tagline: string;
  /**
   * Complete description of the beer.
   * If you want a small text, use `tagline`
   */
  description: string;
  isLiked: boolean;
}

export interface BeerQuery {
  /**
   * Request a `Beer` by an ID
   */
  beer: BeerQuery_beer;
}

export interface BeerQueryVariables {
  beerId: string;
}
