// eslint-disable-next-line no-unused-vars
const buildDictionary = (words) => (
  createQaChildren({
    id: '_answer',
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
  })
);
