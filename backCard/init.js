/* eslint-disable no-unused-vars */

const init = () => {
  const word = getCurrentWord();
  const isWord = word.length > 1 || !hasKanji(word);
  buildHeaders();
  buildCommonPageElements(word);
  createModalChildren = elemGenerator(document.querySelector('#modalBody'));

  (isWord ? buildWordPage : buildKanjiPage)(word, _options)
    .then((r) => setFinalDisplay(r))
    .catch(() => setFinalDisplay('#error'));
};

init();
