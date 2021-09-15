import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from './Loading';

export default class Login extends Component {
  constructor() {
    super();

    this.state = {
      buttonenable: true,
      name: '',
      loading: false,
      logged: false,
    };
  }

  myCreateUser = async () => {
    const { name } = this.state;
    this.setState({ loading: true });
    const result = await createUser({ name });
    this.setState({ loading: false });
    this.setState({ logged: true });
    console.log(result);
  }

  myVerifyLength = (event) => {
    const minLength = 3;
    const text = event.target.value;
    if (text.length >= minLength) {
      this.setState({
        buttonenable: false,
        name: text,
      });
    } else {
      this.setState({
        buttonenable: true,
        name: text,
      });
    }
  }

  render() {
    const { buttonenable, name, loading, logged } = this.state;
    if (loading) return <Loading />;
    if (logged) return <Redirect to="/search" />;
    return (
      <div data-testid="page-login">
        <input
          data-testid="login-name-input"
          type="text"
          value={ name }
          onChange={ this.myVerifyLength }
        />
        <button
          data-testid="login-submit-button"
          type="submit"
          disabled={ buttonenable }
          onClick={ this.myCreateUser }
        >
          Entrar
        </button>
      </div>
    );
  }
}
