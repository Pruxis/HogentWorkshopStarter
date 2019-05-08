import React from 'react';
import ColorHash from 'color-hash';
import { invertColor } from '../../../utils/colors';
const colors = new ColorHash();

const style = {
  messageContainer: {
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    padding: '6px 0px',
    borderBottom: '1px solid gray',
  },
  userIcon: (username: string): React.CSSProperties => {
    const backgroundColor = colors.hex(username);
    return {
      backgroundColor: backgroundColor,
      color: invertColor(backgroundColor),
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '26px',
      borderRadius: '40px',
      minWidth: '50px',
      minHeight: '50px',
      textTransform: 'uppercase',
    };
  },
};

const UserIcon: React.FC<{ left?: boolean; children: string }> = ({ left, children }) => (
  <div title={children} className={`message-icon-${left ? 'left' : 'right'}`}>
    {children[0]}
  </div>
);

const UserMessage: React.FC<{ yourself: boolean; username: string; message: any }> = ({
  message,
  username,
  yourself,
}) => {
  const left = !yourself;
  return (
    <div className={`message-container-${left ? 'left' : 'right'}`}>
      <div className={`message-text-container-${left ? 'left' : 'right'}`}>{message}</div>
      <UserIcon left={left}>{username}</UserIcon>
    </div>
  );
};

export default UserMessage;
