const fs = require('fs');
const path = require('path');
const folderPath = path.join(`${__dirname}`, 'secret-folder/');
const KBYTE_SIZE = 1024;

fs.readdir(folderPath, (err, files) => {
  if (err) console.log(err);
  else {
    files.forEach((file) => {
      let fileName = '';
      let extension = '';
      let sizeKB;

      fs.stat(folderPath + file, (err, stats) => {
        if (stats.isFile(file)) {
          fileName = file.slice(0, file.indexOf('.'));
          extension = path.extname(file);
          extension = extension.replaceAll('.', '');
          sizeKB = (stats.size / KBYTE_SIZE).toFixed(3);

          console.log(`${fileName} - ${extension} - ${sizeKB}kb`);
        }
      });
    });
  }
});
