import React, { Component } from 'react';
import Header from '../Header';
import Loader from '../Loader';
import MessageField from '../MessageField';
import MessageForm from '../MessageForm';
// import WSservice from '../../service/ws-service';

import './app.scss';

export default class App extends Component {
  _protocol = 'wss://wssproxy.herokuapp.com/';
  state = {
    loading: true,
    messages: [],
    status: 'online',
  }

  connect = () => {
    const socket = new WebSocket(this._protocol);

    socket.onmessage = (event) => {
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

    socket.onclose = () => {
      console.log(socket.readyState);
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
    const { loading, messages, status } = this.state;
    return (
      <div className='app'>
        <Header status={ status } />
        <div className='content'>
          { loading ? <Loader /> : <MessageField messages={ messages } />}
        </div>
        <MessageForm onMessageTextAdd={this.handleMessageAdd} />
      </div>
    );
  }
}
