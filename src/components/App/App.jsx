import React, { Component } from 'react';
import LoginForm from '../LoginForm';
import Chat from '../Chat';
// import WSservice from '../../service/ws-service';

import './app.scss';

export default class App extends Component {
  state = {
    userName: localStorage.getItem("WSchatUserName"),
    status: 'online',
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
