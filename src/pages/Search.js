import React, { Component } from 'react';
import Header from '../components/Header';
import Loading from './Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import CreateCard from '../components/CreateCard';
import NotFound from './NotFound';

export default class Search extends Component {
  constructor() {
    super();

    this.state = {
      artistname: '',
      inputvalue: '',
      loading: false,
      testloading: false,
      albuns: [],
    };
  }

  myGetValue = async (artistname) => {
    this.setState({ loading: true });
    const albuns = await searchAlbumsAPI(artistname);
    this.setState({
      loading: false,
      testloading: true,
      albuns: [...albuns],
      inputvalue: artistname,
      artistname: '',
    });
  }

  myVerifyLength = (event) => {
    const minLength = 2;
    const text = event.target.value;
    if (text.length >= minLength) {
      this.setState({
        buttonenable: false,
        artistname: text,
      });
    } else {
      this.setState({
        buttonenable: true,
        artistname: text,
      });
    }
  }

  render() {
    const {
      artistname,
      buttonenable,
      loading,
      testloading,
      inputvalue,
      albuns } = this.state;
    const form = (
      <form>
        <input
          data-testid="search-artist-input"
          type="text"
          value={ artistname }
          onChange={ this.myVerifyLength }
        />
        <button
          data-testid="search-artist-button"
          type="button"
          disabled={ buttonenable }
          onClick={ () => this.myGetValue(artistname) }
        >
          Pesquisar
        </button>
      </form>
    );
    return (
      <div data-testid="page-search">
        <Header />
        {loading ? <Loading /> : form}
        {testloading ? (`Resultado de álbuns de: ${inputvalue}`) : ''}
        {albuns.length > 0
          ? albuns.map((album) => <CreateCard card={ album } key={ album.artistId } />)
          : <NotFound />}
      </div>
    );
  }
}
