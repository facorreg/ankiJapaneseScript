/* eslint-disable no-useless-escape */
const relativePath = process.argv[2] || '../../';
const { mkdir, rmDir } = require('./buildUtils');
const {
  createCSSFile,
  createEncapsulatedScript,
  createAnkiHTMLfiles,
} = require('./builders')(relativePath);

const jsPaths = [
  /* utils */
  `${relativePath}src/options.js`,
  `${relativePath}src/env.js`,
  `${relativePath}src/utils`,
  /* front cards */
  `${relativePath}src/frontCard/swapContent.js`,
  `${relativePath}src/frontCard/tradCard`,
  `${relativePath}src/frontCard/wordCard`,
  `${relativePath}src/frontCard/init.js`,
  /* back cards */
  `${relativePath}src/backCard/page`,
  `${relativePath}src/backCard/kanjiPage`,
  `${relativePath}src/backCard/wordPage`,
  `${relativePath}src/backCard/init.js`,
  /* init */
  `${relativePath}src/init.js`,
];

const stylePaths = [`${relativePath}style`];
const buildPath = `${relativePath}build`;

const buildBundles = async () => {
  await rmDir(buildPath);
  await mkdir(buildPath);

  createCSSFile(stylePaths);
  createEncapsulatedScript(jsPaths);
  createAnkiHTMLfiles(['front', 'back']);
};

buildBundles();
