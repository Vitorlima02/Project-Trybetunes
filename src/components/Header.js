import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from '../pages/Loading';

export default class Header extends Component {
  constructor() {
    super();

    this.state = {
      validation: true,
      user: '',
    };
  }

  componentDidMount() {
    this.myUserName();
  }

  myUserName = async () => {
    const userName = await getUser();
    this.setState({
      validation: false,
      user: userName.name,
    });
  }

  render() {
    this.myUserName();
    const { validation, user } = this.state;
    if (validation) return <Loading />;
    return (
      <header data-testid="header-component">
        <span data-testid="header-user-name">
          {user}
        </span>
        <nav>
          <Link data-testid="link-to-search" to="/search">Search</Link>
          <Link data-testid="link-to-favorites" to="/favorites">Favorites</Link>
          <Link data-testid="link-to-profile" to="/profile">Profile</Link>
        </nav>
      </header>
    );
  }
}

/* Para realizar uma parte do requisito recebi ajuda da Mariana Ferreira
Segue o repositório: https://github.com/tryber/sd-014-b-project-trybetunes/blob/mariana-trybetunes/src/components/Header.js */
