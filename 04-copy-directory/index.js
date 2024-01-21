const fs = require('fs');
const path = require('path');
const folderPath = path.join(`${__dirname}`, 'files/');
const cpFolderPath = path.join(`${__dirname}`, 'files-copy/');

async function createDirectory(path) {
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

async function cleanUpDirectory(path) {
  fs.readdir(path, (err, files) => {
    if (err) {
      console.log('Folder in not exist');
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

async function copyFiles(dir1, dir2) {
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

async function copyDir(dir1, dir2) {
  await createDirectory(dir2);
  await cleanUpDirectory(dir2);
  await copyFiles(dir1, dir2);
}

copyDir(folderPath, cpFolderPath);
