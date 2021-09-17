import React, { Component } from 'react';
import Header from '../components/Header';

export default class Search extends Component {
  constructor() {
    super();

    this.state = {
      artistname: '',
    };
  }

  myGetName = ({ target }) => {
    this.setState({ artistname: target.value });
  }

  render() {
    const { artistname } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <input
            data-testid="search-artist-input"
            type="text"
            onChange={ this.myGetName }
          />
          <button
            data-testid="search-artist-button"
            type="submit"
            disabled={ artistname.length < 2 }
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}
