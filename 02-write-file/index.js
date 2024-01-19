const readline = require('readline');
const fs = require('fs');
const rl = readline.createInterface(process.stdin, process.stdout);
let inputText = '';

fs.readFile('./02-write-file/text.txt', 'utf8', (error, data) => {
    data === undefined ? inputText += '' : inputText += data;
    console.log(inputText);
});

rl.setPrompt(`Hello, please, enter a text...      `);
rl.prompt();
rl.on('line', (text) => {
    inputText += `${text} `;

    if (text === 'exit') {
        console.log('Goodbye, see you later!');
        rl.close();
    } else {
        fs.writeFile('./02-write-file/text.txt', inputText, (error, data) => {
            console.log('Your text has been writing');
        });
    }
});

rl.on('SIGINT', () => {
    console.log('Goodbye, see you later!');
    rl.close();
});

