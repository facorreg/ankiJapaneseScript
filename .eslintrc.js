const globalNames = [
  /* options */
  'getOptions',
  /* env */
  'KANJI_API_URL',
  'JISHO_URL',
  'JISHO_IMG_URL',
  'SORRY_GIF',
  'videoFormats',
  'audioFormats',
  /* utils */
  'isEmpty',
  'isArray',
  'first',
  'get',
  'filterEmpty',
  'uniq',
  'insertElemAtIndex',
  'getCurrentWord',
  'promiseRemoveHidden',
  /* utils kanji handling */
  'getKanji',
  'hasKanji',
  'stringWithFurigana',
  'hasJapaneseCharacters',
  /* utils fetch */
  'myFetch',
  /* utils formats */
  'findValidFormat',
  'objectListKeysToCamelCase',
  'objectPropEnforceArray',
  /* utils generator */
  'elemGenerator',
  'createQaChildren',
  'createModalChildren', // writable
  /* frontSide */
  'buildWordCard',
  'buildTradCard',
  'swapContent',
  'initFrontCard',
  /* backside */
  /* => kanji page build */
  'buildKanjiPage',
  'buildKanjiData',
  'overviewData',
  'sideBarData',
  'strokesImagesData',
  'examplesData',
  /* => word page build */
  'buildWordPage',
  'buildDictionary',
  'defElemsData',
  'otherFormsData',
  'buildKanjiList',
  'kanjiListData',
  'buildLists',
  'japaneseDataParser',
  'englishDataParser',
  'japaneseDataParser',
  'buildExamples',
  'buildJapaneseExamplesHTML',
  /* => Common generators */
  'buildHeaders',
  'buildCommonPageElements',
  'initBackCard',
  /* Any page build */
  'setFinalDisplay',
];

module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
    // 'no-use-before-define': ['off', { variables: false }],
    'no-use-before-define': ['off', { variables: true }],
  },
  globals: {
    ...globalNames
      .reduce((acc, name) => ({ ...acc, [name]: 'readonly' }), {}),
    createModalChildren: 'writable',
  },
};
