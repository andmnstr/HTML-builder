const fs = require('fs');
const path = './03-files-in-folder/secret-folder/';
const KBYTE_SIZE = 1024;

fs.readdir(path, (err, files) => { 
  if (err) 
    console.log(err); 
  else { 
    files.forEach(file => {
      let fileName = file.slice(0, file.indexOf('.'));
      let extension = file.slice(file.indexOf('.') + 1, file.length);  
      const size = fs.stat(path + file, (err, stats) => {
        let sizeKB = stats.size / KBYTE_SIZE;
        console.log(`${fileName} - ${extension} - ${sizeKB}kb`);
      });
    }) 
  } 
});