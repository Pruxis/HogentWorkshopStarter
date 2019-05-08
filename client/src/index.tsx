import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloClient } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { ApolloLink, split } from 'apollo-link';
import { onError } from 'apollo-link-error';
import { setContext } from 'apollo-link-context';
import { createHttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws/lib';
import { getMainDefinition } from 'apollo-utilities';
import { InMemoryCache } from 'apollo-cache-inmemory/lib';
import App from './App';
import './index.css';

const cache = new InMemoryCache({});
const wsLink = new WebSocketLink({
  uri: 'ws://localhost:4000/graphql',
  options: { reconnect: true, reconnectionAttempts: 10 },
});
const httpLink = createHttpLink({ uri: 'http://localhost:4000/graphql' });
const link = split(
  // split based on operation type
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === 'OperationDefinition' && operation === 'subscription';
  },
  wsLink,
  setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    const userId = localStorage.getItem('userId');
    if (!userId) return { headers };
    // return the headers to the context so httpLink can read them
    return { headers: { ...headers, authorization: userId } };
  }).concat(httpLink)
);

const client = new ApolloClient({
  // @ts-ignore
  uri: 'http://localhost:4000/graphql',
  link: ApolloLink.from([
    onError(({ graphQLErrors = [] }) => {
      if (graphQLErrors.find(({ extensions: { code } }) => code === 'UNAUTHENTICATED')) {
        localStorage.removeItem('username');
        localStorage.removeItem('userId');
        document.location.reload();
      }
      if (graphQLErrors.length) {
        graphQLErrors.map(({ message, locations, path }) =>
          console.error(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
          )
        );
      }
    }),
    link,
  ]),
  connectToDevTools: true,
  cache,
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);
