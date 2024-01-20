const fs = require('fs');
const path = require('path');
const directory = './06-build-page/project-dist/';
const assetsInput = './06-build-page/assets/';
const assetsOutput = './06-build-page/project-dist/assets';
const styleInput = './06-build-page/styles/';
const styleOutput = './06-build-page/project-dist/';
const styleType = '.css';
let styleContent = '';
const styleArgs = [styleInput, styleOutput, styleType, styleContent];

function cleanUpDirectory(directory) {
  fs.readdir(directory, (err, files) => {
    if (err) {
      console.log(err);
    } else {
      files.forEach((file) => {
        fs.stat(`${directory}${file}`, (err, stat) => {
          if (stat.isFile(file)) {
            fs.unlink(`${directory}${file}`, (err) => {
              if (err) {
                console.log(err);
              } else {
                console.log(
                  `File "${file}" was deleted from "${directory}" folder`,
                );
              }
            });
          }
        });
      });
    }
  });
}

function createDirectory(directory) {
  fs.access(directory, (err) => {
    if (err) {
      fs.mkdir(directory, { recursive: false }, () => {
        console.log('Copy of the folder has been created');
      });
    } else {
      console.log('Requested directory is already exist');
    }
  });
}

function copyFiles(dir1, dir2) {
  createDirectory(assetsOutput);

  fs.readdir(dir1, (err, files) => {
    if (err) {
      console.log(err);
    } else {
      files.forEach((file) => {
        fs.readdir(dir1 + file, (err, files) => {
          if (err) {
            console.log(err);
          } else {
            files.forEach((subFile) => {
              fs.cp(
                `${dir1}${file}/${subFile}`,
                `${dir2}/${file}/${subFile}`,
                (err) => {
                  if (err) {
                    console.log(
                      `Error was thrown while copy "${file}" file`,
                      err,
                    );
                  } else {
                    console.log(`File "${file}" was copied`);
                  }
                },
              );
            });
          }
        });
      });
    }
  });
}

function buildStyleBundle(input, output, fileType, fileContent) {
  fs.readdir(input, (err, files) => {
    if (err) {
      console.log(err);
    } else {
      files.forEach((file) => {
        fs.stat(`${input}${file}`, (err, stats) => {
          if (err) {
            console.log(err);
          } else {
            if (stats.isFile(file)) {
              if (path.extname(`${input}${file}`) === fileType) {
                fs.readFile(`${input}${file}`, 'utf-8', (err, data) => {
                  if (err) {
                    console.log(err);
                  } else {
                    fileContent += data + '\n';
                    fs.writeFile(
                      `${output}bundle${fileType}`,
                      fileContent,
                      () => {},
                    );
                  }
                });
              }
            }
          }
        });
      });
    }
  });
}

createDirectory(directory);
cleanUpDirectory(directory);
copyFiles(assetsInput, assetsOutput);
buildStyleBundle(...styleArgs);
