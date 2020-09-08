(() => {
// eslint-disable-next-line no-underscore-dangle, no-unused-vars
  const _options = {
    allowRefetch: true,
  };
  /*
  Note: never push an .env file as is
    if your data is meant to be kept secret.
*/

  /* eslint-disable no-unused-vars */
  const videoFormats = ['webm']; // only format working with Anki
  const audioFormats = ['opus', 'aac', 'ogg', 'mp3'];

  const KANJI_API_URL = 'https://profuse-tan-find.glitch.me/';
  // const KANJI_API_URL = 'http://localhost:3000/';

  const JISHO_URL = 'https://jisho.org/search/';
  const JISHO_IMG_URL = 'https://pbs.twimg.com/profile_images/378800000741890744/43702f3379bdb7d0d725b70ae9a5bd59_400x400.png';
  const SORRY_GIF = 'https://thumbs.gfycat.com/AngelicVagueHeifer.webp';
  /* eslint-disable no-unused-vars */

  const elemGenerator = (elemParent) => (elemData) => {
    if ((isEmpty(elemData) && !(elemData instanceof Object)) || elemData.skip) return null;
    if (isArray(elemData)) return elemData.map((data) => elemGenerator(elemParent)(data));

    const {
      elem = 'div',
      method = 'innerText',
      id,
      content,
      classNames,
      eventListener,
      ownChildren,
      appendAtIndex,
      callback,
      elemOnly,
      applyDirectly,
    } = elemData;

    let { attributes = {} } = elemData;

    if (applyDirectly) elemParent.appendChild(applyDirectly);

    const newElem = document.createElement(elem);
    if (method && content) newElem[method] = content;
    if (id) attributes = { ...attributes, id };
    if (attributes) {
      Object.keys(attributes)
        .forEach((key) => newElem.setAttribute(key, attributes[key]));
    }
    if (classNames) {
      classNames
        .filter((className) => className)
        .forEach((className) => newElem.classList.add(className));
    }
    if (eventListener) newElem.addEventListener(eventListener.type, eventListener.callback);
    if (ownChildren) ownChildren.forEach(elemGenerator(newElem));
    if (elemOnly);
    else if (typeof appendAtIndex === 'number') {
      insertElemAtIndex(elemParent, newElem, appendAtIndex);
    } else elemParent.appendChild(newElem);

    if (callback) callback(newElem);

    return newElem;
  };

  const createQaChildren = elemGenerator(document.querySelector('#qa'));
  // eslint-disable-next-line no-unused-vars
  const myFetch = async (args) => {
    const {
      url,
      endpoint = '',
      headers = {},
      args: queryArgs = {},
    } = args;

    const argString = Object
      .keys(queryArgs)
      .map((key, i) => `${!i ? '?' : ''}${key}=${
        !isArray(queryArgs[key])
          ? queryArgs[key]
          : queryArgs[key].join(`&${key}=`)}`)
      .join('&');

    try {
      const response = await fetch(encodeURI(`${url}${endpoint}${argString}`, headers));
      const json = await response.json();
      return json;
    } catch (err) {
      return err;
    }
  };
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

    if (word && !furigana) return buildRuby(word);
    if (!word && furigana) return buildRuby(furigana);
    const reg = new RegExp(escapeRegExp(word).replace(allkanjiRegexAsOne, '(.*)'));
    const matchedFurigana = sliceFirst(furigana.match(reg)) || [];

    const callback = (kanji) => buildRuby(kanji, matchedFurigana.shift());

    return word.replace(allkanjiRegexAsOne, callback);
  };
  // eslint-disable-next-line no-unused-vars
  const getFurigana = async (word) => {
    const wordElem = document.querySelector('#pageWord');

    const args = {
      url: KANJI_API_URL,
      endpoint: 'word/readings',
      args: { word },
    };

    try {
      const readings = await myFetch(args);
      if (isEmpty(readings)) return Promise.resolve();

      wordElem.innerHTML = stringWithFurigana(word, readings[0]);
      wordElem.classList.remove('hidden');
      return Promise.resolve();
    } catch (err) {
      return Promise.reject();
    }
  };
  const init = async () => {
  /* anki fails to refresh the answer otherwise */
    ['#modal', '#loader', '#error', '#error']
      .forEach((id) => {
        const elem = document.querySelector(id);
        if (elem) elem.remove();
      });

    const word = document.querySelector('#pageWord');

    try {
      await getFurigana(word.innerText); // debug
      setFinalDisplay('#pageWord');
    } catch (err) {
      Promise.reject(err);
    }
  };

  init();
})();
