// eslint-disable-next-line no-unused-vars
const initFrontCard = async () => {
  /* anki fails to refresh the answer otherwise */
  ['#modal', '#loader', '#error']
    .forEach((id) => {
      const elem = document.querySelector(id);
      if (elem) elem.remove();
    });

  const wordElem = document.querySelector('#pageWord');

  const toDisplayElem = document.querySelector('.toDisplay');
  const isTrad = toDisplayElem.innerText === 'trad';
  toDisplayElem.remove();
  const word = wordElem.innerText;

  try {
    await (isTrad ? buildTradCard : buildWordCard)(word, wordElem);
  } catch (err) {
    Promise.reject(err);
  }
};
