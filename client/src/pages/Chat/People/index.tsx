import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import React, { useState } from 'react';
import { users, users_users } from './__generated__/users';
import { ReactComponent as SearchIcon } from '../../../assets/icons/search.svg';

const GET_USERS = gql`
  query users {
    users {
      id
      name
      status
    }
  }
`;

/**
 * Opdracht 5: Maak een PersonItem Component
 * Voorbeeld uitwerking: https://imgur.com/a/incN0Ep
 * Tip: Voor het bovenstaande resultaat kan je de css vinden in index.css onder person-item
 * - Render naam van de gebruiker
 * - En eventueel zijn status erbij.
 */

const People: React.FC = () => (
  <div className="people">
    <div className="person-items">
      <Query<users> query={GET_USERS}>
        {({ data: { users = [] } = { users: [] }, loading }) => {
          if (loading) return '...loading';
          /**
           * Opdracht 6: Render Gebruikers
           * Vervang de onderstaande return null met:
           * - Een array van componenten voor elke gebruiker.
           * - Vergeet je props niet voor elke gebruiker individueel mee te geven!
           */
          return null;
        }}
      </Query>
    </div>
  </div>
);

export default People;
