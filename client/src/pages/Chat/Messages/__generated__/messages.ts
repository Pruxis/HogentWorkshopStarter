/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: messages
// ====================================================

export interface messages_messages_user {
  __typename: "User";
  id: string;
  name: string;
}

export interface messages_messages {
  __typename: "Message";
  id: string;
  text: string;
  timestamp: any;
  user: messages_messages_user;
}

export interface messages {
  messages: (messages_messages | null)[];
}
