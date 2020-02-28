import React, { Component } from 'react';

import './messageForm.scss';

export default class MessageForm extends Component {

  textArea = React.createRef();

  state = {
    messageText: '',
  }

  componentDidMount = () => {
    this.textArea.current.focus();
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

  handleKeyDown = (event) => {
    if (event.key === 'Enter' && event.shiftKey) {
      return;
    }
    if (event.key === 'Enter') {
      this.handleSubmit(event);
    }
  }

  render() {
    return (
      <form className='message-form' onSubmit={ this.handleSubmit }>
        <textarea
          rows='2'
          placeholder='type your message...'
          value={ this.state.messageText }
          onChange={ this.handleChange }
          onKeyDown={ this.handleKeyDown }
          ref={ this.textArea }/>
        <button type='submit'>
          <i className="fa fa-paper-plane" aria-hidden="true"></i>
        </button>
      </form>
    );
  }
}
