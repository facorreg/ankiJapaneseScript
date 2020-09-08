const parseDefStrings = (sense) => {
  const lower = (arr) => arr.map((e) => (e ? e.toLowerCase() : ''));
  const callbacks = {
    englishDefinitions: (arr, glue) => arr.join(glue),
    partsOfSpeech: (arr, glue) => lower(arr).join(glue),
    tags: lower,
    info: lower,
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
        },
        ...tags.map((str) => ({
          content: str,
          classNames: ['tags'],
        })), {
          elem: 'br',
        },
        ...info.map((str) => ({
          content: str,
          classNames: ['tags'],
        }))],
      }],
    };
  }));
