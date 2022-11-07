const fs = require('fs');
const Path = require('path');
const filePath = Path.join(__dirname, '/files');
const destinationPath = Path.join(__dirname, '/files-copy');
async function copyFiles(){
    const files = await fs.promises.readdir(filePath, {withFileTypes:true});
    await fs.promises.rm(destinationPath,{recursive:true, force:true});
    await fs.promises.mkdir(destinationPath, {recursive:true});
    for(let file of files){
        if(file.isFile()){
            await fs.promises.copyFile(Path.join(filePath,file.name), Path.join(destinationPath,file.name));
        }
    }
}
copyFiles();
