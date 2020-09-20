// eslint-disable-next-line no-unused-vars
const buildExamples = async (words) => {
  try {
    const examples = await myFetch({
      url: `${KANJI_API_URL}`,
      endpoint: 'examples',
      args: {
        list: buildLists(words),
        from: 0,
        to: 1,
        maxRetry: 5,
      },
    });

    const defs = document.querySelectorAll('.examplable');

    examples.forEach((example = []) => example.forEach((e) => (
      elemGenerator(defs[e.pos])({
        classNames: ['exampleSentences'],
        ownChildren: [{
          elem: 'span',
          classNames: ['jpEx'],
          method: 'innerHTML',
          content: buildJapaneseExamplesHTML(e.jp),
        }, {
          elem: 'span',
          classNames: ['enEx'],
          content: e.en,
        }],
      })
    )));
    return Promise.resolve();
  } catch (err) {
    return Promise.reject(err);
  }
};
