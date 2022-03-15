const albumAPI = async (artist) => {
  const artistNameURL = encodeURI(artist).replaceAll('%20', '+');
  const URL = `https://itunes.apple.com/search?entity=album&term=${artistNameURL}&attribute=allArtistTerm`;
  const data = await fetch(URL);
  const { results } = await data.json();
  const response = results.map(
    ({
      artistId,
      artistName,
      collectionId,
      collectionName,
      collectionPrice,
      artworkUrl100,
      releaseDate,
      trackCount,
    }) => ({
      artistId,
      artistName,
      collectionId,
      collectionName,
      collectionPrice,
      artworkUrl100,
      releaseDate,
      trackCount,
    }),
  );
  return response;
};

export default albumAPI;
