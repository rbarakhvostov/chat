import React, { Component } from 'react';
import LoginForm from '../LoginForm';
import Header from '../Header';
import Loader from '../Loader';
import MessageField from '../MessageField';
import MessageForm from '../MessageForm';
// import WSservice from '../../service/ws-service';

import './app.scss';

export default class App extends Component {
  _protocol = 'wss://wssproxy.herokuapp.com/';
  socket = null;
  state = {
    userName: localStorage.getItem("WSchatUserName"),
    loading: true,
    messages: [],
    status: 'online',
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
        return {
          loading: false,
          messages: [...messages, ...JSON.parse(event.data).reverse()],
        }
      }); 
    }

    this.socket.onclose = () => {
      console.log(this.socket.readyState);
      this.connect();
    };
  }

  componentDidMount = () => {
    this.connect();
  }

  handleUserLogIn = (userName) => {
    localStorage.setItem('WSchatUserName', userName);
    this.setState({
      userName: userName,
    });
  }

  handleMessageSend = (messageText) => {
    console.log(messageText);
    const message = {
      from: this.state.userName,
      message: messageText,
    }
    this.socket.send(JSON.stringify(message));
  }

  render() {
    const { userName, loading, messages, status } = this.state;

    if (!userName) {
      return <LoginForm onUserLogIn={ this.handleUserLogIn }/>
    }

    return (
      <div className='app'>
        <Header userName={ userName } status={ status } />
        <div className='content'>
          { loading ? <Loader /> : <MessageField messages={ messages } /> }
        </div>
        <MessageForm onMessageSend={ this.handleMessageSend } />
      </div>
    );
  }
}
