const readline = require('readline');
const fs = require('fs');
const path = require('path');
const filePath = path.join(`${__dirname}`, 'text.txt');
const rl = readline.createInterface(process.stdin, process.stdout);
const writeFile = new fs.WriteStream(filePath, { encoding: 'utf-8' });
let inputText = '';

function writeFileContent(content) {
  writeFile.on('open', () => {
    rl.setPrompt('Hello! Please, enter a text.\n');
    rl.prompt();
    rl.on('line', (text) => {
      content += text + ' ';
      console.log(
        'You can enter more text. For exit press "exit" or "CTRL + C"',
      );

      if (text.toLowerCase() === 'exit') {
        console.log('Goodbye, see you later!');
        rl.close();
      } else {
        fs.writeFile(filePath, content, (err) => {
          if (err) {
            console.log(err);
          } else {
            console.log('');
          }
        });
      }
    });

    rl.on('SIGINT', () => {
      console.log('Goodbye, see you later!');
      rl.close();
    });

    rl.on('close', () => {
      writeFile.close();
    });
  });
}

writeFileContent(inputText);
