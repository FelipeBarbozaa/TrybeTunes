import PropTypes from 'prop-types';
import React from 'react';
import heart1 from '../heart1.png';

class MusicCard extends React.Component {
  constructor() {
    super();

    this.state = {
      favorite: false,
    };
  }

  componentDidMount() {
    this.musicApi();
  }

  musicApi = () => {
    const { trackId } = this.props;
    const favorites = JSON.parse(localStorage.getItem('favorite'));
    if (favorites !== null) {
      favorites.forEach((e) => {
        if (parseInt(e, 10) === trackId) {
          this.setState({ favorite: true });
        }
      });
    }
  }

  handleClick = ({ target }) => {
    if (target.checked === true) {
      this.setState({ favorite: true });
      if ('favorite' in localStorage) {
        const previousFavorite = JSON.parse(localStorage.getItem('favorite'));
        localStorage.setItem(
          'favorite', JSON.stringify([...previousFavorite, target.id]),
        );
      } else {
        localStorage.setItem('favorite', JSON.stringify([target.id]));
      }
    } else {
      this.setState({ favorite: false });
      const favorites = JSON.parse(localStorage.getItem('favorite'));
      const favoritesFiltrado = favorites.filter((e) => e !== target.id);
      localStorage.setItem('favorite', JSON.stringify(favoritesFiltrado));
    }
  }

  render() {
    const { trackName, trackId, previewUrl } = this.props;
    const { favorite } = this.state;
    return (
      <div>
        <p className="line" />
        <div className="album-list">
          <div className="name-music">
            <p>{ trackName }</p>
          </div>
          <audio data-testid="audio-component" src={ previewUrl } controls>
            <track kind="captions" />
            O seu navegador não suporta o elemento
            <code>audio</code>
          </audio>
          <label
            htmlFor={ trackId }
            id="teste2"
          >
            <input
              checked={ favorite }
              type="checkbox"
              id={ trackId }
              onChange={ this.handleClick }
            />
            <img src={ heart1 } id="img-favorite" alt="favorite" />
          </label>

        </div>
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  previewUrl: PropTypes.string.isRequired,

};

export default MusicCard;
