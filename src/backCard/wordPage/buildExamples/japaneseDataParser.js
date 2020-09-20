const getTags = ((senses) => (
  senses.map((sense) => {
    const { tags, info } = objectPropEnforceArray(sense, ['tags', 'info']);

    const updatedTags = tags.filter((t) => (
      t !== 'Usually written using kana alone'
      && t !== 'Colloquialism'
      && t !== 'Slang'
    ));
    return [...updatedTags, ...info];
  })));

// eslint-disable-next-line no-unused-vars
const japaneseDataParser = (senses, japanese) => {
  const allTags = getTags(senses);
  const jpList = [
    ...new Set(
      filterEmpty(
        japanese.reduce((acc, { word: jword, reading }) => (
          [...acc, jword || reading]
        ), []),
      ),
    )];

  return jpList.map((jp, index) => {
    const currTags = (
      allTags[index] || [])
      .filter((e) => hasJapaneseCharacters(e))
      .map((e) => {
        const newStr = e.replace(/as|〜|\s|([A-Z](.*)[A-Z])/g, '').replace(',', '|');
        return newStr ? `(${newStr})` : '';
      })
      .filter((e) => e)
      .join('|');

    return filterEmpty([jp, currTags]).join('|');
  });
};
