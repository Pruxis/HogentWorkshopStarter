import gql from 'graphql-tag';
import { Query, Mutation, MutationFn } from 'react-apollo';
import React, { useState, useEffect, useRef } from 'react';
import Button from '../../../ui/Button';
import Input from '../../../ui/Input';
import UserMessage from '../UserMessage';
import { messages } from './__generated__/messages';
import { sendMessage, sendMessageVariables } from './__generated__/sendMessage';
import { messageAdded } from './__generated__/messageAdded';
import { ReactComponent as SendIcon } from '../../../assets/icons/send.svg';

/**
 * Opdracht 8: Vervang de hello query met messages query.
 * - Gebruik je messages query om de messages op te halen.
 * - Haal het volgende op van de message
 * - - id, text, timestamp, user zijn id & name
 */
const GET_MESSAGES = gql`
  query hello {
    hello
  }
`;

const SEND_MESSAGE = gql`
  mutation sendMessage($text: String!) {
    sendMessage(text: $text) {
      id
      text
      timestamp
    }
  }
`;

const SUBSCRIBE_MESSAGE = gql`
  subscription messageAdded {
    message {
      id
      text
      timestamp
      user {
        id
        name
      }
    }
  }
`;

let subscribed = false;

const Messages: React.FC<{ title: string; userId: string }> = props => {
  const [message, setMessage] = useState('');
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    subscribed = false;
  }, []);

  const scrollDown = () => {
    const chatContainer = chatContainerRef.current as HTMLDivElement;
    chatContainer.scrollTop = chatContainer.scrollHeight;
  };

  const onSendMessage = (
    sendMessage: MutationFn<sendMessage, sendMessageVariables>
  ): React.FormEventHandler => e => {
    e.preventDefault();
    sendMessage({ variables: { text: message } });
    setMessage('');
  };

  return (
    <div className="generalchat-container">
      <div className="generalchat-header">
        <div className="generalchat-header-title">{props.title}</div>
        <div className="generalchat-body" ref={chatContainerRef}>
          {/**
          Opdracht 9: Vul de query component aan, we geven je alvast een duwtje in de rug.
          - Zorg ervoor dat de loading state wordt afgehandeld. (Er zijn al enkele voorbeelden)
          -- https://www.apollographql.com/docs/react/essentials/queries#basic
          -- Gebruik de UserMessage component om de messeges te renderen
            <Query<messages> query={GET_MESSAGES}>
              {({ ... }) => (
                vul aan.
              )}
            </Query>
          */}
        </div>
        <Mutation<sendMessage, sendMessageVariables>
          mutation={SEND_MESSAGE}
          refetchQueries={[{ query: GET_MESSAGES }]} // Opdracht 10: Vervang de refetchQueries met Subscriptions.
          onCompleted={() => scrollDown()}>
          {sendMessage => (
            <form style={{ display: 'flex', width: '100%' }} onSubmit={onSendMessage(sendMessage)}>
              <div className="input-container">
                <Input
                  className="generalchat-input"
                  name="message"
                  type="text"
                  value={message}
                  placeholder="Type here"
                  onChange={e => setMessage(e.target.value)}
                  required
                />

                <Button className="generalchat-input-button" type="submit">
                  <SendIcon />
                </Button>
              </div>
            </form>
          )}
        </Mutation>
      </div>
    </div>
  );
};

export default Messages;
