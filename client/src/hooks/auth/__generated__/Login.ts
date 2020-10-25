/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: Login
// ====================================================

export interface Login_login_beers {
  __typename: "Beer";
  id: string;
  name: string;
}

export interface Login_login {
  __typename: "User";
  id: string;
  name: string;
  token: string | null;
  beers: Login_login_beers[];
}

export interface Login {
  /**
   * Login mutation.
   * If the user does not exist, the user is created
   */
  login: Login_login;
}

export interface LoginVariables {
  name: string;
}
