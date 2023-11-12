const List = require('./LCDirectoryFileNameReader.cjs')
const LCEGOList = List.LCEGOList
const fs = require('fs')

let data = {selectOUT: LCEGOList}

data = JSON.stringify(data);

const filename = 'test.txt'

fs.writeFile(filename , data , (err) => {
    if(err) throw (err);

    console.log('проверь файл')
})


// import LCEGOList from "./LCDirectoryFileNameReade.js";

console.log(LCEGOList);


