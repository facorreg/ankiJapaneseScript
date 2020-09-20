// eslint-disable-next-line no-unused-vars
const buildWordPage = async (word, options) => {
  try {
    const wordArgs = {
      url: KANJI_API_URL,
      endpoint: 'word',
      args: {
        ...options,
        word,
      },
    };

    const { words = [], kanjiWithin } = await myFetch(wordArgs);

    buildDictionary(words);
    buildKanjiList(kanjiWithin);
    await buildExamples(words);

    return Promise.resolve('.answerWord');
  } catch (err) {
    return Promise.reject(err);
  }
};
