const getMusics = async (id) => {
  const request = await fetch(`https://itunes.apple.com/lookup?id=${id}&entity=song`);
  const data = await request.json();
  return data.results;
};

export default getMusics;
