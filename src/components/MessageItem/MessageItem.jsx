import React from 'react';
import moment from 'moment';

import './messageItem.scss';

const MessageItem = ({ from, message, time }) => {
  const date = moment(time).format("HH:mm:ss DD MMM YYYY");
  return (
    <div className='message-item'>
      <span className="message-author">{ from }</span>
      <span className="message-text">{ message }</span>
      <span className="message-time">{ date }</span>
    </div>
  );
}

export default MessageItem;
