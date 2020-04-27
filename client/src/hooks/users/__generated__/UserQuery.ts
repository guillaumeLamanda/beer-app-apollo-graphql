/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: UserQuery
// ====================================================

export interface UserQuery_user_beers {
  __typename: "Beer";
  id: string;
  name: string;
}

export interface UserQuery_user {
  __typename: "User";
  id: string;
  name: string;
  beers: UserQuery_user_beers[];
}

export interface UserQuery {
  user: UserQuery_user | null;
}

export interface UserQueryVariables {
  userId: string;
}
