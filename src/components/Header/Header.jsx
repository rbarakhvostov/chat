import React from 'react';

import './header.scss';

const Header = ({ userName, status, onUserLogOut }) => {
  return (
    <div className='chat-header'>
      <span className='status'>{ status }</span>
      <span className='name'>{ userName }</span>
      <button type='button' onClick={ onUserLogOut }>log out</button>
    </div>
  );
}

export default Header;
