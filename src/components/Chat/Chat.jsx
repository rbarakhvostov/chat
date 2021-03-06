import React, { Component } from 'react';
import Header from '../Header';
import Loader from '../Loader';
import MessageField from '../MessageField';
import MessageForm from '../MessageForm';

import icon from '../../images/notification-image.png';

import './chat.scss';

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
      if (event.reason === 'the work is done') return;
      this.connect();
    };
  }

  componentDidMount = () => {
    if (this.props.status === 'offline') return;

    if (Notification.permission !== 'granted') {
      Notification.requestPermission();
    }

    this.connect();
  }

  componentDidUpdate = (prevProps) => {
    if (prevProps.status === 'offline' && !this.socket) {
      this.connect();
    }
  }

  componentWillUnmount = () => {
    if (this.props.status === 'offline') return;
    this.socket.close(1000, 'the work is done');
  }

  handleMessageSend = (messageText) => {
    if (this.props.status === 'offline' || this.socket.readyState !== 1) return;
    const message = {
      from: this.props.userName,
      message: messageText,
    }
    this.socket.send(JSON.stringify(message));
  }

  render() {
    const { loading, messages } = this.state;

    return (
      <div className='chat'>
        <Header { ...this.props } />
        <div className='message-field-wrapper'>
          { loading ? <Loader /> : <MessageField messages={ messages } /> }
        </div>
        <MessageForm onMessageSend={ this.handleMessageSend } />
      </div>
    );
  }
}
