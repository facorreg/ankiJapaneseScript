/* eslint-disable no-unused-vars */

let createModalChildren;
let buildPromise;

(() => {
  const word = getCurrentWord();
  const isWord = word.length > 1 || !hasKanji(word);
  buildHeaders();
  buildCommonPageElements(word);
  createModalChildren = elemGenerator(document.querySelector('#modalBody'));

  buildPromise = (isWord ? buildWordPage : buildKanjiPage)(word, rootOptions)
    .then((r) => setFinalDisplay(r))
    .catch(() => setFinalDisplay('#error'));
})();
