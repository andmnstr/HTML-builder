const fs = require('fs');
const path = require('path');
const directory = path.join(__dirname, 'project-dist/');
const assetsInput = path.join(__dirname, 'assets/');
const assetsOutput = path.join(__dirname, 'project-dist/assets');
const styleInput = path.join(__dirname, 'styles/');
const styleOutput = path.join(__dirname, 'project-dist/');
const styleType = '.css';
let styleContent = '';
const styleArgs = [styleInput, styleOutput, styleType, styleContent];

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

function cleanUpDirectory(directory) {
  fs.readdir(directory, (err, files) => {
    if (err) {
      console.log('Directory is not exist');
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

function copyFiles(dir1, dir2) {
  createDirectory(assetsOutput);

  fs.readdir(dir1, (err, files) => {
    if (err) {
      console.log(err);
    } else {
      files.forEach((file) => {
        let filePath = dir1 + file;

        fs.readdir(filePath, (err, files) => {
          if (err) {
            console.log(err);
          } else {
            files.forEach((subFile) => {
              let folder = dir1 + file + '/' + subFile;
              let cpFolder = dir2 + '/' + file + '/' + subFile;

              fs.cp(folder, cpFolder, (err) => {
                if (err) {
                  console.log(
                    `Error was thrown while copy "${file}" file`,
                    err,
                  );
                } else {
                  console.log(`File "${file}" was copied`);
                }
              });
            });
          }
        });
      });
    }
  });
}

function buildStyleBundle(input, output, type, content) {
  /*-----Initialize 'bundle.css' file before building-----*/
  fs.writeFile(`${output}style${type}`, content, () => {
    console.log(`style${type} file was initializing`);
  });

  /*-----Building 'bundle.css' file after initializing-----*/
  fs.readdir(input, (err, files) => {
    if (err) {
      console.log(err);
    } else {
      files.forEach((file) => {
        let filePath = input + file;
        fs.stat(filePath, (err, stats) => {
          if (err) {
            console.log(err);
          } else {
            if (stats.isFile(file)) {
              if (path.extname(filePath) === type) {
                fs.readFile(filePath, 'utf-8', (err, data) => {
                  if (err) {
                    console.log(err);
                  } else {
                    content += data + '\n';
                    fs.writeFile(`${output}style${type}`, content, () => {
                      console.log(
                        `Content of ${file} was added to style${type}`,
                      );
                    });
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

const create = createDirectory(directory);
const clean = cleanUpDirectory(directory);
const cpAssets = copyFiles(assetsInput, assetsOutput);
const styleBundle = buildStyleBundle(...styleArgs);

async function makeBuild() {
  create;
  clean;
  cpAssets;
  styleBundle;
}

makeBuild();
