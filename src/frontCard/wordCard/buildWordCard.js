// eslint-disable-next-line no-unused-vars
const buildWordCard = async (word) => {
  const wordElem = document.querySelector('#pageWord');

  const args = {
    url: KANJI_API_URL,
    endpoint: 'word/readings',
    args: { word },
  };

  try {
    const readings = await myFetch(args);
    if (isEmpty(readings)) return Promise.resolve();

    const withFurigana = readings.map((reading) => stringWithFurigana(word, reading));
    wordElem.innerHTML = first(withFurigana);
    swapContent(withFurigana, wordElem);

    wordElem.classList.remove('hidden');
    setFinalDisplay('#pageWord');
    return Promise.resolve();
  } catch (err) {
    return Promise.reject();
  }
};
