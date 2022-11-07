const fs = require('fs');
const Path = require('path');
const filePath = Path.join(__dirname, '/styles');
const bundlePath = Path.join(__dirname,"/project-dist/bundle.css")
async function bundleStyles(){
    const files = await fs.promises.readdir(filePath, {withFileTypes:true});
    await fs.promises.rm(bundlePath,{recursive:true,force:true});
    for(let file of files){
        if(file.isFile() && Path.extname(file.name) === ".css"){
            const text = await fs.promises.readFile(Path.join(filePath,file.name),"utf-8");
            await fs.promises.appendFile(bundlePath,text);
        }
    }
}
bundleStyles();