import React from 'react';
import Messages from './Messages';
import Navigation from './Navigation';
import People from './People';

interface Props {
  username: string;
  userId: string;
}

const Chat: React.FC<Props> = ({ username, userId }) => {
  return (
    <div className="container">
      <Navigation username={username} />
      <People />
      <div className="chat">
        <Messages title="Chat Room" userId={userId} />
      </div>
    </div>
  );
};

export default Chat;
