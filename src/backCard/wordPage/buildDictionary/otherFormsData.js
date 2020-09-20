// eslint-disable-next-line no-unused-vars
const otherFormsData = (words) => ({
  classNames: ['defElems'],
  ownChildren: [{
    skip: isEmpty(words),
    method: 'innerText',
    content: 'other forms',
    classNames: ['defPart', 'otherForms'],
  }, ...words.map(({ word, reading }) => ({
    content: word ? `${word}【${reading}】` : reading,
  })),
  ],
});
