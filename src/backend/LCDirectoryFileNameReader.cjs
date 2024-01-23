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
// функция сортировки массива файлов по времени

const getSortedFiles = (dir) => {
    // считываем файлы в каталоге и сортируем по времени создания
    try{
        const files = fs.readdirSync(dir);
        return files
            .map(fileName => ({
                name: fileName,
                time: fs.statSync(`${dir}/${fileName}`).mtime.getTime(),
            }))
            .sort((a, b) => a.time - b.time)
            .map(file => file.name);
    }
    catch (e) {
        console.log(e)
    }
};




const PictureObjectCreatorForGameMode2  = (pathTo, characters) => {
    try {
        let arrayOut = []
        // let allFiles = fs.readdirSync(pathTo);
        let allFiles = getSortedFiles(pathTo)

        let pathToImage = []
        let characterName

        for (let i = 0 ; i < (allFiles.length-4) ; i+=4){ 

        }

        for (let i = 0 ; i < (allFiles.length-4) ; i+=4){ 

            for (let j = i; j < (i+4) ; j+=1){ 
                allFiles[j] = path.basename(allFiles[j] , '.webp');
                pathToImage[j] = allFiles[j];
            }

            for (const j of characters ){
                if (allFiles[i].split('_').join(' ').indexOf(j) > -1)
                {
                    
                    characterName = (j === 'Ry3F') ? 'Ryoshu' : j;
                    break
                    // просто потомучто я не уверен, что в будущем все скилы Ryoshu будуьт писаться с ее именем, без разных знаков в нем
                } else {
                    characterName = (allFiles[i].split('_').join(' ').indexOf('Ryoshu')) ? 'Ryoshu' : j
                }}

            arrayOut[i/4] = {characterName: characterName, pathToImage: [`${pathToImage[i]}.webp`,`${pathToImage[i+1]}.webp`,`${pathToImage[i+2]}.webp`,`${pathToImage[i+3]}.webp`],}

        }
        


        return arrayOut
        
    } catch(e) {
        console.log(`error in PictureObjectCreatorForGameMode2 error: ${e}` )
        return('error')
    }

}

const emojiObjectCreator = (pathTo) =>  {
    try { 
        let allEmoji = fs.readFileSync(pathTo, 'utf8', )
        // для мака 
        let tempData = allEmoji

        // для винды
        if (tempData.indexOf('\r\n') !==-1){
            tempData = tempData.split('\r\n')
        // для мака
        } else {
            tempData = tempData.split('\n')
        }
        console.log(tempData)
        return tempData
    } catch(e) {
        console.log(`error in emojiObjectCreator error: ${e}`  )
        return('error')
    }}



let gameMode1Path = '../images/imageForGameMode1'
let gameMode3Path = '../images/ImageForGameMode3'
let gameMode2Path = '../images/ImageForGameMode2'
let gameMode4Path = './gm4.txt'

const characterNames = ['Don Quixot', 'Gregor' , 'Yi Sang', 'Outis', 'Heathcliff', 'Rodion','Meursault' , 'Ishmael','Hong Lu' ,'Ry3F' ,'Faust' , 'Sinclair' ]


const gameMode1Select = PictureObjectCreator(gameMode1Path , characterNames);
const LCEGOList = PictureObjectCreator(gameMode3Path , characterNames);
const gameMode2Data = PictureObjectCreatorForGameMode2(gameMode2Path, characterNames)
const gameMode4Data = emojiObjectCreator(gameMode4Path)

exports.LCEGOList = LCEGOList;
exports.gameMode1Select = gameMode1Select;
exports.gameMode2Data = gameMode2Data;
exports.gameMode4Data = gameMode4Data;




