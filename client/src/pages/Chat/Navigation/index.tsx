import React from 'react';
import { ReactComponent as ProfileIcon } from '../../../assets/icons/profile.svg';
import { ReactComponent as ChatIcon } from '../../../assets/icons/chat.svg';

interface NavigationProps {
  username: string;
}
interface NavigationitemProps {
  icon: any;
  title: string;
  isActive?: boolean;
}

const NavigationItem: React.FC<NavigationitemProps> = ({ icon: Icon, title, isActive = false }) => (
  <div className={`navigation-item${isActive ? ' active' : ''}`}>
    <div>{Icon()}</div>
    <div>{title}</div>
  </div>
);

const Navigation: React.FC<NavigationProps> = ({ username }) => (
  <div className="navigation">
    <div className="profile">
      <div>{username.charAt(0).toUpperCase()}</div>
      <div className="bold">{username}</div>
    </div>
    <div className="navigation-items">
      <NavigationItem icon={() => <ChatIcon style={{ width: '25px' }} />} title="Chat" isActive />
      {/* <NavigationItem icon={() => <ProfileIcon style={{ width: '25px' }} />} title="Pofile" /> */}
    </div>
  </div>
);

export default Navigation;
