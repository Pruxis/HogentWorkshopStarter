import React, { useState } from 'react';
import Register from './pages/Register';
import Chat from 'pages/Chat';
import { User } from '__generated__/graphqlTypes';
import './index.css';

const App: React.FC = () => {
  const [{ username, userId }, setUser] = useState({
    username: localStorage.getItem('username') || '',
    userId: localStorage.getItem('userId') || '',
  });
  const onRegisterUser = ({ id, name }: User, username: string) => {
    localStorage.setItem('username', username);
    localStorage.setItem('userId', userId);
    setUser({ userId: id, username: name });
  };

  return (
    <div className="app-container">
      {!userId && <Register onRegisterUser={onRegisterUser} />}
      {userId && <Chat userId={userId} username={username} />}
    </div>
  );
};

export default App;
