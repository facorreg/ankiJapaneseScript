// eslint-disable-next-line no-underscore-dangle
const _options = {
  allowRefetch: true,
  handleAsWord: true,
  questionShowFurigana: true,
};

// eslint-disable-next-line no-unused-vars
const getOptions = () => {
  const options = typeof userOptions !== 'undefined'
    // eslint-disable-next-line no-undef
    ? { ..._options, ...userOptions }
    : _options;

  return options;
};
