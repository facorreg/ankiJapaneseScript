// eslint-disable-next-line no-unused-vars
const setFinalDisplay = (toDisplay) => {
  const loader = document.querySelector('#loader');
  const elemToDisplay = document.querySelector(toDisplay);

  loader.classList.add('hidden');
  elemToDisplay.classList.remove('hidden');
};
