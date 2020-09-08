const globalNames = [
  /* options */
  '_options',
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
  'get',
  'filterEmpty',
  'uniq',
  'insertElemAtIndex',
  'getCurrentWord',
  /* utils kanji handling */
  'getKanji',
  'hasKanji',
  'stringWithFurigana',
  /* utils fetch */
  'myFetch',
  /* utils formats */
  'findValidFormat',
  'objectListKeysToCamelCase',
  'objectPropEnforceArray',
  /* frontSide */
  'getFurigana',
  /* utils generator */
  'elemGenerator',
  'createCardChildren',
  'createModalChildren', // writable
  /* Common generators */
  'buildHeaders',
  'buildCommonPageElements',
  /* kanji page build */
  'buildKanjiPage',
  'buildKanjiData',
  'overviewData',
  'sideBarData',
  'strokesImagesData',
  'examplesData',
  /* word page build */
  'buildWordPage',
  'defElemsData',
  'otherFormsData',
  'kanjiListData',
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
