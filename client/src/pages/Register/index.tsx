import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import React, { useState } from 'react';
import Button from 'ui/Button';
import { User } from '__generated__/graphqlTypes';
import { joinRoom, joinRoomVariables } from './__generated__/joinRoom';
/* Opdracht 3: Importeer hier je RegisterInput component */

const JOIN_ROOM = gql`
  mutation joinRoom($username: String!) {
    join(userName: $username) {
      id
      name
    }
  }
`;

interface Props {
  onRegisterUser: (userId: User, userName: string) => void;
}

const Register: React.FC<Props> = props => {
  const [username, setUsername] = useState(localStorage.getItem('username') || '');

  return (
    <div className="register-container">
      <Mutation<joinRoom, joinRoomVariables>
        mutation={JOIN_ROOM}
        onCompleted={({ join }) => props.onRegisterUser(join, username)}>
        {joinRoom => (
          <form
            className="register-form"
            onSubmit={e => {
              /**
               * Opdracht 4: Vul de onSubmit aan
               * Tip: http://bfy.tw/NZKH
               * - Zorg ervoor dat je browser niet refreshed als je de form submit.
               * - Voer de joinRoom functie uit met de verwachte 'userName' als een van de 'variabelen'
               * -- Meer informatie: https://www.apollographql.com/docs/react/essentials/mutations#basic
               */
            }}>
            {/**
             * Opdracht 3: Gebruik hier je input component
             * - Je input krijgt username als waarde m.a.w. de 'value' is username.
             * - Weet dat je in React de onChange prop kan gebruiken om change events af te handelen
             * - - Deze events bevatten de informatie die je nodig hebt.
             */}
            <Button type="submit">Register</Button>
          </form>
        )}
      </Mutation>
    </div>
  );
};

export default Register;
