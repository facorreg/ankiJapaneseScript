// eslint-disable-next-line no-unused-vars
const buildHeaders = () => (
  elemGenerator(document.head)({
    elem: 'link',
    attributes: {
      href: 'https://fonts.googleapis.com/css2?family=Roboto:wght@100&display=swap',
      rel: 'stylesheet',
    },
  }));
