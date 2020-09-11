// eslint-disable-next-line no-unused-vars
const kanjiListData = (kanjiData) => (
  kanjiData.map((data) => {
    if (isEmpty(data.kanji) || isEmpty(data.kanji.kanji)) {
      return null;
    }

    const { kanji: { kanji } } = data;

    const {
      character,
      kunyomi: { hiragana } = {},
      onyomi: { katakana } = {},
      meaning,
      shortMeaning,
      jlpt,
      strokes = {},
    } = kanji;

    const kanjiOwnProps = {
      classNames: ['answerKanji'],
      callback: () => {
        document.querySelector('#modal').classList.remove('hidden');
      },
    };

    return {
      elem: 'div',
      classNames: ['singleKanjiContainer'],
      ownChildren: [{
        elem: 'div',
        method: 'innerText',
        content: character,
        classNames: ['kanjiSymbolContainer'],
        eventListener: {
          type: 'click',
          callback: () => {
            createModalChildren(buildKanjiData(data, kanjiOwnProps));
          },
        },
        ownChildren: [{
          elem: 'div',
          method: 'innerText',
          content: `strokes: ${strokes.count}`,
          classNames: ['strokes', 'singleKanjiOverviewText'],
        }],
      }, {
        elem: 'div',
        classNames: ['singleKanjiInfoContainer'],
        ownChildren: filterEmpty([{
          classNames: ['flexer'],
          ownChildren: filterEmpty([{
            method: 'innerText',
            content: shortMeaning || meaning,
            classNames: ['singleKanjiOverviewText', 'translation'],
          }, {
            skip: !hiragana,
            content: `Kun: ${hiragana}`,
            classNames: ['singleKanjiOverviewText', 'kunyomi'],
          }, {
            skip: !katakana,
            content: `On: ${katakana}`,
            classNames: ['singleKanjiOverviewText', 'onyomi'],
          },
          ]),
        }, {
          skip: !jlpt,
          content: `JLPT N${jlpt}`,
          classNames: ['singleKanjiOverviewText', 'jlpt'],
        },
        ]),
      }],
    };
  })
);
