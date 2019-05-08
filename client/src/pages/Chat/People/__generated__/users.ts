/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { Status } from "./../../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: users
// ====================================================

export interface users_users {
  __typename: "User";
  id: string;
  name: string;
  status: Status;
}

export interface users {
  users: (users_users | null)[];
}
