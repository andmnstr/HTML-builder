const fs = require('fs');
const path = './03-files-in-folder/secret-folder/';
const KBYTE_SIZE = 1024;

fs.readdir(path, (err, files) => {
  if (err) console.log(err);
  else {
    files.forEach((file) => {
      let fileName = '';
      let extension = '';
      let sizeKB;

      fs.stat(path + file, (err, stats) => {
        if (stats.isFile(file)) {
          fileName = file.slice(0, file.indexOf('.'));

          extension = file.slice(file.indexOf('.') + 1, file.length);

          sizeKB = (stats.size / KBYTE_SIZE).toFixed(3);

          console.log(`${fileName} - ${extension} - ${sizeKB}kb`);
        }
      });
    });
  }
});
