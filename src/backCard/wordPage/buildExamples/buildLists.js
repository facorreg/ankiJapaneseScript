let pos = 0;

// eslint-disable-next-line no-unused-vars
const buildLists = (words) => (
  JSON.stringify(
    words.reduce((mAcc, { japanese, senses }) => [
      ...mAcc,
      ...senses.map((sense) => {
        const exInfo = {
          jpList: japaneseDataParser(senses, japanese),
          enList: englishDataParser(sense),
          pos,
        };
        pos += 1;

        return exInfo;
      }),
    ], []),
  )
);
