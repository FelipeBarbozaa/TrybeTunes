import React from 'react';
import PropTypes from 'prop-types';
import getMusics from '../services/musicAPI';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';

class Album extends React.Component {
  constructor() {
    super();

    this.state = {
      load: true,
      album: [],
      info: {
        title: '',
        image: '',
        name: '',
      },
    };
  }

  componentDidMount() {
    this.musicApi();
  }

  musicApi = async () => {
    const { match: { params: { id } } } = this.props;
    const music = await getMusics(id).then((res) => res);
    const collection = [];
    const track = [];
    music.filter((e) => {
      if (e.kind !== 'song') {
        return collection.push(e);
      }
      return track.push(e);
    });

    const { artworkUrl100, artistName, collectionName } = collection[0];

    this.setState({
      load: false,
      album: track,
      info: {
        title: collectionName,
        image: artworkUrl100,
        name: artistName,
      },
    });
  }

  render() {
    const { album, load, info: { title, image, name } } = this.state;
    return (
      <>
        <Header />
        { load
          ? (
            <p className="carregando">Loading...</p>
          ) : (
            <div id="album-container">
              <div id="albumId">
                <img src={ image } alt={ name } />
                <h2 data-testid="album-name">{ title }</h2>
                <p data-testid="artist-name">{ name }</p>
              </div>
              <div className="sound">
                {album.map((e) => (
                  <MusicCard
                    key={ e.trackName }
                    trackId={ e.trackId }
                    trackName={ e.trackName }
                    previewUrl={ e.previewUrl }
                  />
                ))}
              </div>
            </div>
          )}
      </>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.objectOf(PropTypes.number),
  }),
}.isRequired;

export default Album;
