const fs = require('fs');
const path = require('path');



// путь указывается относительно packageJSON файла, так как видимо запускает этот скрипт от туда

const PictureObjectCreator = (pathTo) =>  {
    let arrayOut = []
    let allFiles = fs.readdirSync(pathTo)
    let pathToImage =''
    for (let i = 0 ; i < allFiles.length ; i+=1){ 
        allFiles[i] = path.basename(allFiles[i] , '.webp');
        pathToImage = allFiles[i];
        allFiles[i] = allFiles[i].split('_').join(' ');
        arrayOut[i] = {name: allFiles[i] , value: allFiles[i] , pathToImage: `../${pathTo}/${pathToImage}.webp`}
    }
    return arrayOut
}

let gameMode1Path = '../images/imageForGameMode1'
let gameMode3Path = '../images/ImageForGameMode3'

const gameMode1Select = PictureObjectCreator(gameMode1Path);
const LCEGOList = PictureObjectCreator(gameMode3Path);


exports.LCEGOList = LCEGOList;
exports.gameMode1Select = gameMode1Select;






