const fs = require('fs');
const readline = require('readline');

const input_path = 'surnames-draft.txt';
const output_path = 'surnames.txt';

const inputStream = fs.createReadStream(input_path);
const outputStream = fs.createWriteStream(output_path, { encoding: 'utf8' });
const lineReader = readline.createInterface({
    input: inputStream,
    terminal: false,
});
lineReader.on('line', function (line) {
    outputStream.write(
        line.slice(0, 1) + line.toLocaleLowerCase().slice(1) + '\n'
    );
});
