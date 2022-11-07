const fs = require('fs');
const Path = require('path');
const filePath = Path.join(__dirname, '/secret-folder');
async function printFileNames(){
    const files = await fs.promises.readdir(filePath, {withFileTypes:true});
    for(let file of files){
        if(file.isFile()){
            const name = file.name.split('.')[0];
            const extension = Path.extname(file.name).slice(1);
            const size = (await fs.promises.stat(Path.join(filePath, file.name))).size;
            console.log(`${name} - ${extension} - ${size}b`);
        }
    }
}
printFileNames();