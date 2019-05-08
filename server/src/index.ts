import http from 'http'; // NodeJS default http server (https://nodejs.org/api/http.html)
import uuid from 'uuid/v4'; // This package is used for creating unique identifiers
import express from 'express'; // A minimalistic web framework (https://expressjs.com/)
import bodyParser from 'body-parser'; // This package will transform incoming requests their payload to readable JSON.
import { gql, PubSub } from 'apollo-server'; // A GraphQL Server (https://apollographql.com)
import { ApolloServer, makeExecutableSchema, AuthenticationError } from 'apollo-server-express'; // Apollo for Express
import { Resolvers, User, Message, Status } from './types/graphqlTypes';
import { Context } from './types/Context';

/**
 * ~ Declaring Constants ~
 * -- We usually advise to do this in process variables
 * -- Or in a seperate constants package / file.
 */
const PORT = 4000;
const CHAT_MESSAGE = 'CHAT_MESSAGE';

/**
 * ~ PubSub Instance ~
 * - more information: https://www.apollographql.com/docs/apollo-server/features/subscriptions
 */
const pubsub = new PubSub();

/**
 * ~ In-Memory Database ~
 * - Users: Here we are going to store our users that are connected to the chatroom.
 * - Messages: Here we are going to store all the messages that are being sent in the chatroom.
 */
const users: User[] = [];
const messages: Message[] = [];

const typeDefs = gql`
  scalar Date # Adding Date type: https://www.apollographql.com/docs/graphql-tools/scalars#date-as-a-scalar
  enum Status {
    ONLINE
    OFFLINE
  }

  type User {
    id: ID!
    name: String!
    status: Status!
  }

  type Message {
    id: ID!
    text: String!
    user: User!
    timestamp: Date!
  }

  type Query {
    hello: String!
    users: [User]!
    messages: [Message]!
  }

  type Mutation {
    join(userName: String!): User! # Return a JSON Web Token.
    sendMessage(text: String!): Message!
  }

  type Subscription {
    message: Message!
  }
`;

const resolvers: Resolvers = {
  Query: {
    /**
     * ~ Resolver Function ~
     * hello is a function that gets executed once you call the hello query.
     */
    hello: (parent, args, context) => 'Hello world!',
    users: (_, __, { user }) => {
      if (!user) throw new AuthenticationError('NOT_ALLOWED');
      return users;
    },
    /**
     * Opdracht 7: Messages Resolver
     * - Schrijf de messages query resolver die een array van messages teruggeeft.
     */
  },
  Mutation: {
    /**
     * Opdracht 1: Voeg join mutatie toe.
     * In het schema hierboven kan je zien wat de argumenten zijn en de resultaten hiervan.
     * - Om een ID te genereren kan je de uuid() functie aanroepen
     * - Het is de bedoeling dat de user terecht komt op de users array.
     * - Deze mutatie verwacht ook dat het user object geretourneerd wordt.
     */
    sendMessage: (_, { text }, { user }) => {
      if (!user) throw new AuthenticationError('NOT_ALLOWED');
      const createdMessage = { id: uuid(), text, user, timestamp: new Date() };
      messages.push(createdMessage);
      pubsub.publish(CHAT_MESSAGE, { message: createdMessage });
      return createdMessage;
    },
  },
  Subscription: {
    message: { subscribe: () => pubsub.asyncIterator(CHAT_MESSAGE) },
  },
};

const schema = makeExecutableSchema({ typeDefs, resolvers });

/**
 * ~ Server configuration ~
 */
const server = new ApolloServer({
  schema,
  context: async ({ req }): Promise<Context> => {
    if (!req || !req.headers.authorization) return {};
    try {
      const user = users.find(({ id }) => id === req.headers.authorization) as User;
      return { user };
    } catch (e) {
      throw new AuthenticationError('NOT_ALLOWED');
    }
  },
  subscriptions: { keepAlive: 1500 },
});

/**
 * ~ Web Server Configuration ~
 * - We advise to not touch the following lines unless you know what you are doing
 */
export default schema;
const app = express();
app.use(bodyParser.json());
app.get('/', (_, res) =>
  res.send(
    `Welcome to your Server,
     navigate to /graphql for the GraphQL Playground`
  )
);
server.applyMiddleware({ app });
const httpServer = http.createServer(app);
server.installSubscriptionHandlers(httpServer);
console.log('starting soon');
httpServer.listen(PORT, async () => {
  console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`);
});
