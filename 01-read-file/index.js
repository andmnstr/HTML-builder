const fs = require('fs');
const path = require('path');
const filePath = path.join(`${__dirname}`, 'text.txt');

const readFile = new fs.ReadStream(filePath, { encoding: 'utf-8' });

readFile.on('readable', () => {
  let data = readFile.read();
  console.log(data);
});

readFile.on('end', () => {
  readFile.close();
});

readFile.on('error', (err) => {
  console.log(`In process of reading was thrown an error: ${err}`);
});
