/* eslint-disable no-unused-vars */
const setFinalDisplay = (toDisplay) => {
  const loader = document.querySelector('#loader');
  const elemToDisplay = document.querySelector(toDisplay);

  if (loader !== null) {
    loader.classList.add('hidden');
  }
  elemToDisplay.classList.remove('hidden');
};

const getCurrentWord = () => document.querySelector('#pageWord').textContent;

const get = (object, path, defaultVal = '') => {
  const isLastPath = !path.includes('.');

  if (isLastPath) {
    return isObject(object) ? object[path] || defaultVal : defaultVal;
  }

  const nextLayer = path.slice(0, path.indexOf('.'));
  const { [nextLayer]: nextObject } = object;
  const remainingLayers = path.slice(path.indexOf('.') + 1);

  return typeof nextObject !== 'undefined'
    ? get(nextObject, remainingLayers, defaultVal)
    : defaultVal;
};

const uniq = (array) => array.filter((value, index) => array.indexOf(value) === index);

const isObject = (object) => typeof object === 'object' && object !== null;

const isArray = (obj) => Array.isArray(obj);

const isEmpty = (obj) => {
  if (typeof obj !== 'object' && obj) return false;

  if (
    obj === null
    || obj === undefined
    || obj === ''
    || (isArray(obj) && !obj.length)
  ) return true;

  return (
    typeof obj === 'object'
    && !Object.getOwnPropertyNames(obj).length
  );
};

const filterEmpty = (array) => array.filter((e) => !isEmpty(e));

const sliceFirst = (array) => (!isEmpty(array) ? array.slice(1) : array);

const findValidFormat = (sources, formats) => (
  Object.keys(sources).find((key) => formats.includes(key))
);

const objectPropEnforceArray = (object, keys) => ({
  ...object,
  ...keys.reduce((acc, key) => ({
    ...acc,
    [key]: isArray(object[key]) ? object[key] : [],
  }), {}),
});

const snakeCaseToCamelCase = (str) => (
  str
    .split('_')
    .map((keyPart, i) => (
      i > 0
        ? `${keyPart.charAt(0).toUpperCase()}${keyPart.slice(1)}`
        : keyPart))
    .join('')
);

const recursHandler = (object) => {
  if (!isObject(object)) return object;
  if (object.length) return objectListKeysToCamelCase(object);

  return objectKeysToCamelCase(object);
};

const objectKeysToCamelCase = (object) => (
  isObject(object)
    ? Object.keys(object)
      .reduce((accumulator, key) => ({
        ...accumulator,
        [snakeCaseToCamelCase(key)]: recursHandler(object[key]),
      }), {})
    : object
);

const objectListKeysToCamelCase = (objectList) => (
  objectList.map((object) => objectKeysToCamelCase(object))
);

const insertElemAtIndex = (parent, child, index = 0) => {
  if (index >= parent.children.length) {
    parent.appendChild(child);
  } else {
    parent.insertBefore(child, parent.children[index]);
  }
};

const kanjiRegex = /[一-龯]/;
const allkanjiRegex = /[一-龯]/g;
const allkanjiRegexAsOne = /[一-龯]+/g;

const getKanji = (string, greed = false) => string.match(greed ? allkanjiRegex : kanjiRegex);
const hasKanji = (string) => Boolean(getKanji(string));

/*
  not used yet.
  I need to see how Jisho handles its data first.
*/

const escapeRegExp = (string) => (
  string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') // $& means the whole matched string
);

const stringWithFurigana = (word, furigana) => {
  const buildRuby = (w, f = '') => `<ruby>${w}<rt>${f}</rt></ruby>`;
  let htmlData = '';

  if (word && !furigana) return buildRuby(word);
  if (!word && furigana) return buildRuby(furigana);
  if (word && furigana) {
    const reg = new RegExp(escapeRegExp(word).replace(allkanjiRegexAsOne, '(.*)'));
    const matchedKanji = sliceFirst(word.match(reg)) || [];
    const matchedFurigana = sliceFirst(furigana.match(reg)) || [];

    htmlData = word;

    matchedKanji
      .forEach((kanji, i) => {
        htmlData = htmlData.replace(kanji, buildRuby(kanji, matchedFurigana[i]));
      });
  }

  return htmlData;
};
