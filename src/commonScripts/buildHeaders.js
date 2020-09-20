// eslint-disable-next-line no-unused-vars
const buildHeaders = () => (
  !document.querySelector('#Roboto')
    ? elemGenerator(document.head)({
      elem: 'link',
      id: 'Roboto',
      attributes: {
        href: 'https://fonts.googleapis.com/css2?family=Roboto:wght@100&display=swap',
        rel: 'stylesheet',
      },
    })
    : null
);
