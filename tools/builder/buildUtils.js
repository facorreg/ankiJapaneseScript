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

const mergeFiles = (path, dest, relativePath = '') => {
  const origin = `${relativePath}${path}`;
  const relativeDest = `${relativePath}${dest}`;
  const pathIsDir = isDir(origin);

  if (pathIsDir) {
    const contentPaths = getFolderContent(origin);
    contentPaths.forEach((cpath) => mergeFiles(`${origin}/${cpath}`, relativeDest));
    return;
  }

  touch(relativeDest);
  mergeFilesBash(origin, relativeDest);
};

const merger = (paths, dest, relativePath) => (
  paths.forEach((path) => mergeFiles(path, dest, relativePath))
);

module.exports = {
  mkdir,
  rmDir,
  addStringToFile,
  eslint,
  mergeFiles,
  merger,
};
