const fs = require('fs');
const path = require('path');



// путь указывается относительно packageJSON файла, так как видимо запускает этот скрипт от туда

const PictureObjectCreator = (pathTo , characters) =>  {
    try { 
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
                    
                    characterName = (j === 'Ry3F') ? 'Ryoshu' : j;
                    
                    break
                }}

            arrayOut[i] = {characterName: characterName  , name: allFiles[i] , pathToImage: `${pathToImage}.webp`}
        }
        return arrayOut 

    } catch(e) {
        console.log(`error in PictureObjectCreator error: ${e}`  )
        return('error')
    }
}


const PictureObjectCreatorForGameMode2  = (pathTo, characters) => {
    try {
        let arrayOut = []
        let allFiles = fs.readdirSync(pathTo);
        let pathToImage = []
        let characterName

        for (let i = 0 ; i < (allFiles.length-4) ; i+=4){ 

            for (let j = i; j < (i+4) ; j+=1){ 
                allFiles[j] = path.basename(allFiles[j] , '.webp');
                pathToImage[j] = allFiles[j];
            }

            for (const j of characters ){
                if (allFiles[i].indexOf(j) > -1)
                {
                    
                    characterName = (j === 'Ry3F') ? 'Ryoshu' : j;
                    
                    break
                }}

            arrayOut[i/4] = {characterName: characterName, pathToImage: [`${pathToImage[i]}.webp`,`${pathToImage[i+1]}.webp`,`${pathToImage[i+2]}.webp`,`${pathToImage[i+3]}.webp`],}
        }
        return arrayOut
        
    } catch(e) {
        console.log(`error in PictureObjectCreatorForGameMode2 error: ${e}` )
        return('error')
    }

}


let gameMode1Path = '../images/imageForGameMode1'
let gameMode3Path = '../images/ImageForGameMode3'
let gameMode2Path = '../images/ImageForGameMode2'

const characterNames = ['Don Quixot', 'Gregor' , 'Yi Sang', 'Outis', 'Heathcliff', 'Rodion','Meursault' , 'Ishmael','Hong Lu' ,'Ry3F' ,'Faust' , 'Sinclair' ]


const gameMode1Select = PictureObjectCreator(gameMode1Path , characterNames);
const LCEGOList = PictureObjectCreator(gameMode3Path , characterNames);
const gameMode2Data = PictureObjectCreatorForGameMode2(gameMode2Path, characterNames)

exports.LCEGOList = LCEGOList;
exports.gameMode1Select = gameMode1Select;
exports.gameMode2Data = gameMode2Data;





