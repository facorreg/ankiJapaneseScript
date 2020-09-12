const buildKanjiData = (word, props = {}) => {
  const { kanji: { kanji, examples = [] } } = word;
  const {
    strokes = {},
    video: videoSources = {},
    jlpt,
    character,
  } = kanji;

  const videoFormat = findValidFormat(videoSources, videoFormats);

  return [{
    classNames: ['hidden', 'answerKanji'],
    ownChildren: [
      overviewData(kanji, jlpt),
      sideBarData(videoSources, videoFormat, strokes.count, character),
      strokesImagesData(strokes.images),
      examplesData(examples),
    ],
    ...props,
  }];
};

// eslint-disable-next-line no-unused-vars
const buildKanjiPage = async (word, options) => {
  try {
    const args = {
      url: KANJI_API_URL,
      endpoint: 'kanji',
      args: { ...options, kanji: word },
    };

    const response = await myFetch(args);
    if (response.words) return buildWordPage(word, options);

    createQaChildren({
      id: '_answer',
      ownChildren: buildKanjiData(response),
    });

    return Promise.resolve('.answerKanji');
  } catch (err) {
    return Promise.reject(err);
  }
};
