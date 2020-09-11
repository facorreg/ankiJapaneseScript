// eslint-disable-next-line no-unused-vars
const swapContent = (array, elem) => {
  let index = 0;

  const callback = (e) => {
    if (e.key !== 'ArrowUp' && e.key !== 'ArrowDown') return;
    // eslint-disable-next-line no-nested-ternary
    index = e.key === 'ArrowUp'
      ? (index + 1 === array.length - 1 ? index + 1 : 0)
      : (index ? index - 1 : array.length - 1);
    // eslint-disable-next-line no-param-reassign
    elem.innerHTML = array[index];
  };

  document.addEventListener('keyup', callback);
};
