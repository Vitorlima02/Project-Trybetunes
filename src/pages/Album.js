import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

export default class Album extends Component {
  constructor() {
    super();

    this.state = {
      artistName: '',
      artistAlbum: [],
      collectionName: '',
    };
  }

  componentDidMount() {
    const { match: { params: { id } } } = this.props;
    this.myGetMusicFromApi(id);
  }

  myGetMusicFromApi = (id) => {
    getMusics(id).then((result) => this.setState({
      artistName: result[0].artistName,
      collectionName: result[0].collectionName,
      artistAlbum: [...result],
    }));
  }

  render() {
    const { artistAlbum, artistName, collectionName } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <h2 data-testid="artist-name">{ artistName }</h2>
        <h5 data-testid="album-name">{ collectionName }</h5>
        {artistAlbum.slice(1)
          .map((musica) => <MusicCard music={ musica } key={ musica.trackId } />)}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.objectOf(PropTypes.string),
  }).isRequired,
};
