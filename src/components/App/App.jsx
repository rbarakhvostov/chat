import React, { Component } from 'react';
import Header from '../Header';
import MessageField from '../MessageField';
import MessageForm from '../MessageForm';

import './app.scss';

export default class App extends Component {
  state = {
    messages: [
      {"time":1582208151541,"id":"8e4b198202faec7a","from":"ROMA","message":"message"},{"time":1582208136481,"id":"25853ace212e5a42","from":"ROMA","message":"message2"},{"time":1582149015627,"id":"c5030d2b5e6123eb","from":"SASHA","message":"message"},
      {"time":1582148986101,"id":"d74e3d60463f4310","from":"SASHA","message":"message2"},
      {"time":1582208151541,"id":"8e4b198202faec7a","from":"ROMA","message":"message"},{"time":1582208136481,"id":"25853ace212e5a42","from":"ROMA","message":"message2"},{"time":1582149015627,"id":"c5030d2b5e6123eb","from":"SASHA","message":"message"},
      {"time":1582148986101,"id":"d74e3d60463f4310","from":"SASHA","message":"message2"},
      {"time":1582208151541,"id":"8e4b198202faec7a","from":"ROMA","message":"message"},{"time":1582208136481,"id":"25853ace212e5a42","from":"ROMA","message":"message2"},{"time":1582149015627,"id":"c5030d2b5e6123eb","from":"SASHA","message":"message"},
      {"time":1582148986101,"id":"d74e3d60463f4310","from":"SASHA","message":"message2"},
      {"time":1582208151541,"id":"8e4b198202faec7a","from":"ROMA","message":"message"},{"time":1582208136481,"id":"25853ace212e5a42","from":"ROMA","message":"message2"},{"time":1582149015627,"id":"c5030d2b5e6123eb","from":"SASHA","message":"message"},
      {"time":1582148986101,"id":"d74e3d60463f4310","from":"SASHA","message":"message2"},
      {"time":1582208151541,"id":"8e4b198202faec7a","from":"ROMA","message":"message"},{"time":1582208136481,"id":"25853ace212e5a42","from":"ROMA","message":"message2"},{"time":1582149015627,"id":"c5030d2b5e6123eb","from":"SASHA","message":"message"},
      {"time":1582148986101,"id":"d74e3d60463f4310","from":"SASHA","message":"message2"},],
    status: 'online',
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
