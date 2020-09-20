const parenthesize = (str) => (str ? `(${str})` : '');

// eslint-disable-next-line no-unused-vars
const englishDataParser = ({ englishDefinitions }) => (
  englishDefinitions.map((str) => {
    const matched = get(str.match(/\((.*)\)/), '1', '')
      .replace(/e\.g\./)
      .split(',')
      .filter((m) => (
        !isEmpty(m)
        && !m.includes('applies to nouns noted in this dictionary with the part of speech "vs"')
        && !m.includes('etc')
        && !m.match(/(after|before).*(pre|su)fixed.*/)
      ))
      .join('|');

    const aToZ = get(str.match(/[A-Z]\s(.*)\s[A-Z]/), '1', '').trim();

    return filterEmpty([
      str.replace(/(\(.*\)|([A-Z]\s.*\s[A-Z]))/, ''),
      parenthesize(matched),
      parenthesize(aToZ),
    ]).join('|');
  }));
