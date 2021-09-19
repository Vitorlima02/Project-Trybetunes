import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loading from '../pages/Loading';
import { addSong } from '../services/favoriteSongsAPI';

export default class MusicCard extends Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      isChecked: false,
    };
  }

  myGetSong = async (musica) => {
    this.setState({ loading: true });
    await addSong(musica);
    this.setState({
      loading: false,
      isChecked: true,
    });
  }

  render() {
    const { music } = this.props;
    const { loading, isChecked } = this.state;
    const musics = (
      <div key={ music.trackId }>
        <span>{ music.trackName }</span>
        <audio data-testid="audio-component" src={ music.previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento.
          <code>audio</code>
        </audio>
        <label
          htmlFor={ music.trackId }
          data-testid={ `checkbox-music-${music.trackId}` }
        >
          <input
            checked={ isChecked }
            type="checkbox"
            id={ music.trackId }
            onChange={ () => this.myGetSong(music) }
          />
        </label>
      </div>
    );

    return (
      <div>
        {loading ? <Loading /> : musics }
      </div>
    );
  }
}

MusicCard.propTypes = {
  music: PropTypes.arrayOf(PropTypes.object).isRequired,
};
