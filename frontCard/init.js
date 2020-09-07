(async () => {
  const answer = document.querySelector('.answerKanji')
    || document.querySelector('.answerWord');
  const word = document.querySelector('#pageWord');

  try {
    await getFurigana(word.innerText); // debug
    if (!isEmpty(answer)) answer.classList.add('hidden');
    setFinalDisplay('#pageWord');
  } catch (err) {
    // setFinalDisplay('#error');
    Promise.reject(err);
  }
})();
