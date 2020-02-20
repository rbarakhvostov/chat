import React, { Component } from 'react';
import Header from '../Header';

import './app.scss';

export default class App extends Component {
  state = {
    messages: null,
    status: 'online',
  }

  render() {
    const { messages, status } = this.state;
    return (
      <div className='chat'>
        <Header status={ status } />

      </div>
    )
  }
}