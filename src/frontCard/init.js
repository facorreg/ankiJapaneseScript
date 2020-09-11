const init = async () => {
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
    return (isTrad ? buildTradCard : buildWordCard)(word, wordElem);
  } catch (err) {
    return Promise.reject(err);
  }
};

init();
