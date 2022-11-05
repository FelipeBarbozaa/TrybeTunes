import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import albumAPI from '../services/albumAPI';
import Loading from '../components/Loading';

class Search extends React.Component {
  constructor() {
    super();

    this.state = {
      sucess: true,
      loading: false,
      hidden: false,
      disabled: true,
      artistname: true,
      artist: '',
      value: '',
      album: [],
    };
  }

  handleInput = ({ target }) => {
    if (target.value.length >= 2) {
      this.setState({
        disabled: false,
      });
    }
    this.setState({
      [target.name]: target.value,
    });
  }

  handleClick = async () => {
    this.setState({
      hidden: true,
      loading: true,
    });

    const { value } = this.state;
    const album = await albumAPI(value);
    this.setState({
      album,
      artistname: false,
      artist: value,
      loading: false,
      value: '',
    });
    if (album.length === 0) this.setState({ sucess: false });
  }

  render() {
    const {
      disabled,
      value,
      loading,
      artist,
      artistname,
      sucess,
      album,
    } = this.state;
    return (
      <>
        <Header />
        {loading ? <Loading />
          : (
            <form id="search-form">
              <input
                id="input-search"
                name="value"
                type="text"
                placeholder="Nome do Artista"
                onChange={ this.handleInput }
                value={ value }
              />
              <button
                type="button"
                id="button-search"
                disabled={ disabled }
                onClick={ this.handleClick }
              >
                Pesquisar
              </button>
            </form>
          )}
        {sucess
          ? (
            <p
              hidden={ artistname }
              id="result-artist"
            >
              Resultado de álbuns de:
              {' '}
              { artist }
            </p>
          ) : (
            <p className="carregando">Nenhum álbum foi encontrado</p>
          )}
        {sucess
          ? (
            <div id="result">
              <section id="album">
                {album.map((e) => (
                  <div className="div-album" key={ e.collectionId }>
                    <Link
                      to={ `/album/${e.collectionId}` }
                      data-testid={ `link-to-album-${e.collectionId}` }
                    >
                      <img src={ e.artworkUrl100 } alt={ e.collectionName } />
                    </Link>
                    <h2>{ e.collectionName }</h2>
                    <p>{ e.artistName }</p>
                  </div>
                ))}
              </section>
            </div>
          ) : null}
      </>
    );
  }
}

export default Search;
