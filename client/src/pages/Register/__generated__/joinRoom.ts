/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: joinRoom
// ====================================================

export interface joinRoom_join {
  __typename: "User";
  id: string;
  name: string;
}

export interface joinRoom {
  join: joinRoom_join;
}

export interface joinRoomVariables {
  username: string;
}
