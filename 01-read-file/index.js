const fs = require("fs");
const Path = require("path");
const filePath = Path.join(__dirname,'/text.txt');
fs.readFile(filePath,'utf-8',function (exception,text){
    if (exception) throw exception;
    console.log(text);
});