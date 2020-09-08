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

    const { words, kanjiWithin } = await myFetch(wordArgs);

    createQaChildren({
      id: 'answer',
      ownChildren: [{
        classNames: ['hidden', 'answerWord'],
        ownChildren: [{
          classNames: ['wordDefContainer'],
          ownChildren: words.map((childWord) => {
            const { japanese, senses } = objectPropEnforceArray(childWord, ['japanese', 'senses']);
            const [firstJap, ...rest] = japanese;

            return {
              classNames: ['defElemContainer'],
              ownChildren: [
                {
                  method: 'innerHTML',
                  content: stringWithFurigana(firstJap.word, firstJap.reading),
                  classNames: ['word'],
                  attributes: { lang: 'jap' },
                },
                ...defElemsData(senses),
                otherFormsData(rest),

              ],
            };
          }),
        }],
      }],
    });

    if (kanjiWithin) {
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

    return Promise.resolve('.answerWord');
  } catch (err) {
    console.log(err);
    return Promise.reject(err);
  }
};
