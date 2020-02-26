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
    if (!this.state.messageText.trim()) return;
    this.props.onMessageSend(this.state.messageText);
    this.setState({
      messageText: '',
    });
  }
  render() {
    return (
      <form className='message-form' onSubmit={ this.handleSubmit }>
        <textarea
          rows='1'
          placeholder='type your message'
          value={ this.state.messageText }
          onChange={ this.handleChange } />
        <button type='submit'>
          <i className="fa fa-paper-plane" aria-hidden="true"></i>
        </button>
      </form>
    );
  }
}
