const fs = require('fs');
const readline = require('readline');

const input_path = 'adresses.txt';
const output_path = 'adresses-new.txt';

const inputStream = fs.createReadStream(input_path);
const outputStream = fs.createWriteStream(output_path, { encoding: 'utf8' });
const lineReader = readline.createInterface({
    input: inputStream,
    terminal: false,
});
lineReader.on('line', function (line) {
    outputStream.write(
        line.replaceAll(
            '00-000',
            `${Math.floor(Math.random() * 99)}-${Math.floor(
                Math.random() * 99
            )}`
        ) + '\n'
    );
});
