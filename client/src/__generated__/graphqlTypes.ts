// prettier-ignore-start
// THIS IS A GENERATED FILE, DO NOT EDIT IT!

export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
};

export type Message = {
  id: Scalars["ID"];
  text: Scalars["String"];
  user: User;
  timestamp: Scalars["Date"];
};

export type Mutation = {
  join: Scalars["String"];
  sendMessage: Message;
};

export type MutationJoinArgs = {
  userName: Scalars["String"];
};

export type MutationSendMessageArgs = {
  text: Scalars["String"];
};

export type Query = {
  hello: Scalars["String"];
  users: Array<Maybe<User>>;
  messages: Array<Maybe<Message>>;
};

export enum Status {
  Online = "ONLINE",
  Offline = "OFFLINE"
}

export type Subscription = {
  message: Message;
};

export type User = {
  id: Scalars["ID"];
  name: Scalars["String"];
  status?: Maybe<Status>;
};
// prettier-ignore-end
