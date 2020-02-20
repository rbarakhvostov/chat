import React from 'react';

import './header.scss';

const Header = ({ status }) => {
  return (
    <div className='chat-header'>
      <span className='status'>{ status }</span>
      <button type='button'>log in</button>
    </div>
  );
}

export default Header;
