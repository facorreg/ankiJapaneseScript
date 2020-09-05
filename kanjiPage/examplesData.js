// eslint-disable-next-line no-unused-vars
const examplesData = (examples) => ({
  classNames: ['examples'],
  ownChildren: examples
    .map(({ japanese, meaning, audio }) => {
      const audioFormat = findValidFormat(audio, audioFormats);
      const [kanji, furigana] = japanese.replace('）', '').split('（');
      const japaneseExemple = stringWithFurigana(kanji, furigana);

      return {
        classNames: ['example'],
        ownChildren: [{
          method: 'innerHTML',
          content: japaneseExemple,
          classNames: ['japaneseEx'],
        }, {
          content: meaning,
          classNames: ['englishEx'],
        }, {
          skip: !audioFormat,
          elem: 'audio',
          attributes: {
            controls: 'controls',
            src: audio[audioFormat],
          },
        }],
      };
    }),
});
