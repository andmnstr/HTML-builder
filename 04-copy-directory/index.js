const fs = require('fs');
const folder = './04-copy-directory/files/';
const copyFolder = './04-copy-directory/files-copy/';

function cleanUpDirectory(path) {
  fs.readdir(path, (err, files) => {
    if (err) {
      console.log(err);
    } else {
      files.forEach((file) => {
        fs.unlink(`${path}${file}`, (err) => {
          if (err) {
            console.log(err);
          } else {
            console.log(`File "${file}" was deleted from "${path}" folder`);
          }
        });
      });
    }
  });
}

function createDirectory(path) {
  fs.access(path, (err) => {
    if (err) {
      fs.mkdir(path, { recursive: false }, () => {
        console.log('Copy of the folder has been created');
      });
    } else {
      console.log('Requested directory is already exist');
    }
  });
}

function copyFiles(dir1, dir2) {
  fs.readdir(dir1, (err, files) => {
    if (err) {
      console.log(err);
    } else {
      files.forEach((file) => {
        fs.cp(`${dir1}${file}`, `${dir2}${file}`, (err) => {
          if (err) {
            console.log(`Error was thrown while copy "${file}" file`);
          } else {
            console.log(`File "${file}" was copied`);
          }
        });
      });
    }
  });
}

function copyDir(dir1, dir2) {
  createDirectory(dir2);
  cleanUpDirectory(dir2);
  copyFiles(dir1, dir2);
}

copyDir(folder, copyFolder);
