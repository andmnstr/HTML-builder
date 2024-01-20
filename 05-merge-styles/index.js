const fs = require('fs');
const path = require('path');
const input = './05-merge-styles/styles/';
const output = './05-merge-styles/project-dist/';
const type = '.css';
let content = '';
const parameters = [input, output, type, content];

function makeFilesBundle(input, output, fileType, fileContent) {
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
                      () => {
                        console.log(
                          `Content of ${file} was added to bundle${fileType}`,
                        );
                      },
                    );
                  }
                });
              }
            }
          }
        });
      });

      console.log(
        `"bundle${fileType}" was built and inserted to "${output}" directory`,
      );
    }
  });
}

makeFilesBundle(...parameters);
