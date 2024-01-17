const fs = require('fs');

fs.readFile('./01-read-file/text.txt', 'utf8', (error, data) => {
  console.log(data);
});
