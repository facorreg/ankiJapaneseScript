// eslint-disable-next-line no-unused-vars
const getFurigana = async (word) => {
  const wordElem = document.querySelector('#pageWord');

  const args = {
    url: KANJI_API_URL,
    endpoint: 'word/readings',
    args: { word },
  };

  try {
    const readings = await myFetch(args);
    if (isEmpty(readings)) return Promise.resolve();

    wordElem.innerHTML = stringWithFurigana(word, readings[0]);
    wordElem.classList.remove('hidden');
    return Promise.resolve();
  } catch (err) {
    return Promise.reject();
  }
};
