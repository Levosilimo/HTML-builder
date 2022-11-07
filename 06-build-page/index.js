const fs = require('fs');
const Path = require('path');
const bundlePath = Path.join(__dirname, '/project-dist');
const styleBundlePath = Path.join(bundlePath, "/style.css");
const assetsPath = Path.join(__dirname, '/assets');
const assetsBundlePath = Path.join(bundlePath, "/assets");
const componentsPath = Path.join(__dirname, '/components');
const stylesPath = Path.join(__dirname, '/styles');
const templatePath = Path.join(__dirname, '/template.html')

async function buildPage(){
    await fs.promises.rm(bundlePath, {recursive: true, force: true});
    await fs.promises.mkdir(bundlePath, {recursive: true});
    let template = await fs.promises.readFile(templatePath, 'utf-8');
    const components = await fs.promises.readdir(componentsPath, { withFileTypes: true });
    for (const component of components) {
        const name = `{{${component.name.split('.')[0]}}}`;
        if (template.includes(name)) {
            const text = await fs.promises.readFile(Path.join(componentsPath, component.name), 'utf-8');
            template = template.replaceAll(name, text);
        }
    }
    await fs.promises.writeFile(Path.join(bundlePath, 'index.html'), template, 'utf-8');
    const styles = await fs.promises.readdir(stylesPath, {withFileTypes:true});
    for(let style of styles){
        if(style.isFile() && Path.extname(style.name) === ".css"){
            const text = await fs.promises.readFile(Path.join(stylesPath,style.name),"utf-8");
            await fs.promises.appendFile(styleBundlePath,text);
        }
    }
    const recursiveAssetsCopy = (async (source, destination) => {
        await fs.promises.mkdir(destination, {recursive: true});
        const assets = await fs.promises.readdir(source, {withFileTypes: true});
        for (const asset of assets){
            if(asset.isFile()) await fs.promises.copyFile(Path.join(source, asset.name), Path.join(destination,asset.name));
            else await recursiveAssetsCopy(Path.join(source, asset.name), Path.join(destination, asset.name));
        }
    });
    await recursiveAssetsCopy(assetsPath,assetsBundlePath);
}
buildPage()
