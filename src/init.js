const init = () => (
  !document.querySelector('#answer')
    ? initFrontCard()
    : initBackCard()
);

init();
