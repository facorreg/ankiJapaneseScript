/* eslint-disable no-useless-escape */
const { execSync } = require('child_process');

const exec = (cmd) => execSync(cmd).toString();
const mkdir = (folderName) => exec(`mkdir -p ${folderName}`);
const rmDir = (folderName) => exec(`rm -rf ${folderName}`);
const touch = (filePath) => exec(`touch ${filePath} && chmod 755 ${filePath}`);
const isDir = (path) => exec(`ls -ld ${path}`)[0] === 'd';
const getFolderContent = (folderPath) => exec(`ls -A1 ${folderPath}`).split('\n').filter((e) => e);
const mergeFilesBash = (origin, dest) => exec(`cat ${origin} >> ${dest}`);
const addStringToFile = (str, dest) => exec(`printf "${str}\n" >> ${dest}`);
const eslint = (src) => exec(`npx eslint --fix ${src}`);

const mergeFiles = (origin, dest) => {
  const pathIsDir = isDir(origin);

  if (pathIsDir) {
    const contentPaths = getFolderContent(origin);
    // eslint-disable-next-line no-unused-vars
    contentPaths.forEach((path) => mergeFiles(`${origin}/${path}`, dest));
    return;
  }

  touch(dest);
  mergeFilesBash(origin, dest);
};

const merger = (paths, dest) => (
  // eslint-disable-next-line no-console
  paths.forEach((path) => mergeFiles(path, dest))
);

const testHtmlString = `
<!DOCTYPE html>
<html lang=\\\"en\\\">

<head>
  <meta charset=\\\"UTF-8\\\">
  <meta name=\\\"viewport\\\" content=\\\"width=device-width, initial-scale=1.0\\\">
  <link rel=\\\"stylesheet\\\" type=\\\"text/css\\\" href=\\\"./bundle.css\\\" />
  <title>Document</title>
</head>

<body>
  <div class=\\\"card\\\">
    <div id=\\\"qa\\\">
      <div id=\\\"pageWord\\\" class=\\\"hidden\\\">する</div>
      <!-- <div id=\\\"pageWord\\\" class=\\\"hidden\\\">本</div> -->
      <!-- <div id=\\\"pageWord\\\" class=\\\"hidden\\\">日本人</div> -->
      <!-- <div id=\\\"pageWord\\\" class=\\\"hidden\\\">SFADLFDKALFK</div> -->
    </div>
  </div>
  <script src=\\\"anki.fetchJapanese.back.bundle.js\\\"></script>
</body>

</html>
`;

const buildBundles = async () => {
  await rmDir('build');
  await mkdir('build');

  const paths = {
    front: [
      'options.js',
      'env.js',
      'utils',
      'frontCard/getFurigana.js',
      'frontCard/init.js',
    ],
    back: [
      'options.js',
      'env.js',
      'utils',
      'backCard/page',
      'backCard/kanjiPage',
      'backCard/wordPage',
      'backCard/init.js',
    ],
  };

  const stylePaths = ['style'];
  merger(stylePaths, './build/bundle.css');

  ['front', 'back'].forEach((type) => {
    addStringToFile('(() => {\n', `./build/anki.fetchJapanese.${type}.bundle.js`);
    merger(paths[type], `./build/anki.fetchJapanese.${type}.bundle.js`);
    addStringToFile('})()', `./build/anki.fetchJapanese.${type}.bundle.js`);
    eslint(`./build/anki.fetchJapanese.${type}.bundle.js`);
    merger([`./${type}Card/anki.${type}.html`], `./build/anki.fetchJapanese.${type}.html`);
    addStringToFile(`\n<script src=\\\"anki.fetchJapanese.${type}.bundle.js\\\"></script>`, `./build/anki.fetchJapanese.${type}.html`);
  });

  addStringToFile(testHtmlString, './build/testBuild.html');
  touch('./build/testBuild.html');
};

buildBundles();
