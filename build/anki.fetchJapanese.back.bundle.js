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
  const closeCallback = (e) => {
    const modal = document.querySelector('#modal');
    const modalBody = document.querySelector('#modalBody');

    if (e.key === 'Escape' || e.type === 'click') {
      modal.classList.add('hidden');
      modalBody.innerText = '';
    }
  };

  // eslint-disable-next-line no-unused-vars
  const buildCommonPageElements = (word) => (
    createQaChildren([{
      id: 'modal',
      method: 'innerHTML',
      content: `
      <div id="modalDialog">
        <div id="modalContent">
          <div id="modalBody"></div>
        </div>
      </div>
    `,
      classNames: ['hidden'],
      // eventListener: { type: 'click', callback: closeCallback },
      ownChildren: [{
        classNames: ['close'],
        eventListener: { type: 'click', callback: closeCallback },
      }],
      callback: () => document.addEventListener('keyup', closeCallback),
    }, {
      id: 'loader',
      ownChildren: [{
        classNames: ['lds-default'],
        ownChildren: [...Array(12)].map(() => ({})),
      }],
    }, {
      id: 'error',
      classNames: ['hidden'],
      ownChildren: [{
        elem: 'p',
        content: `Oops, it looks like we were unable to fetch data for ${word}`,
      }, {
        elem: 'p',
        content: 'You may have more luck there:',
      }, {
        elem: 'a',
        attributes: { href: `${JISHO_URL}${word}` },
        ownChildren: [{
          elem: 'img',
          id: 'jishoPic',
          attributes: {
            src: JISHO_IMG_URL,
            alt: 'jisho',
          },
        }],
      }, {
        elem: 'img',
        attributes: {
          src: SORRY_GIF,
          alt: 'sorry',
        },
      }],
    }])
  );
  // eslint-disable-next-line no-unused-vars
  const buildHeaders = () => (
    elemGenerator(document.head)({
      elem: 'link',
      attributes: {
        href: 'https://fonts.googleapis.com/css2?family=Roboto:wght@100&display=swap',
        rel: 'stylesheet',
      },
    }));
  const buildKanjiData = (word, props = {}) => {
    const { kanji: { kanji, examples = [] } } = word;
    const {
      strokes = {},
      video: videoSources = {},
      jlpt,
      character,
    } = kanji;

    const videoFormat = findValidFormat(videoSources, videoFormats);

    return [{
      classNames: ['hidden', 'answerKanji'],
      ownChildren: [
        overviewData(kanji, jlpt),
        sideBarData(videoSources, videoFormat, strokes.count, character),
        strokesImagesData(strokes.images),
        examplesData(examples),
      ],
      ...props,
    }];
  };

  // eslint-disable-next-line no-unused-vars
  const buildKanjiPage = async (word, options) => {
    try {
      const args = {
        url: KANJI_API_URL,
        endpoint: 'kanji',
        args: { ...options, kanji: word },
      };

      const response = await myFetch(args);
      if (response.words) return buildWordPage(word, options);

      createQaChildren({
        id: 'answer',
        ownChildren: buildKanjiData(response),
      });

      return Promise.resolve('.answerKanji');
    } catch (err) {
      return Promise.reject(err);
    }
  };
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
  const handleTranslationDisplay = (meaning, shortMeaning, isLongDef = false) => () => {
  // eslint-disable-next-line no-param-reassign
    isLongDef = !isLongDef;

    document
      .querySelector('.translations')
      .innerText = isLongDef ? meaning : shortMeaning;

    const newButtonClass = `arrow-${isLongDef ? 'left' : 'right'}`;
    const removeButtonClass = `arrow-${!isLongDef ? 'left' : 'right'}`;

    const button = document.querySelector(`.${removeButtonClass}`);
    button.classList.remove(removeButtonClass);
    button.classList.add(newButtonClass);
  };

  // eslint-disable-next-line no-unused-vars
  const overviewData = ({
    meaning = '',
    shortMeaning,
    kunyomi = {},
    onyomi = {},
  }, jlpt) => ({
    classNames: ['kanjiOverview'],
    ownChildren: [{
      skip: !jlpt,
      content: `JLPT level N${jlpt}`,
      classNames: ['kanjiJlpt', 'overviewText'],
    }, {
      classNames: ['meanings'],
      ownChildren: [{
        classNames: ['translationContainer'],
        ownChildren: [{
          content: shortMeaning || meaning,
          classNames: ['translations', 'overviewText'],
        }, {
          skip: !shortMeaning,
          classNames: ['arrow-right'],
          eventListener: {
            type: 'click',
            callback: handleTranslationDisplay(meaning, shortMeaning),
          },
        }],
      }, {
        content: `Kun: ${kunyomi.hiragana}`,
        classNames: ['kanaReading', 'overviewText'],
      }, {
        content: `On: ${onyomi.katakana}`,
        classNames: ['kanaReading', 'overviewText'],
      }],
    }],
  });
  // eslint-disable-next-line no-unused-vars
  const sideBarData = (videoSources, videoFormat, strokeCount, character) => ({
    classNames: ['sideBar'],
    ownChildren: [{
      classNames: ['kanji'],
      content: character,
    }, {
      skip: !strokeCount,
      content: `Strokes: ${strokeCount}`,
      classNames: ['strokes'],
    }, {
      skip: !videoFormat,
      elem: 'video',
      classNames: ['videoStrokes'],
      attributes: {
        controls: 'controls',
        poster: videoSources.poster,
      },
      ownChildren: [{
        elem: 'source',
        attributes: { src: videoSources[videoFormat] },
      }],
    }],
  });
  // eslint-disable-next-line no-unused-vars
  const strokesImagesData = (images = []) => ({
    skip: isEmpty(images),
    classNames: ['strokeOrderContainer'],
    ownChildren: [{
      classNames: ['strokeOrder'],
      ownChildren: images.map((image) => ({
        elem: 'img',
        attributes: { src: image },
      })),
    }],
  });
  // eslint-disable-next-line no-unused-vars
  const buildWordPage = async (word, options) => {
    try {
      const wordArgs = {
        url: KANJI_API_URL,
        endpoint: 'word',
        args: {
          ...options,
          word,
        },
      };

      const { words, kanjiWithin } = await myFetch(wordArgs);

      createQaChildren({
        id: 'answer',
        ownChildren: [{
          classNames: ['hidden', 'answerWord'],
          ownChildren: [{
            classNames: ['wordDefContainer'],
            ownChildren: words.map((childWord) => {
              const { japanese, senses } = objectPropEnforceArray(childWord, ['japanese', 'senses']);
              const [firstJap, ...rest] = japanese;

              return {
                classNames: ['defElemContainer'],
                ownChildren: [
                  {
                    method: 'innerHTML',
                    content: stringWithFurigana(firstJap.word, firstJap.reading),
                    classNames: ['word'],
                    attributes: { lang: 'jap' },
                  },
                  ...defElemsData(senses),
                  otherFormsData(rest),

                ],
              };
            }),
          }],
        }],
      });

      if (!isEmpty(kanjiWithin)) {
        const kanjiListArgs = {
          url: KANJI_API_URL,
          endpoint: 'kanjiList',
          args: { kanjiArray: kanjiWithin },
        };
        myFetch(kanjiListArgs)
          .then((kanjiData) => elemGenerator(document.querySelector('.answerWord'))({
            elem: 'div',
            classNames: ['kanjiInfoContainer'],
            ownChildren: kanjiListData(kanjiData),
          }));
      }

      return Promise.resolve('.answerWord');
    } catch (err) {
      return Promise.reject(err);
    }
  };
  const parseDefStrings = (sense) => {
    const lower = (arr) => arr.map((e) => e.toLowerCase());
    const callbacks = {
      englishDefinitions: (arr, glue) => arr.join(glue),
      partsOfSpeech: (arr, glue) => lower(arr).join(glue),
      tags: lower,
      info: lower,
    };

    const keys = Object.keys(callbacks);
    const enforcedSenses = objectPropEnforceArray(sense, keys);

    const updatedData = keys.reduce((acc, key) => ({
      ...acc,
      [key]: callbacks[key](enforcedSenses[key], ', '),
    }), {});

    return updatedData;
  };

  // eslint-disable-next-line no-unused-vars
  const defElemsData = (senses) => (
    senses.map((sense, i) => {
      const {
        englishDefinitions,
        partsOfSpeech,
        tags,
        info,
      } = parseDefStrings(sense);

      return {
        classNames: ['defElems'],
        ownChildren: [{
          method: 'innerText',
          content: partsOfSpeech,
          classNames: ['defPart'],
        }, {
          elem: 'span',
          ownChildren: [{
            elem: 'span',
            content: `${i + 1}. `,
          }, {
            elem: 'span',
            content: englishDefinitions,
            classNames: ['def'],
          },
          ...tags.map((str) => ({
            content: str,
            classNames: ['tags'],
          })), {
            elem: 'br',
          },
          ...info.map((str) => ({
            content: str,
            classNames: ['tags'],
          }))],
        }],
      };
    }));
  // eslint-disable-next-line no-unused-vars
  const kanjiListData = (kanjiData) => (
    kanjiData.map((data) => {
      if (isEmpty(data.kanji) || isEmpty(data.kanji.kanji)) {
        return null;
      }

      const { kanji: { kanji } } = data;

      const {
        character,
        kunyomi: { hiragana } = {},
        onyomi: { katakana } = {},
        meaning,
        shortMeaning,
        jlpt,
        strokes = {},
      } = kanji;

      const kanjiOwnProps = {
        classNames: ['answerKanji'],
        callback: () => {
          document.querySelector('#modal').classList.remove('hidden');
        },
      };

      return {
        elem: 'div',
        classNames: ['singleKanjiContainer'],
        ownChildren: [{
          elem: 'div',
          method: 'innerText',
          content: character,
          classNames: ['kanjiSymbolContainer'],
          eventListener: {
            type: 'click',
            callback: () => {
              createModalChildren(buildKanjiData(data, kanjiOwnProps));
            },
          },
          ownChildren: [{
            elem: 'div',
            method: 'innerText',
            content: `strokes: ${strokes.count}`,
            classNames: ['strokes', 'singleKanjiOverviewText'],
          }],
        }, {
          elem: 'div',
          classNames: ['singleKanjiInfoContainer'],
          ownChildren: filterEmpty([{
            classNames: ['flexer'],
            ownChildren: filterEmpty([{
              method: 'innerText',
              content: shortMeaning || meaning,
              classNames: ['singleKanjiOverviewText', 'translation'],
            }, {
              skip: !hiragana,
              content: `Kun: ${hiragana}`,
              classNames: ['singleKanjiOverviewText', 'kunyomi'],
            }, {
              skip: !katakana,
              content: `On: ${katakana}`,
              classNames: ['singleKanjiOverviewText', 'onyomi'],
            },
            ]),
          }, {
            skip: !jlpt,
            content: `JLPT N${jlpt}`,
            classNames: ['singleKanjiOverviewText', 'jlpt'],
          },
          ]),
        }],
      };
    })
  );
  // eslint-disable-next-line no-unused-vars
  const otherFormsData = (words) => ({
    classNames: ['defElems'],
    ownChildren: [{
      skip: isEmpty(words),
      method: 'innerText',
      content: 'other forms',
      classNames: ['defPart', 'otherForms'],
    }, ...words.map(({ word, reading }) => ({
      content: word ? `${word}【${reading}】` : reading,
    })),
    ],
  });
  /* eslint-disable no-unused-vars */

  const init = () => {
    const word = getCurrentWord();
    const options = typeof userOptions !== 'undefined'
    // eslint-disable-next-line no-undef
      ? { ..._options, ...userOptions }
      : _options;

    const isWord = word.length > 1 || !hasKanji(word) || options.handleAsWord;

    buildHeaders();
    buildCommonPageElements(word);
    createModalChildren = elemGenerator(document.querySelector('#modalBody'));

    (isWord ? buildWordPage : buildKanjiPage)(word, options)
      .then((r) => setFinalDisplay(r))
      .catch((_) => {
        setFinalDisplay('#error');
      });
  };

  init();
})();
