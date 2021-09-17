import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default class CreateCard extends Component {
  render() {
    const { card: {
      artworkUrl100,
      artistName,
      collectionName,
      collectionId,
    } } = this.props;
    return (
      <div>
        <img src={ artworkUrl100 } alt="Album" />
        <h4>{ collectionName }</h4>
        <h5>{ artistName }</h5>
        <Link
          data-testid={ `link-to-album-${collectionId}` }
          to={ `/album/${collectionId}` }
        />
      </div>
    );
  }
}

CreateCard.propTypes = {
  card: PropTypes.shape({
    artworkUrl100: PropTypes.string,
    artistName: PropTypes.string,
    collectionName: PropTypes.string,
    collectionId: PropTypes.number,
  }).isRequired,
};
