// eslint-disable-next-line no-unused-vars
const buildKanjiList = (kanjiWithin) => {
  if (!isEmpty(kanjiWithin)) {
    const kanjiListArgs = {
      url: KANJI_API_URL,
      endpoint: 'kanjiList',
      args: { kanjiArray: kanjiWithin },
    };
    myFetch(kanjiListArgs)
      .then((kanjiData) => elemGenerator(document.querySelector('.answerWord'))({
        elem: 'div',
        classNames: ['kanjiInfoContainer'],
        ownChildren: kanjiListData(kanjiData),
      }));
  }
};
