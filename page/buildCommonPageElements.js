const closeCallback = (e) => {
  const modal = document.querySelector('#modal');
  const modalBody = document.querySelector('#modalBody');

  if (e.key === 'Escape' || e.type === 'click') {
    modal.classList.add('hidden');
    modalBody.innerText = '';
  }
};

// eslint-disable-next-line no-unused-vars
const buildCommonPageElements = (word) => (
  createCardChildren([{
    id: 'modal',
    method: 'innerHTML',
    content: `
      <div id="modalDialog">
        <div id="modalContent">
          <div id="modalBody"></div>
        </div>
      </div>
    `,
    classNames: ['hidden'],
    // eventListener: { type: 'click', callback: closeCallback },
    ownChildren: [{
      classNames: ['close'],
      eventListener: { type: 'click', callback: closeCallback },
    }],
    callback: () => document.addEventListener('keyup', closeCallback),
  }, {
    id: 'loader',
    ownChildren: [{
      classNames: ['lds-default'],
      ownChildren: [...Array(12)].map(() => ({})),
    }],
  }, {
    id: 'error',
    classNames: ['hidden'],
    ownChildren: [{
      elem: 'p',
      content: `Oops, it looks like we were unable to fetch data for ${word}`,
    }, {
      elem: 'p',
      content: 'you may have more luck there: (click on the image)',
    }, {
      elem: 'a',
      attributes: {
        href: `${JISHO_URL}${word}`,
        ownChildren: [{
          elem: 'img',
          id: 'jishoPic',
          attributes: {
            src: JISHO_IMG_URL,
            alt: 'jisho',
          },
        }],
      },
    }, {
      elem: 'img',
      attributes: {
        src: SORRY_GIF,
        alt: 'sorry',
      },
    }],
  }])
);
