import React, { Component } from 'react';
import Header from '../Header';
import Loader from '../Loader';
import MessageField from '../MessageField';
import MessageForm from '../MessageForm';

import './chat.scss';
import icon from '../../notification-image.png';

export default class Chat extends Component {
  _protocol = 'wss://wssproxy.herokuapp.com/';
  socket = null;
  state = {
    loading: true,
    messages: [],
  }

  notify = (data) => {
      new Notification('CHAT', {
        icon,
        body: `${data[0].from}\n${data[0].message}`,
      });
  }

  connect = () => {
    this.socket = new WebSocket(this._protocol);

    this.socket.onmessage = (event) => {
      if (
        JSON.stringify(this.state.messages) 
          === 
        JSON.stringify(JSON.parse(event.data).reverse())
        ) {
        return;
      }
      this.setState(({ messages }) => {
        if (messages.length && document.hidden) {
          this.notify(JSON.parse(event.data));
        }
        return {
          loading: false,
          messages: [...messages, ...JSON.parse(event.data).reverse()],
        }
      });
    }

    this.socket.onclose = (event) => {
      console.log(this.socket.readyState);
      if (event.reason === 'the work is done') return;
      this.connect();
    };
  }

  componentDidMount = () => {
    if (Notification.permission !== 'granted') {
      Notification.requestPermission();
    }

    this.connect();
  }

  componentWillUnmount = () => {
    this.socket.close(1000, 'the work is done');
  }

  handleMessageSend = (messageText) => {
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