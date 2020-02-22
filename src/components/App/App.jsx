import React, { Component } from 'react';
import Header from '../Header';
import MessageField from '../MessageField';
import MessageForm from '../MessageForm';
// import WSservice from '../../service/ws-service';

import './app.scss';

export default class App extends Component {
  _protocol = 'wss://wssproxy.herokuapp.com/';
  socket = new WebSocket(this._protocol);
  state = {
    messages: [],
    status: 'online',
  }

  componentDidMount = () => {
    // const socket = new WebSocket(this._protocol);
    this.socket.onmessage = (event) => {
      console.log(JSON.parse(event.data))
      this.setState(({ messages }) => {
        return {
          messages: [...messages, ...JSON.parse(event.data).reverse()],
        }
      }); 
    }

    this.socket.onclose = event => {
      console.log('1', event.reason)
      console.log('2', event.code)
      console.log('3', event.wasClean)
    };
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
