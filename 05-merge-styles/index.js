const fs = require('fs');
const path = require('path');
const input = path.join(__dirname, 'styles/');
const output = path.join(__dirname, 'project-dist/');
const type = '.css';
let data = '';
const parameters = [input, output, type, data];

function makeFilesBundle(input, output, type, content) {
  /*-----Initialize 'bundle.css' file before building-----*/
  fs.writeFile(`${output}bundle${type}`, content, () => {
    console.log(`${output}bundle${type} file was initializing`);
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
                    fs.writeFile(`${output}bundle${type}`, content, () => {
                      console.log(
                        `Content of ${file} was added to bundle${type}`,
                      );
                    });
                  }
                });
              }
            }
          }
        });
      });

      console.log(
        `"bundle${type}" was built and inserted to "${output}" directory`,
      );
    }
  });
}

makeFilesBundle(...parameters);
