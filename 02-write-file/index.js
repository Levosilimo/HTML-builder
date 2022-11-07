const fs = require('fs');
const Path = require('path');
const filePath = Path.join(__dirname, '/text.txt');
const {stdin} = process;
const output = fs.createWriteStream(filePath);
console.log("Enter text:");
stdin.on('data', data => {
    if (data.toString().trim() === 'exit') process.exit()
    output.write(data)
});
process.on('SIGINT', () => process.exit());
process.on('exit', () => console.log('=-=-=-=-=-=-=-=-=-=-=\nDone!'));