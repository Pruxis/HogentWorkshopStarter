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
  join: User;
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
import { Context } from "./Context";

import {
  GraphQLResolveInfo,
  GraphQLScalarType,
  GraphQLScalarTypeConfig
} from "graphql";

export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type StitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, TParent, TContext, TArgs>;
}

export type SubscriptionResolver<
  TResult,
  TParent = {},
  TContext = {},
  TArgs = {}
> =
  | ((
      ...args: any[]
    ) => SubscriptionResolverObject<TResult, TParent, TContext, TArgs>)
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<
  TResult = {},
  TParent = {},
  TContext = {},
  TArgs = {}
> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Query: {};
  String: Scalars["String"];
  User: User;
  ID: Scalars["ID"];
  Status: Status;
  Message: Message;
  Date: Scalars["Date"];
  Mutation: {};
  Subscription: {};
  Boolean: Scalars["Boolean"];
};

export interface DateScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["Date"], any> {
  name: "Date";
}

export type MessageResolvers<
  ContextType = Context,
  ParentType = ResolversTypes["Message"]
> = {
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  text?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  user?: Resolver<ResolversTypes["User"], ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes["Date"], ParentType, ContextType>;
};

export type MutationResolvers<
  ContextType = Context,
  ParentType = ResolversTypes["Mutation"]
> = {
  join?: Resolver<
    ResolversTypes["User"],
    ParentType,
    ContextType,
    MutationJoinArgs
  >;
  sendMessage?: Resolver<
    ResolversTypes["Message"],
    ParentType,
    ContextType,
    MutationSendMessageArgs
  >;
};

export type QueryResolvers<
  ContextType = Context,
  ParentType = ResolversTypes["Query"]
> = {
  hello?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  users?: Resolver<
    Array<Maybe<ResolversTypes["User"]>>,
    ParentType,
    ContextType
  >;
  messages?: Resolver<
    Array<Maybe<ResolversTypes["Message"]>>,
    ParentType,
    ContextType
  >;
};

export type SubscriptionResolvers<
  ContextType = Context,
  ParentType = ResolversTypes["Subscription"]
> = {
  message?: SubscriptionResolver<
    ResolversTypes["Message"],
    ParentType,
    ContextType
  >;
};

export type UserResolvers<
  ContextType = Context,
  ParentType = ResolversTypes["User"]
> = {
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  name?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes["Status"]>, ParentType, ContextType>;
};

export type Resolvers<ContextType = Context> = {
  Date?: GraphQLScalarType;
  Message?: MessageResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Subscription?: SubscriptionResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
};

/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = Context> = Resolvers<ContextType>;
// prettier-ignore-end
