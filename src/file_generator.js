const path = require('path');
const fs = require('fs');
const fse = require('fs-extra');


function replaceAll(str, find, replace) {
    return str.replace(new RegExp(find, 'g'), replace);
}

function uppercaseFirstLetter(text) {
    return text.charAt(0).toUpperCase() + text.slice(1);
}

function getName(text, style) {
    style = style || '';
    let charList = [];
    let currentList = [];
    for (let textIndex = 0; textIndex < text.length; textIndex++) {
        const letter = text[textIndex];

        if (letter === letter.toUpperCase()) {
            charList.push(currentList);
            currentList = [];
        } else if (text.length - 1 === textIndex) {
            charList.push(currentList);
        }
        currentList.push(letter);
    }

    const words = charList.filter(_ => _.length).map((wordList) => {
        return wordList.join('').toLowerCase();
    });

    let name = '';
    if (style === 'camel') {
        for (let wordIndex = 0; wordIndex < words.length; wordIndex++) {
            const word = words[wordIndex];
            if (wordIndex === 0) {
                name = word;
            } else {
                name += uppercaseFirstLetter(word);
            }
        }
    } else if (style === 'pascal') {
        for (let wordIndex = 0; wordIndex < words.length; wordIndex++) {
            const word = words[wordIndex];

            name += uppercaseFirstLetter(word);
        }
    } else if (style === 'snake') {
        name = words.join('_');
    } else if (style === 'kebab') {
        name = words.join('-');
    } else {
        name = words.join('');
    }

    return name;
}

function replaceByAllStyles(name, text) {
    let finalName = null;
    const styles = ['', 'camel', 'pascal', 'snake', 'kebab'];

    for (const style of styles) {
        finalName = replaceAll(finalName || text, `{name${(style) ? `:${style}` : ''}}`, getName(name, style));
    }

    return finalName;
}

function walkDir(elementName, dirPath, folderStyle, destinationBasePath, flat) {
    const files = fs.readdirSync(dirPath);

    for (const fileOrDir of files) {
        const _file = path.join(dirPath, fileOrDir);
        const fileDir = path.join(destinationBasePath, (flat) ? '' : getName(elementName, folderStyle), fileOrDir);
        if (fs.lstatSync(_file).isDirectory()) {
            walkDir(elementName, _file, folderStyle, path.join(destinationBasePath, fileOrDir), flat);
        } else {
            let finalFileName = replaceByAllStyles(elementName, fileDir);
            let fileContent = fs.readFileSync(_file, 'utf8');
            fileContent = replaceByAllStyles(elementName, fileContent);
            fse.outputFileSync(finalFileName, fileContent);
            console.log(_file);
            console.log(fileDir);
            console.log(finalFileName);
            console.log(Array(30).join('-'));
        }
    }
}

function createFiles(componentPath, schematicFolder, folderStyle, flat) {
    const componentPathList = componentPath.split('/');
    const elementName = componentPathList[componentPathList.length - 1];
    schematicFolder = path.join(process.cwd(), schematicFolder);
    componentPathList.pop();
    
    const destinationBasePath = componentPathList.join('/');
    if (fs.existsSync(schematicFolder)) {
        walkDir(elementName, schematicFolder, folderStyle, destinationBasePath, flat);
    }
}

module.exports = {
    createFiles,
}