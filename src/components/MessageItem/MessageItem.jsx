import React from 'react';
import moment from 'moment';

import './messageItem.scss';

export default class MessageItem extends React.Component {
  messageTextRef = React.createRef();

  componentDidMount() {
    this.messageTextRef.current.innerHTML = this.props.message.replace(/\n/g, '<br>');
  }

  render() {
    const { from, time } = this.props;
    const timeDate = moment(time).format("HH:mm:ss DD MMM YYYY");
    const className = from === localStorage.getItem('WSchatUserName')
                      ? 'message-item message-item-own'
                      : 'message-item';
    return (
      <div className={ className }>
        <span className="message-author">{ from }</span>
        <span className="message-text" ref={ this.messageTextRef }></span>
        <span className="message-time-date">{ timeDate }</span>
      </div>
    );
  }
}
