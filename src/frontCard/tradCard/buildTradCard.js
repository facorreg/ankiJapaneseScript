// eslint-disable-next-line no-unused-vars
const buildTradCard = async (word, wordElem) => {
  try {
    const data = await myFetch({
      url: KANJI_API_URL,
      endpoint: 'word/traductions',
      args: { word },
    }) || {};

    if (isEmpty(data)) return promiseRemoveHidden(wordElem);

    const traductions = data
      .map((senses) => senses
        .map(({ partsOfSpeech, tags, englishDefinitions }, i) => `
          <span class="defPart">${partsOfSpeech.join(', ')}</span>
          <span>${i}. <span class="def">${englishDefinitions.join(', ')}</span></span>
          <span class="tags">${tags.join(', ')}</span>
        `).join('<br />'));

    wordElem.remove();

    const trad = createQaChildren({
      id: 'trad',
      method: 'innerHTML',
      content: first(traductions),
    });

    swapContent(traductions, trad);
    return Promise.resolve();
  } catch (err) {
    return promiseRemoveHidden(wordElem, err);
  }
};
