import React, { Component } from 'react';
import LoginForm from '../LoginForm';
import Chat from '../Chat';

export default class App extends Component {
  state = {
    userName: localStorage.getItem("WSchatUserName"),
    status: navigator.onLine ? 'online' : 'offline', 
  }

  componentDidMount() {
    window.addEventListener('online', () => this.handleConnectionChange('online'));
    window.addEventListener('offline', () => this.handleConnectionChange('offline'));
  }

  handleConnectionChange = (status) => {
    this.setState({
      status,
    });
  }

  handleUserLogIn = (userName) => {
    localStorage.setItem('WSchatUserName', userName);
    this.setState({
      userName: userName,
    });
  }

  handleUserLogOut = () => {
    localStorage.removeItem('WSchatUserName');
    this.setState({
      userName: null,
    });
  }

  render() {
    const { userName, status } = this.state;

    return  !userName 
              ? <LoginForm onUserLogIn={ this.handleUserLogIn } />
              : <Chat 
                  status={ status }
                  userName={ userName }
                  onUserLogOut={ this.handleUserLogOut } />
  }
}
