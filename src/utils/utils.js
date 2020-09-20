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

const first = (array) => (!isEmpty(array) ? array.slice(0, 1) : array);
const sliceFirst = (array) => (!isEmpty(array) ? array.slice(1) : array);

const findValidFormat = (sources, formats) => (
  Object.keys(sources).find((key) => formats.includes(key))
);

const isNaN = (valeur) => Number.isNaN(Number(valeur));

const get = (object, path, defaultVal = '') => {
  const isLastPath = !path.includes('.');
  if (isEmpty(object)) return defaultVal;
  if (isLastPath) {
    return isObject(object) ? object[path] || defaultVal : defaultVal;
  }

  const nextLayer = path.slice(0, path.indexOf('.'));

  const handleArray = (arr, index) => (isNaN(index) ? null : arr[index]);

  const handleObj = (obj) => {
    const { [nextLayer]: nextObject } = obj;
    return nextObject;
  };

  const nextObject = isArray(object)
    ? handleArray(object, Number(nextLayer))
    : handleObj(object);

  // console.log(isArray(object), nextObject, nextLayer);

  const remainingLayers = path.slice(path.indexOf('.') + 1);

  return !isEmpty(nextObject)
    ? get(nextObject, remainingLayers, defaultVal)
    : defaultVal;
};

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

const kanjiRegex = /[一-龯]|\u3005/;
const allkanjiRegex = /[一-龯]|\u3005/g;
const allkanjiRegexAsOne = /([一-龯]|\u3005)+/g;

const getKanji = (string, greed = false) => string.match(greed ? allkanjiRegex : kanjiRegex);
const hasKanji = (string) => Boolean(getKanji(string));
const isKanji = (string) => hasKanji(string) && string.length === 1;
const hasJapaneseCharacters = (str) => Boolean(str.match(/[\u3000-\u303F]|[\u3040-\u309F]|[\u30A0-\u30FF]|[\uFF00-\uFFEF]|[\u4E00-\u9FAF]|[\u2605-\u2606]|[\u2190-\u2195]|\u203B/g));
const escapeRegExp = (string) => (
  string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') // $& means the whole matched string
);

const stringWithFurigana = (word, furigana) => {
  const buildRuby = (w, f = '') => `<ruby>${w}<rt>${f}</rt></ruby>`;

  if (word && !furigana) return buildRuby(word);
  if (!word && furigana) return buildRuby(furigana);
  const regWord = word.startsWith('*') ? sliceFirst(word) : word;
  const reg = new RegExp(escapeRegExp(regWord).replace(allkanjiRegexAsOne, '(.*)'));
  const matchedFurigana = sliceFirst(furigana.match(reg)) || [];

  const callback = (kanji) => buildRuby(kanji, matchedFurigana.shift());

  return word.replace(allkanjiRegexAsOne, callback);
};

const promiseRemoveHidden = (elem, err) => {
  elem.classList.remove('hidden');
  return Promise[err ? 'resolve' : 'reject'](err || '');
};
