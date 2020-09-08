/* eslint-disable no-unused-vars */

const init = () => {
  const word = getCurrentWord();
  const options = typeof userOptions !== 'undefined'
    // eslint-disable-next-line no-undef
    ? { ..._options, ...userOptions }
    : _options;

  const isWord = word.length > 1 || !hasKanji(word) || options.handleAsWord;

  buildHeaders();
  buildCommonPageElements(word);
  createModalChildren = elemGenerator(document.querySelector('#modalBody'));

  (isWord ? buildWordPage : buildKanjiPage)(word, options)
    .then((r) => setFinalDisplay(r))
    .catch((_) => {
      setFinalDisplay('#error');
    });
};

init();
