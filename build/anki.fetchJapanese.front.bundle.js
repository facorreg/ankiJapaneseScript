(() => {
// eslint-disable-next-line no-underscore-dangle
  const _options = {
    allowRefetch: true,
    handleAsWord: true,
    questionShowFurigana: true,
  };

  // eslint-disable-next-line no-unused-vars
  const getOptions = () => {
    const options = typeof userOptions !== 'undefined'
    // eslint-disable-next-line no-undef
      ? { ..._options, ...userOptions }
      : _options;

    return options;
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

  const first = (array) => (!isEmpty(array) ? array.slice(0, 1) : array);
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

  const kanjiRegex = /[一-龯]|\u3005/;
  const allkanjiRegex = /[一-龯]|\u3005/g;
  const allkanjiRegexAsOne = /([一-龯]|\u3005)+/g;

  const getKanji = (string, greed = false) => string.match(greed ? allkanjiRegex : kanjiRegex);
  const hasKanji = (string) => Boolean(getKanji(string));
  const isKanji = (string) => hasKanji(string) && string.length === 1;

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
  // eslint-disable-next-line no-unused-vars
  const swapContent = (array, elem) => {
    let index = 0;

    const callback = (e) => {
      if (e.key !== 'ArrowUp' && e.key !== 'ArrowDown') return;
      // eslint-disable-next-line no-nested-ternary
      index = e.key === 'ArrowDown'
        ? (index + 1 < array.length ? index + 1 : 0)
        : (index ? index - 1 : array.length - 1);
      // eslint-disable-next-line no-param-reassign
      elem.innerHTML = array[index];
    };

    document.addEventListener('keyup', callback);
  };
  // eslint-disable-next-line no-unused-vars
  const buildTradCard = async (word, wordElem) => {
    try {
      const traductions = await myFetch({
        url: KANJI_API_URL,
        endpoint: '/word/traductions',
        args: { word },
      });

      if (isEmpty(traductions)) return promiseRemoveHidden(wordElem);

      wordElem.remove();

      const trad = createQaChildren({
        id: 'trad',
        content: first(traductions),
      });

      swapContent(traductions, trad);
      return Promise.resolve();
    } catch (err) {
      return promiseRemoveHidden(wordElem, err);
    }
  };
  // eslint-disable-next-line no-unused-vars
  const buildWordCard = async (word, wordElem, options) => {
    if (!options.questionShowFurigana || !hasKanji(word)) {
      return promiseRemoveHidden(wordElem);
    }

    const args = {
      url: KANJI_API_URL,
      endpoint: 'word/readings',
      args: { word },
    };

    try {
      const readings = await myFetch(args);
      if (isEmpty(readings)) return promiseRemoveHidden(wordElem);

      const withFurigana = readings.map((reading) => stringWithFurigana(word, reading));
      // eslint-disable-next-line no-param-reassign
      wordElem.innerHTML = first(withFurigana);
      swapContent(withFurigana, wordElem);

      setFinalDisplay('#pageWord');
      return promiseRemoveHidden(wordElem);
    } catch (err) {
      return promiseRemoveHidden(wordElem, err);
    }
  };
  const init = async () => {
    ['#modal', '#loader', '#error']
      .forEach((id) => {
        const elem = document.querySelector(id);
        if (elem) elem.remove();
      });

    const options = getOptions();
    const wordElem = document.querySelector('#pageWord');

    const toDisplayElem = document.querySelector('.toDisplay');
    const isTrad = toDisplayElem.innerText === 'trad';
    toDisplayElem.remove();
    const word = wordElem.innerText;

    try {
      return (isTrad ? buildTradCard : buildWordCard)(word, wordElem, options);
    } catch (err) {
      return Promise.reject(err);
    }
  };

  init();
})();
