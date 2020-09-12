// eslint-disable-next-line no-unused-vars
const buildWordCard = async (word, wordElem, options) => {
  if (!options.questionShowFurigana || !hasKanji(word)) {
    return promiseRemoveHidden(wordElem);
  }

  const args = {
    url: KANJI_API_URL,
    endpoint: 'word/readings',
    args: { word },
  };

  try {
    const readings = await myFetch(args);
    if (isEmpty(readings)) return promiseRemoveHidden(wordElem);

    const withFurigana = readings.map((reading) => stringWithFurigana(word, reading));
    // eslint-disable-next-line no-param-reassign
    wordElem.innerHTML = first(withFurigana);
    swapContent(withFurigana, wordElem);

    setFinalDisplay('#pageWord');
    return promiseRemoveHidden(wordElem);
  } catch (err) {
    return promiseRemoveHidden(wordElem, err);
  }
};
