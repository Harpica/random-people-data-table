const fs = require('fs');
const readline = require('readline');

const input_path = 'poland-result.csv';
const output_path = 'adresses.txt';

const inputStream = fs.createReadStream(input_path);
const outputStream = fs.createWriteStream(output_path, { encoding: 'utf8' });
const lineReader = readline.createInterface({
    input: inputStream,
    terminal: false,
});
lineReader.on('line', function (line) {
    outputStream.write(
        line.replaceAll(',', ', ').replaceAll('"', '').replaceAll(',  ', ' ') +
            '\n'
    );
});
