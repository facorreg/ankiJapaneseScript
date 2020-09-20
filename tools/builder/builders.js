/* eslint-disable no-useless-escape */
const {
  addStringToFile,
  eslint,
  merger,
} = require('./buildUtils');

const createCSSFile = (relativePath) => (paths) => {
  merger(paths, '/build/bundle.css', relativePath);
};

const createEncapsulatedScript = (relativePath) => (paths, type) => {
  const dest = `/build/anki.fetchJapanese.${type}.bundle.js`;
  const destWithPath = `${relativePath}${dest}`;

  addStringToFile('(() => {\n', destWithPath);
  merger(paths, dest, relativePath);
  addStringToFile('})()', destWithPath);
  eslint(`${relativePath}${dest}`);
};

const nth = (size, callback) => [...Array(size)].forEach((_, index) => callback(index));

const createAnkiHTMLfiles = (relativePath) => (types) => {
  types.forEach((type) => {
    const times = type === 'back' ? 1 : 2;
    nth(times, (index) => {
      const isFront = type === 'front';
      const isFlippedCard = index === 1;

      const flipInfo = isFront
        ? `(${isFlippedCard ? 'after' : 'before'} flip)`
        : '';

      const toDisplayStr = isFront
        ? `<span class=\\\"toDisplay hidden\\\">${isFlippedCard ? 'trad' : 'word'}</span>`
        : '';

      const ankiHtmlTemplate = `
        <!-- Put me where the ${type} card's HTML should be ${flipInfo} -->
        <div id=\\\"pageWord\\\" class=\\\"hidden script${type}\\\">{{Word}}</div>
        ${toDisplayStr}
        <script>
          var userOptions = {
            /* your customized options go there */
          };
        </script>
        <script class=\\\"script${type}\\\"src=\\\"anki.fetchJapanese.${type}.bundle.js\\\"></script>
      `
        .split('\n')
        .map((line) => line.trim())
        .filter((e) => e)
        .join('\n');

      addStringToFile(ankiHtmlTemplate, `${relativePath}/build/anki.${type}.${isFlippedCard ? 'reversed.' : ''}html`);
    });
  });
};

module.exports = (relativePath) => ({
  createCSSFile: createCSSFile(relativePath),
  createEncapsulatedScript: createEncapsulatedScript(relativePath),
  createAnkiHTMLfiles: createAnkiHTMLfiles(relativePath),
});
