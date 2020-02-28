import React, { Component } from 'react';

import './loginForm.scss';

export default class LoginForm extends Component {
  input = React.createRef();

  state = {
    userName: '',
  }

  componentDidMount = () => {
    this.input.current.focus();
  }

  handleChange = (event) => {
    this.setState({
      userName: event.target.value,
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    if (!this.state.userName.trim()) return;
    this.props.onUserLogIn(this.state.userName);
  }

  render() {
    return (
      <form className='login-form' onSubmit={ this.handleSubmit }>
        <input
          value={ this.state.userName }
          onChange={ this.handleChange } 
          placeholder='username'
          ref={ this.input } />
        <button type='submit'>log in</button>
      </form>
    );
  }
}
