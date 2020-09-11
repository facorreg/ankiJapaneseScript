/* eslint-disable no-useless-escape */
const {
  addStringToFile,
  eslint,
  merger,
} = require('./buildUtils');

const createCSSFile = (relativePath) => (paths) => {
  merger(paths, `${relativePath}/build/bundle.css`);
};

const createEncapsulatedScript = (relativePath) => (paths) => {
  const dest = `${relativePath}/build/anki.fetchJapanese.bundle.js`;

  addStringToFile('(() => {\n', dest);
  merger(paths, dest);
  addStringToFile('})()', dest);
  eslint(dest);
};

const createAnkiHTMLfiles = (relativePath) => (types) => {
  types.forEach((type) => {
    const ankiHtmlTemplate = `
      <!-- Put me where the ${type} card's HTML should be (before flip) -->
      ${type === 'back' ? `
          {{FrontSide}}
          <hr id=answer>
        ` : ''}
      <div id=\\\"pageWord\\\" class=\\\"hidden\\\">{{Word}}</div>
      <span class=\\\"toDisplay hidden\\\">${type === 'front' ? 'word' : 'trad'}</span>
      <script src=\\\"anki.fetchJapanese.bundle.js\\\"></script>
    `
      .split('\n')
      .map((line) => line.trim())
      .filter((e) => e)
      .join('\n');

    addStringToFile(ankiHtmlTemplate, `${relativePath}/build/anki.${type}.html`);
  });
};

module.exports = (relativePath) => ({
  createCSSFile: createCSSFile(relativePath),
  createEncapsulatedScript: createEncapsulatedScript(relativePath),
  createAnkiHTMLfiles: createAnkiHTMLfiles(relativePath),
});
