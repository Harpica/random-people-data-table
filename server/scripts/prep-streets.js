const fs = require('fs');
const readline = require('readline');

const input_path = 'poland.csv';
const output_path = 'poland-new.txt';

const inputStream = fs.createReadStream(input_path);
const outputStream = fs.createWriteStream(output_path, { encoding: 'utf8' });
const lineReader = readline.createInterface({
    input: inputStream,
    terminal: false,
});
const neededColumns = [3, 4, 6, 7, 8, 9];
lineReader.on('line', function (line) {
    let data = line.split(',');
    let newData = [];
    neededColumns.forEach((element) => {
        newData.push(data[element]);
    });
    newData = newData.filter((element) => {
        return element !== '';
    });

    outputStream.write(newData.join(', ') + '\n');
});
