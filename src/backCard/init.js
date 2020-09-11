const init = () => {
  if (document.querySelector('#loader')) return Promise.resolve();
  const word = getCurrentWord();
  const options = typeof userOptions !== 'undefined'
    // eslint-disable-next-line no-undef
    ? { ..._options, ...userOptions }
    : _options;

  const isWord = word.length > 1 || !hasKanji(word) || options.handleAsWord;

  buildHeaders();
  buildCommonPageElements(word);
  createModalChildren = elemGenerator(document.querySelector('#modalBody'));

  return (isWord ? buildWordPage : buildKanjiPage)(word, options)
    .then((r) => setFinalDisplay(r))
    .catch((err) => {
      setFinalDisplay('#error');
      return Promise.reject(err);
    });
};

init();
