import React from 'react';
import PropTypes from 'prop-types';
import getMusics from '../services/musicAPI';
import heart1 from '../heart1.png';

class FavoriteCard extends React.Component {
  constructor() {
    super();

    this.state = {
      favorite: false,
      trackName: '',
      previewUrl: '',
      callback: 0,
    };
  }

  componentDidMount() {
    this.musicApi();
    this.favoriteMusic();
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
      window.location.reload();
    }
  }

  favoriteMusic = async () => {
    const { trackId } = this.props;
    const data = await getMusics(trackId);
    const music = data[0];
    this.setState({
      trackName: music.trackName,
      previewUrl: music.previewUrl,
    });
  }

  render() {
    const { trackName, previewUrl, favorite } = this.state;
    const { trackId } = this.props;
    return (
      <div>
        <p className="line2" />
        <div className="album-list album-list2">
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

FavoriteCard.propTypes = {
  trackId: PropTypes.number.isRequired,
};

export default FavoriteCard;
