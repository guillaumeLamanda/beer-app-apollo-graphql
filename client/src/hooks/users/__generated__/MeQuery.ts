/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: MeQuery
// ====================================================

export interface MeQuery_me_beers {
  __typename: "Beer";
  id: string;
  name: string;
}

export interface MeQuery_me {
  __typename: "User";
  id: string;
  name: string;
  beers: MeQuery_me_beers[];
}

export interface MeQuery {
  /**
   * Request the current authentified user.
   * Return `null` if the user is not authentified
   */
  me: MeQuery_me | null;
}
