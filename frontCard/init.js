const init = async () => {
  /* anki fails to refresh the answer otherwise */
  ['#modal', '#loader', '#error', '#error']
    .forEach((id) => {
      const elem = document.querySelector(id);
      if (elem) elem.remove();
    });

  const word = document.querySelector('#pageWord');

  try {
    await getFurigana(word.innerText); // debug
    setFinalDisplay('#pageWord');
  } catch (err) {
    Promise.reject(err);
  }
};

init();
