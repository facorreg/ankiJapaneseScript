const parseDefStrings = (sense) => {
  const strJoin = (array, glue) => array.join(glue);
  const joinAndLower = (array, glue) => array.join(glue).toLowerCase();
  const callbacks = {
    englishDefinitions: strJoin,
    partsOfSpeech: joinAndLower,
    tags: joinAndLower,
    info: joinAndLower,
  };

  const keys = Object.keys(callbacks);
  const enforcedSenses = objectPropEnforceArray(sense, keys);

  const updatedData = keys.reduce((acc, key) => ({
    ...acc,
    [key]: callbacks[key](enforcedSenses[key], ', '),
  }), {});

  return updatedData;
};

// eslint-disable-next-line no-unused-vars
const defElemsData = (senses) => (
  senses.map((sense, i) => {
    const {
      englishDefinitions,
      partsOfSpeech,
      tags,
      info,
    } = parseDefStrings(sense);

    return {
      classNames: ['defElems'],
      ownChildren: [{
        method: 'innerText',
        content: partsOfSpeech,
        classNames: ['defPart'],
      }, {
        elem: 'span',
        ownChildren: [{
          elem: 'span',
          content: `${i + 1}. `,
        }, {
          elem: 'span',
          content: englishDefinitions,
          classNames: ['def'],
        }, {
          skip: isEmpty(tags),
          content: `${tags} ${info}`,
          classNames: ['tags'],
        }],
      }],
    };
  })
);
