import React, { Component } from 'react';
import Header from '../Header';
import Loader from '../Loader';
import MessageField from '../MessageField';
import MessageForm from '../MessageForm';

import './chat.scss';

export default class Chat extends Component {
  _protocol = 'wss://wssproxy.herokuapp.com/';
  socket = null;
  state = {
    loading: true,
    messages: [],
  }

  connect = () => {
    this.socket = new WebSocket(this._protocol);

    this.socket.onmessage = (event) => {
      console.log('new MESSAGE')
      if (
        JSON.stringify(this.state.messages) 
          === 
        JSON.stringify(JSON.parse(event.data).reverse())
        ) {
        return;
      }
      this.setState(({ messages }) => {
        return {
          loading: false,
          messages: [...messages, ...JSON.parse(event.data).reverse()],
        }
      }); 
    }

    this.socket.onclose = (event) => {
      console.log(event.reason);
      console.log(this.socket.readyState);
      if (event.reason === 'the work is done') return;
      this.connect();
    };
  }

  componentDidMount = () => {
    this.connect();
  }

  componentWillUnmount = () => {
    console.log('UNMOUNT')
    this.socket.close(1000, 'the work is done');
  }

  handleMessageSend = (messageText) => {
    console.log(messageText);
    const message = {
      from: this.props.userName,
      message: messageText,
    }
    this.socket.send(JSON.stringify(message));
  }

  render() {
    const { loading, messages } = this.state;
    const { userName, status, onUserLogOut } = this.props;

    return (
      <div className='chat'>
        <Header
          userName={ userName }
          status={ status }
          onUserLogOut={ onUserLogOut } />
        <div className='message-field-wrapper'>
          { loading ? <Loader /> : <MessageField messages={ messages } /> }
        </div>
        <MessageForm onMessageSend={ this.handleMessageSend } />
      </div>
    );
  }
}