const extractor = {
  furigana: { reg: /\(([^)]+)\)/ },
  realUse: { reg: /\{([^)]+)\}/ },
  str: {
    reg: /\[[0-9]+\]|\|[0-9]+|~/g,
    keepReplaced: true,
  },
};

const jpParsed = (str) => (
  str.split(' ').map((d) => (
    Object.keys(extractor).reduce((acc, key) => {
      const { reg, keepReplaced } = extractor[key];
      const matched = d.match(reg);
      if (!matched) return acc;

      const replaced = acc.str.replace(matched[0], '');
      return {
        str: replaced,
        obj: { ...acc.obj, [key]: keepReplaced ? replaced : matched[1] },
      };
    }, { str: d, obj: {} })
  )));

// eslint-disable-next-line no-unused-vars
const buildJapaneseExamplesHTML = (jp) => (
  jpParsed(jp).reduce((acc, { str, obj }) => (
    `${acc} ${isEmpty(obj)
      ? str
      : obj.realUse || stringWithFurigana(obj.str || str, obj.furigana)
    }`
  ), ''));
