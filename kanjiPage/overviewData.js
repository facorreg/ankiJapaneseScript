const handleTranslationDisplay = (meaning, shortMeaning, isLongDef = false) => () => {
  // eslint-disable-next-line no-param-reassign
  isLongDef = !isLongDef;

  document
    .querySelector('.translations')
    .innerText = isLongDef ? meaning : shortMeaning;

  const newButtonClass = `arrow-${isLongDef ? 'left' : 'right'}`;
  const removeButtonClass = `arrow-${!isLongDef ? 'left' : 'right'}`;

  const button = document.querySelector(`.${removeButtonClass}`);
  button.classList.remove(removeButtonClass);
  button.classList.add(newButtonClass);
};

// eslint-disable-next-line no-unused-vars
const overviewData = ({
  meaning = '',
  shortMeaning,
  kunyomi = {},
  onyomi = {},
}, jlpt) => ({
  classNames: ['kanjiOverview'],
  ownChildren: [{
    skip: !jlpt,
    content: `JLPT level N${jlpt}`,
    classNames: ['kanjiJlpt', 'overviewText'],
  }, {
    classNames: ['meanings'],
    ownChildren: [{
      classNames: ['translationContainer'],
      ownChildren: [{
        content: shortMeaning || meaning,
        classNames: ['translations', 'overviewText'],
      }, {
        skip: !shortMeaning,
        classNames: ['arrow-right'],
        eventListener: {
          type: 'click',
          callback: handleTranslationDisplay(meaning, shortMeaning),
        },
      }],
    }, {
      content: `Kun: ${kunyomi.hiragana}`,
      classNames: ['kanaReading', 'overviewText'],
    }, {
      content: `On: ${onyomi.katakana}`,
      classNames: ['kanaReading', 'overviewText'],
    }],
  }],
});
