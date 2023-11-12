import express from 'express'; 
import path from 'path';
import { LCEGOList , gameMode1Select } from './LCDirectoryFileNameReader.cjs';


const __dirname = path.resolve()
const PORT  = 3001

const app = express()

app.get('/api/gm3' , (request, response) => {

    response.send(LCEGOList)
} )


app.get('/api/gm1' , (request, response) => {

    response.send(gameMode1Select)
} )


app.listen(PORT , () => {
    
    console.log("working on " + PORT);
});
