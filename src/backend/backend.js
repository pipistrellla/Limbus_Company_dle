import express from 'express'; 
import path from 'path';
import { LCEGOList , gameMode1Select, gameMode2Data , gameMode4Data} from './LCDirectoryFileNameReader.cjs';


const __dirname = path.resolve()
const PORT  = 3001

const app = express()
// можно обращаться к файлам и каталогам которые находятся в backend/piblic

app.use(express.static(path.join(__dirname , 'public')))


// простые запросы по ссылке
app.get('/api/gm3' , (request, response) => {
    try {
        response.send(LCEGOList)
    } catch (e) {
        response.status(500).json(e)
    }
} )

app.get('/api/gm4' , (request, response) => {

    try {
        response.send(gameMode4Data)
    } catch (e) {
        response.status(500).json(e)
    }
})


app.get('/api/gm1' , (request, response) => {
    try {
        response.send(gameMode1Select)
    } catch (e) {
        response.status(500).json(e)
    }
} )

app.get('/api/gm2' , (request, response) => {
    try {
        response.send(gameMode2Data)
    } catch (e) {
        response.status(500).json(e)
    }
} )


app.listen(PORT , () => {
    
    console.log("working on " + PORT);
});


console.log(__dirname)