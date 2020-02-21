import React from 'react';
import MessageItem from '../MessageItem';

import './messageField.scss';

const MessageField = ({ messages }) => {
  const messageItems = messages.map( item => {
    const { id, ...itemProps } = item;
    return (
      <MessageItem { ...itemProps } key={ id }/>
    );
  });
  return (
    <div className='message-field'>
      { messageItems }
    </div>
  );
}

export default MessageField;
