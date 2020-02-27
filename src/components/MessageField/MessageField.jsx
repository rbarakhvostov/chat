import React, { Component } from 'react';
import MessageItem from '../MessageItem';

import './messageField.scss';

export default class MessageField extends Component  {

  messageFieldRef = React.createRef();

  moveScrollbarThumb = () => {
    const messageField = this.messageFieldRef.current;
    console.log(messageField)
    messageField.scrollTop = messageField.scrollHeight;
  }

  componentDidMount() {
    console.log('MF did mount');
    this.moveScrollbarThumb();
  }

  componentDidUpdate() {
    console.log('MFDIDUPDATE');
    this.moveScrollbarThumb();
  }

  render() {
    const messageItems = this.props.messages.map( item => {
      const { id, ...itemProps } = item;
      return (
        <MessageItem { ...itemProps } key={ id }/>
      );
    });
    return (
      <div className='message-field' ref={ this.messageFieldRef }>
        { messageItems }
      </div>
    );
  }
}
