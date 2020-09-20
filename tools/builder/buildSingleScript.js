/* eslint-disable no-useless-escape */
const relativePath = process.argv[2] || '../../';
const { mkdir, rmDir } = require('./buildUtils');
const {
  createCSSFile,
  createEncapsulatedScript,
  createAnkiHTMLfiles,
} = require('./builders')(relativePath);

const commonJsPaths = [
  /* utils */
  'src/options.js',
  'src/env.js',
  'src/utils',
  'src/commonScripts',
];

const jsPaths = {
  front: [
    /* front cards */
    'src/frontCard/swapContent.js',
    'src/frontCard/tradCard',
    'src/frontCard/wordCard',
    'src/frontCard/init.js',
  ],
  back: [
    /* back cards */
    'src/backCard/commonBack',
    'src/backCard/wordPage/buildWordPage.js',
    'src/backCard/wordPage/buildDictionary',
    'src/backCard/wordPage/buildKanji',
    'src/backCard/wordPage/buildExamples',
    'src/backCard/kanjiPage',
    'src/backCard/init.js',
  ],
};

const stylePaths = ['style'];
const buildPath = 'build';

const buildBundles = async () => {
  await rmDir(buildPath);
  await mkdir(buildPath);

  createCSSFile(stylePaths);
  Object.keys(jsPaths)
    .forEach((key) => createEncapsulatedScript([...commonJsPaths, ...jsPaths[key]], key));
  createAnkiHTMLfiles(['front', 'back']);
};

buildBundles();
