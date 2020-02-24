import React, { Component } from 'react';

import './messageForm.scss';

export default class MessageForm extends Component {
  state = {
    messageText: '',
  }
  handleChange = (event) => {
    this.setState({
      messageText: event.target.value,
    });
  }
  handleSubmit = (event) => {
    event.preventDefault();
    this.props.onMessageSend(this.state.messageText);
    this.setState({
      messageText: '',
    });
  }
  render() {
    return (
      <form className='message-form' name='messageForm' onSubmit={ this.handleSubmit }>
        <textarea
          rows="2"
          name='newMessage'
          value={ this.state.messageText }
          onChange={ this.handleChange } />
        <button type='submit'>send</button>
      </form>
    );
  }
}
