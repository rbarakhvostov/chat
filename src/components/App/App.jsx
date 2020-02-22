import React, { Component } from 'react';
import Header from '../Header';
import MessageField from '../MessageField';
import MessageForm from '../MessageForm';
// import WSservice from '../../service/ws-service';

import './app.scss';

export default class App extends Component {
  _protocol = 'wss://wssproxy.herokuapp.com/';

  state = {
    messages: [],
    status: 'online',
  }

  componentDidMount = () => {
    const socket = new WebSocket(this._protocol);
    socket.onmessage = (event) => {
      this.setState({ 
        messages: JSON.parse(event.data),
      }); 
    }
  }

  handleMessageAdd = (messageText) => {
    const message = {
      from: 'NAME',
      message: messageText,
    }
    this.setState(({ messages }) => {
      return {
        messages: [...messages, message],
      }
    });
  }

  render() {
    const { messages, status } = this.state;
    return (
      <div className='app'>
        <Header status={ status } />
        <MessageField messages={ messages } />
        <MessageForm onMessageTextAdd={this.handleMessageAdd} />
      </div>
    );
  }
}
