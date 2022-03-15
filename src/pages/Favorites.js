import React from 'react';
import Header from '../components/Header';
import FavoriteCard from '../components/FavoriteCard';

class Favorites extends React.Component {
  constructor() {
    super();

    this.state = {
      favorites: [],
    };
  }

  componentDidMount() {
    this.musicApi();
  }

  musicApi = async () => {
    if ('favorite' in localStorage) {
      const favorites = JSON.parse(localStorage.getItem('favorite'));
      if (favorites.length !== 0) this.setState({ favorites });
    }
  }

  render() {
    const { favorites } = this.state;
    return (
      <>
        <Header />
        { favorites.length > 0
          ? (
            <div className="album-favorite">
              {favorites.map((e) => (
                <FavoriteCard
                  key={ e }
                  trackId={ parseInt(e, 10) }
                />
              ))}
            </div>
          )
          : (
            <h1 className="carregando">Nenhuma música salva!</h1>
          )}
      </>
    );
  }
}

export default Favorites;
