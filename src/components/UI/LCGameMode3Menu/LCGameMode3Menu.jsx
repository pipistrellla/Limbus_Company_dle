import React , {useEffect, useRef, useState} from "react";
import classes from './LCGameMode3Menu.module.css';
import LCInput from "../LCInput/LCInput";
import LCButton from '../LCButton/LCButton'
import LCCanvas from "../LCCanvas/LCCanvas";
import { LCFillBlack } from "../../LCFillBlack";
import { LCUndraw } from "../../LCUndraw";
import { useLCCanvasFill} from "../../hook/useLCCanvas";
import { LCCanvasClear } from "../../LCCanvasClear";
import {LCAnswerCheck} from "../../LCAnswerCheck";
import LCSelect from "../LCSelect/LCSelect";
import { LCRandomTask } from "../../LCRandomTask";
import LCRandomEmoji from "../LCRandomEmoji/LCRandomEmoji";



const LCGameMode3Menu = () => {

    const [canvasStatus, setCanvasStatus] = useState(' ')
    const canvasRef = useRef();

    const [LCEGOList, setLCEGOList] = useState(JSON.stringify([]))
    
    useLCCanvasFill(canvasRef, LCFillBlack);

    const [EGO , setEGO] = useState('chose the right EGO')
    const [userAnswer, setUserAnswer] = useState('')
    const [LCSelectVisible , setLCSelectVisible ] = useState(false)
    const [LCNextImageVisible, setLCNextImageVisible] = useState(false)

    const [gameMode3Answer, setGameMode3Answer] =  useState('ryoshu')

    const [gameMode3EGOAnswer, setGameMode3EGOAnswer] = useState('forest for the flames ryoshu')


    function canvasClear(){
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        xArr = [];
        yArr = [];
            for (let i = 0 ; i < context.canvas.width; i+=clearRect ) {
                for (let j = 0 ; j < context.canvas.height; j+=clearRect ){
                    xArr.push(i);
                    yArr.push(j);
                }
            }

        LCCanvasClear(context);
    }

    function answerSet(position){
        // запоминаем позицию
        if (localStorage.getItem('gameMode3Position') === null){
            localStorage.removeItem('GameMode3EGOAnswer')
            localStorage.removeItem('GameMode3Answer')
            setGameMode3Answer((JSON.parse(LCEGOList))[position].characterName);
            setGameMode3EGOAnswer((JSON.parse(LCEGOList))[position].name);
            setImageLink('');
            setImageLink(require(`../../../images/ImageForGameMode3/${(JSON.parse(LCEGOList))[position].pathToImage}`));
            
            localStorage.setItem('gameMode3Position' , position)
        // забираем позицию
        } else {
            let tempPos = +localStorage.getItem('gameMode3Position')
            setGameMode3Answer((JSON.parse(LCEGOList))[tempPos].characterName);
            setGameMode3EGOAnswer((JSON.parse(LCEGOList))[tempPos].name);
            setImageLink('');
            setImageLink(require(`../../../images/ImageForGameMode3/${(JSON.parse(LCEGOList))[tempPos].pathToImage}`));
        }
    }


    function nextImageShow(canvasRef) { 
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        LCFillBlack(context)
        xArr = []
        yArr= []
        localStorage.removeItem('gameMode3XArr')
        localStorage.removeItem('gameMode3YArr')

    }

    const clearRect = 75;

    function UnDraw (xArr , yArr) {
        const canvas = canvasRef.current
        const context = canvas.getContext('2d')
        let x = Math.floor((Math.random() * (context.canvas.width - 0 + 1))/clearRect)*clearRect
        let y = Math.floor((Math.random() * (context.canvas.height - 0 + 1))/clearRect)*clearRect



        for (let i = 0; i< xArr.length ; i++){
            
            if ((xArr[i] === x) && (yArr[i]===y)){
                if (xArr.length > 18)
                    break
                return UnDraw(xArr, yArr);
            }
        }
        
        xArr.push(x);
        yArr.push(y);

        LCUndraw(context,x,y,clearRect);
    }

    // очищаем первый кусок, если это 1 попытка
    // в данном случае не очищаем ничего, так как остается место по периметру
    if (localStorage.getItem('gameMode3XArr') === null) {
        localStorage.setItem('gameMode3XArr' , 10000);
        localStorage.setItem('gameMode3YArr' , 10000);

    }

    let xArr = [];
    let yArr = [];


    let xArrLocal = localStorage.getItem('gameMode3XArr').split(' ')

    for (let i = 0; i < xArrLocal.length ; i+=1){
        xArr.push(+xArrLocal[i]);
    }


    let yArrLocal = localStorage.getItem('gameMode3YArr').split(' ')

    for (let i = 0; i < yArrLocal.length ; i+=1){
        yArr.push(+yArrLocal[i]);
    }



    const [imgLink, setImageLink] = useState(require("../../../images/ImageForGameMode3/Ebony_Stem_Outis.webp"))
    // при монтировании компонента делаем запрос и выполнем очиску холста, если был дан ответ

    useEffect(()=> {
        // делаем запрос и добавляепм список всех EGO 
        fetch('/api/gm3')
        .then(response => response.json())
        .then(response => setLCEGOList(JSON.stringify(response)));

        
        
        // очищаем холст и показываем select, если был дан верный ответ
        for (let i = 0; i < xArr.length; i+=1  ){
            LCUndraw(canvasRef.current.getContext('2d'),xArr[i],yArr[i],clearRect)
        }
        
        if (localStorage.getItem('GameMode3Answer') === null) {
            setLCSelectVisible(false)
            
        } else {
            setLCSelectVisible(true)
        }


        if (JSON.parse(localStorage.getItem('GameMode3EGOAnswer')) === true) {
            setLCNextImageVisible(true)
        } else {
            setLCNextImageVisible(false)
        }

    });


    useEffect(() => {
        if (LCEGOList !== '[]')
        {
            // рендоманая генерация 1 картинки
            answerSet(LCRandomTask(JSON.parse(LCEGOList)));

            // тут поменять если (не) нужно будет запоминание
            // localStorage.removeItem('GameMode3EGOAnswer')
            // localStorage.removeItem('GameMode3Answer')

            
            // статичная генерация
            // let item = (JSON.parse(LCEGOList))  
            // item = item[0]
            // setGameMode3Answer(item.characterName);
            // setGameMode3EGOAnswer(item.name);
            // setImageLink('');
            // setImageLink(require(`../../../images/ImageForGameMode3/${item.pathToImage}`));

        }


    }, [LCEGOList] )

    const LCGameModeBorderClasses = [classes.LCEGO]
    const [LCGameModeBorderClassesShake,setLCGameModeBorderClassesShake] = useState('next')

    
    if (LCGameModeBorderClassesShake === false){
        LCGameModeBorderClasses.push(classes.wrong)
    
        setTimeout(()=> {LCGameModeBorderClasses.pop() ; setLCGameModeBorderClassesShake(' ')},400)
    }
    
    if (LCGameModeBorderClassesShake === true){
        LCGameModeBorderClasses.push(classes.true)
    
        setTimeout(()=> {LCGameModeBorderClasses.pop() ; setLCGameModeBorderClassesShake(' ')},400)
    }
    

    if (LCGameModeBorderClassesShake === 'next'){
        LCGameModeBorderClasses.push(classes.next)
    
        setTimeout(()=> {LCGameModeBorderClasses.pop() ; setLCGameModeBorderClassesShake(' ')},2000)
    }

return(
    <form>
        <div className={classes.LCGameModeBorder}>
            

            

            <LCCanvas 
                ref = {canvasRef} 
                className={LCGameModeBorderClasses.join(' ')}
                style={{ 
                    backgroundImage: `url("${imgLink}")` 
            }}/>
            
            <LCInput
            
            type = 'text' 
            name = 'userAnswer'
            placeholder = {( LCSelectVisible === true) ? localStorage.getItem('gm3name') : 'Enter LC character name'  }
            onChange={(event) => {setCanvasStatus(' '); setUserAnswer(event.target.value)}}
            disabled={LCSelectVisible}/>
            
            <LCButton 
            disabled={(LCSelectVisible === true) ? true : false }
            onClick = {(e) => 
                                        {e.preventDefault();
                                            console.log(localStorage.getItem(LCEGOList))
                                            if (LCAnswerCheck(userAnswer, gameMode3Answer)) {
                                                canvasClear()
                                                localStorage.setItem('gameMode3XArr' , xArr.join(' '));
                                                localStorage.setItem('gameMode3YArr' , yArr.join(' '));
                                                localStorage.setItem('GameMode3Answer', JSON.stringify(true))
                                                setLCSelectVisible(true)
                                                setLCGameModeBorderClassesShake(true)
                                                localStorage.setItem('gm3name', (JSON.parse(LCEGOList))[+localStorage.getItem('gameMode3Position')].characterName )
                                                setCanvasStatus(true)
                                            }
                                            else {
                                                UnDraw(xArr,yArr)
                                                localStorage.setItem('gameMode3XArr' , xArr.join(' '));
                                                localStorage.setItem('gameMode3YArr' , yArr.join(' '));
                                                setCanvasStatus(false)
                                                setLCGameModeBorderClassesShake(false)
                                            }
                                        }}
                                    > Confirm 
            </LCButton>

            <LCSelect
                value = {(LCNextImageVisible === true) ? localStorage.getItem('gm3EGO') : EGO}
                disabled={LCNextImageVisible}
                onChange= { value => {setEGO(value);
                                if (LCAnswerCheck(value , gameMode3EGOAnswer) )
                                    {
                                        setLCGameModeBorderClassesShake(true)
                                        localStorage.setItem('GameMode3EGOAnswer' , JSON.stringify(true));
                                        setLCNextImageVisible(true)
                                        localStorage.setItem('gm3EGO', value)
                                        localStorage.setItem('gm3score', +(localStorage.getItem('gm3score'))+1)
                                        setCanvasStatus(true)
                                    } else {
                                        setLCGameModeBorderClassesShake(false)
                                        setCanvasStatus(false)
                                    }}}
                defaultValue = {EGO}
                options = {JSON.parse(LCEGOList)}
                visible = {LCSelectVisible}
                answer={gameMode3Answer}
            />

            <LCButton
            visible = {LCNextImageVisible}
            onClick= {(e)=> 
                {e.preventDefault(); 
                    localStorage.removeItem('gameMode3Position')
                    answerSet(LCRandomTask(JSON.parse(LCEGOList)));
                    nextImageShow(canvasRef)
                    setLCSelectVisible(false)
                    setLCNextImageVisible(false)
                    setLCGameModeBorderClassesShake('next')
                    setCanvasStatus(' ')
                }}>

                next image
            </LCButton>


        </div>
        <LCRandomEmoji canvasStatus = {canvasStatus}/>
    </form>
    

);
};

export default LCGameMode3Menu;
