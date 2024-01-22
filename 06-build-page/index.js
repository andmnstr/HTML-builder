const fs = require('fs');
const fsPromises = require('fs/promises')
const path = require('path');
const dirPath = path.join(__dirname, 'project-dist/');
const assetsInPath = path.join(__dirname, 'assets/');
const assetsOutPath = path.join(__dirname, 'project-dist/assets');
const styleInPath = path.join(__dirname, 'styles/');
const styleOutPath = path.join(__dirname, 'project-dist/');
const componentsPath = path.join(__dirname, 'components/');
const styleType = '.css';
let styleContent = '';
const styleArgs = [styleInPath, styleOutPath, styleType, styleContent];
let componentsArr = [];
let htmlText = '';

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

  function unlinkFile(files) {
    files.forEach((file) => {
      let filePath = directory + file ;
      fs.stat(filePath, (err, stat) => {
        if (stat.isFile(file)) {
          fs.unlink(filePath, (err) => {
            if (err) console.log(err);
            console.log(
                `File "${file}" was deleted from "${directory}" folder`,
              );
          });
        }
      });
    });
  }

  fs.readdir(directory, (err, files) => {
    if (err) {
      console.log('Directory is not exist');
    }
  });
}

function buildHtml() {
  const readStream = fs.createReadStream(path.join(__dirname, 'template.html'), 'utf-8');
  let text = '';

  function getComponentElement(el) {
    return `{{${el}}}`;
  }

  readStream.on('data', data => {
    text += data.toString();

    fs.readdir(componentsPath, (err, data) => {
      let result = [];

      if (err) console.log('Cannot access to components folder');
      data.forEach(res => {
        const component = res.match(/([\w]*\.)*/)[0].replace('.', '');
        result.push(getComponentElement(component)); 
        componentsArr.push(res);
      });

      fs.readFile(path.join(__dirname, 'template.html'), 'utf-8', (err, data) => {
        htmlText = data;
      });

      for (let item = 0; item < result.length; item++) {
        let componentContent = [];

        fsPromises.readFile(componentsPath + componentsArr[item], 'utf-8')
        .then(data => {
          componentContent.push(data);
        })
        .then(() => {
          htmlText = htmlText.replace(result[item], componentContent).replaceAll('\n','');
        })
        .then(() => {
          fs.writeFile(path.join(dirPath, 'index.html'), htmlText, (err,data) => {
            console.log();
          });
        });
      }
    });
  });

  readStream.on('end', () => {
    readStream.close();
  });
}

function copyFiles(dir1, dir2) {
  createDirectory(assetsOutPath);

  fs.readdir(dir1, (err, files) => {
    if (err) console.log(err);
    files.forEach((file) => {
      let filePath = dir1 + file;

      fs.readdir(filePath, (err, files) => {
        if (err) console.log(err);
        files.forEach((subFile) => {
          let folder = dir1 + file + '/' + subFile;
          let cpFolder = dir2 + '/' + file + '/' + subFile;

        fs.cp(folder, cpFolder, (err) => {
          if (err) console.log(`Error was thrown while copy "${file}" file`);
          console.log(`File "${file}" was copied`);
          });
        });
      });
    });
  });
}

function buildStyleBundle(input, output, type, content) {
  /*-----Initialize 'bundle.css' file before building-----*/
  fs.writeFile(`${output}style${type}`, content, () => {
    console.log(`style${type} file was initializing`);
  });

  /*-----Building 'bundle.css' file after initializing-----*/
  fs.readdir(input, (err, files) => {
    if (err) console.log(err);
    files.forEach((file) => {
      let filePath = input + file;
      fs.stat(filePath, (err, stats) => {
        if (err) console.log(err);
        if (stats.isFile(file)) {
          if (path.extname(filePath) === type) {
            fs.readFile(filePath, 'utf-8', (err, data) => {
              if (err) console.log(err);
              content += data + '\n';
              fs.writeFile(`${output}style${type}`, content, () => {
                console.log(
                  `Content of ${file} was added to style${type}`,
                );
              });
            });
          }
        }
      });
    });
  });
}

async function makeBuild() {
  await createDirectory(dirPath);
  await cleanUpDirectory(dirPath);
  await copyFiles(assetsInPath, assetsOutPath);
  await buildStyleBundle(...styleArgs);
  await buildHtml();
}

makeBuild();
