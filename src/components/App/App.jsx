import React, { Component } from 'react';
import Header from '../Header';
import MessageField from '../MessageField';
import MessageForm from '../MessageForm';
// import WSservice from '../../service/ws-service';

import './app.scss';

export default class App extends Component {
  _protocol = 'wss://wssproxy.hersokuapp.com/';
  state = {
    messages: [],
    status: 'online',
  }


  connect = () => {
    const socket = new WebSocket(this._protocol);
    socket.onmessage = (event) => {
      this.setState(({ messages }) => {
        return {
          messages: [...messages, ...JSON.parse(event.data).reverse()],
        }
      }); 
    }

    socket.onclose = () => {
      console.log(socket.readyState);
      this.setState({ messages: [] });
      this.connect();
    };
  }
  componentDidMount = () => {
    this.connect();
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
