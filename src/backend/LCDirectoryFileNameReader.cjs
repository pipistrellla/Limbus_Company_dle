const fs = require('fs');
const path = require('path');



// путь указывается относительно packageJSON файла, так как видимо запускает этот скрипт от туда

const PictureObjectCreator = (pathTo , characters) =>  {
    let arrayOut = []
    let allFiles = fs.readdirSync(pathTo)
    let pathToImage =''
    let characterName
    for (let i = 0 ; i < allFiles.length ; i+=1){ 
        allFiles[i] = path.basename(allFiles[i] , '.webp');
        pathToImage = allFiles[i];
        allFiles[i] = allFiles[i].split('_').join(' ');
        for (const j of characters ){
            if (allFiles[i].indexOf(j) > -1)
            {
                characterName = j;
                break
            }}

        arrayOut[i] = {characterName: characterName  , name: allFiles[i] , pathToImage: `${pathToImage}.webp`}
    }
    return arrayOut
}

let gameMode1Path = '../images/imageForGameMode1'
let gameMode3Path = '../images/ImageForGameMode3'

const characterNames = ['Don Quixot', 'Gregor' , 'Yi Sang', 'Outis', 'Heathcliff', 'Rodion','Meursault' , 'Ishmael','Hong Lu' ,'Ryoshu' ,'Faust' , 'Sinclair' ]


const gameMode1Select = PictureObjectCreator(gameMode1Path , characterNames);
const LCEGOList = PictureObjectCreator(gameMode3Path , characterNames);


exports.LCEGOList = LCEGOList;
exports.gameMode1Select = gameMode1Select;






