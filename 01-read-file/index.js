const fs = require('fs');

fs.readFile('./01-read-file/text.txt', 'utf8', (error, data) => {
  if (error) {
    console.log(error);
  } else {
    console.log(data);
  }
});
