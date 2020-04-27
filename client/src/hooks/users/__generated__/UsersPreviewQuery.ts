/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: UsersPreviewQuery
// ====================================================

export interface UsersPreviewQuery_users_beers {
  __typename: "Beer";
  id: string;
  name: string;
}

export interface UsersPreviewQuery_users {
  __typename: "User";
  id: string;
  name: string;
  beers: UsersPreviewQuery_users_beers[];
}

export interface UsersPreviewQuery {
  users: UsersPreviewQuery_users[];
}
