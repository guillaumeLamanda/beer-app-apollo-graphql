/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL subscription operation: UserLoggedIn
// ====================================================

export interface UserLoggedIn_userLoggedIn {
  __typename: "User";
  id: string;
  name: string;
}

export interface UserLoggedIn {
  /**
   * Suscribe to users connections to the app.
   * Deprecated because the service is deployed on serverless,
   * and it does not handle WebSockets.
   */
  userLoggedIn: UserLoggedIn_userLoggedIn;
}
