let createModalChildren;

(() => {
  const word = getCurrentWord();
  const isWord = word.length > 1 || !hasKanji(word);
  buildHeaders();
  buildCommonPageElements(word);
  // eslint-disable-next-line no-unused-vars
  createModalChildren = elemGenerator(document.querySelector('#modalBody'));

  (isWord ? buildWordPage : buildKanjiPage)(word, rootOptions);
})();
