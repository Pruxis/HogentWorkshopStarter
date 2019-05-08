/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL subscription operation: messageAdded
// ====================================================

export interface messageAdded_message_user {
  __typename: "User";
  id: string;
  name: string;
}

export interface messageAdded_message {
  __typename: "Message";
  id: string;
  text: string;
  timestamp: any;
  user: messageAdded_message_user;
}

export interface messageAdded {
  message: messageAdded_message;
}
