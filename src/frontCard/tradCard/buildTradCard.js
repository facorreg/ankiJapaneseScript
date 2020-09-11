// eslint-disable-next-line no-unused-vars
const buildTradCard = async (word, wordElem) => {
  try {
    const traductions = await myFetch({
      url: KANJI_API_URL,
      endpoint: '/word/traductions',
      args: { word },
    });

    if (isEmpty(traductions)) return promiseRemoveHidden(wordElem);

    wordElem.remove();

    const trad = createQaChildren({
      id: 'trad',
      content: first(traductions),
    });

    swapContent(traductions, trad);
    return Promise.resolve();
  } catch (err) {
    return promiseRemoveHidden(wordElem, err);
  }
};
