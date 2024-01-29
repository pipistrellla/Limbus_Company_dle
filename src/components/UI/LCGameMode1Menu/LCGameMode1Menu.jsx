import React, {useEffect, useRef, useState} from "react";
import classes from './LCGameMode1Menu.module.css';
import LCInput from "../LCInput/LCInput";
import LCButton from '../LCButton/LCButton'
import LCCanvas from "../LCCanvas/LCCanvas";
import { useLCCanvasFill} from "../../hook/useLCCanvas";
import { LCFillBlack } from "../../LCFillBlack";
import { LCUndraw } from "../../LCUndraw";
import { LCAnswerCheck } from "../../LCAnswerCheck";
import { LCCanvasClear } from "../../LCCanvasClear";
import LCSelect from "../LCSelect/LCSelect";
import { LCRandomTask } from "../../LCRandomTask";
import { LCCanvasStatusSet } from "../../LCCanvasStatusSet";



const LCGameMode1Menu = () => { 
    const canvasRef = useRef();

    useLCCanvasFill(canvasRef, LCFillBlack);

    const [gameMode1Answer,setGameModeAnswer] = useState('ryoshu')
    const [gameMode1IdentityAnswer, setGameMode1IdentityAnswer,] = useState('W Corp. L3 Cleanup Agent Ry3F Full')

    const [identity , setIdentity] = useState('chose the right Identity')
    const [userAnswer, setUserAnswer] = useState('')
    const [LCSelectVisible , setLCSelectVisible ] = useState(false)
    const [LCNextImageVisible, setLCNextImageVisible] = useState(false)


    const [identityList, setIdentityList] = useState(JSON.stringify([]))

    function answerSet(position){
        if (localStorage.getItem('gameMode1Position') === null){
            localStorage.removeItem('GameMode1IdentityAnswer')
            localStorage.removeItem('GameMode1Answer')
            localStorage.removeItem('gameMode1XArr')
            localStorage.removeItem('gameMode1YArr')
            setGameModeAnswer((JSON.parse(identityList))[position].characterName);
            setGameMode1IdentityAnswer((JSON.parse(identityList))[position].name);
            setImageLink('');
            setImageLink(require(`../../../images/imageForGameMode1/${(JSON.parse(identityList))[position].pathToImage}`));
            localStorage.setItem('gameMode1Position' , position)
        // забираем позицию
        } else {
            let tempPos = +localStorage.getItem('gameMode1Position')
            setGameModeAnswer((JSON.parse(identityList))[tempPos].characterName);
            setGameMode1IdentityAnswer((JSON.parse(identityList))[tempPos].name);
            setImageLink('');
            setImageLink(require(`../../../images/imageForGameMode1/${(JSON.parse(identityList))[tempPos].pathToImage}`));
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



    function UnDraw (xArr , yArr) {
        const canvas = canvasRef.current
        const context = canvas.getContext('2d')
        let x = Math.floor((Math.random() * (context.canvas.width - 0 + 1))/clearRect)*clearRect
        let y = Math.floor((Math.random() * (context.canvas.height - 0 + 1))/clearRect)*clearRect


        for (let i = 0; i< xArr.length ; i++){
            
            if ((xArr[i] === x) && (yArr[i]===y)){
                if (xArr.length > 12)
                        {break}
                return UnDraw(xArr, yArr);
            }
        }
        xArr.push(x);
        yArr.push(y);
        LCUndraw(context,x,y,clearRect);
    }
// чтобы можно было угадать за кол-во персонажей
    const clearRect = 75;

    let xArr = [];
    let yArr = [];
    if (localStorage.getItem('gameMode1XArr') === null) {
        localStorage.setItem('gameMode1XArr' , 10000);
        localStorage.setItem('gameMode1YArr' , 10000);
    }


    let xArrLocal = localStorage.getItem('gameMode1XArr').split(' ')

    for (let i = 0; i < xArrLocal.length ; i+=1){
        xArr.push(+xArrLocal[i]);
    }

    let yArrLocal = localStorage.getItem('gameMode1YArr').split(' ')

    for (let i = 0; i < yArrLocal.length ; i+=1){
        yArr.push(+yArrLocal[i]);
    }


    const [imgLink, setImageLink] = useState(require("../../../images/imageForGameMode1/W_Corp__Cleanup_Agent_Ry_.png"))

    useEffect(() => {
        // делаем запрос и добавляепм список всех identity 
        fetch('/api/gm1')
        .then(response => response.json())
        .then(response => setIdentityList(JSON.stringify(response)));

        // очищаем холст и показываем select, если был дан верный ответ
        for (let i = 0; i < xArr.length; i+=1  ) {
            LCUndraw(canvasRef.current.getContext('2d'),xArr[i],yArr[i],clearRect);
        }

        if ((localStorage.getItem('GameMode1Answer') === null) ) {
            setLCSelectVisible(false)
            
        } else {
            setLCSelectVisible(true)
        }


        if (JSON.parse(localStorage.getItem('GameMode1IdentityAnswer')) === true) {
            setLCNextImageVisible(true)
        } else {
            setLCNextImageVisible(false)
        }

        
    });

    useEffect(() => { 
        if (identityList !== '[]')
        {
            // рендоманая генерация 1 картинки
            answerSet(LCRandomTask(JSON.parse(identityList)));

            // тут поменять если (не) нужно будет запоминание
            // localStorage.removeItem('GameMode1Answer')
            // localStorage.removeItem('GameMode1IdentityAnswer')


            // статичная генерация
            // let item = (JSON.parse(identityList))  
            // item = item[0]
            // setGameMode3Answer(item.characterName);
            // setGameMode3EGOAnswer(item.name);
            // setImageLink('');
            // setImageLink(require(`../../../images/ImageForGameMode3/${item.pathToImage}`));
        
    }

    }, [identityList])



    const LCGameModeBorderClasses = [classes.LCGameModePicture]
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
    <form  >
        <div className={classes.LCGameModeBorder}>

                <LCCanvas 
                    ref ={canvasRef} 
                    className={LCGameModeBorderClasses.join(' ')} 
                    style={{ 
                        backgroundImage: `url("${imgLink}")` 
                }}/>



                <LCInput type = 'text' 
                name = 'userAnswer'
                placeholder = {( LCSelectVisible === true) ? gameMode1Answer : 'Enter LC character name'  }
                disabled={(LCSelectVisible === true) ? true : false }
                onChange={(event) => setUserAnswer(event.target.value)} />
                
                <LCButton onClick = {(e) => 
                                        {e.preventDefault();
                                            if (LCAnswerCheck(userAnswer, gameMode1Answer)) {
                                                canvasClear()
                                                localStorage.setItem('gameMode1XArr' , xArr.join(' '));
                                                localStorage.setItem('gameMode1YArr' , yArr.join(' '));
                                                localStorage.setItem('GameMode1Answer', JSON.stringify(true))
                                                setLCSelectVisible(true)
                                                setLCGameModeBorderClassesShake(true)
                                                LCCanvasStatusSet(true)

                                            }
                                            else {
                                                UnDraw(xArr,yArr)
                                                localStorage.setItem('gameMode1XArr' , xArr.join(' '));
                                                localStorage.setItem('gameMode1YArr' , yArr.join(' '));
                                                setLCGameModeBorderClassesShake(false)
                                                LCCanvasStatusSet(false)
                                            }
                                            
                                        }
                                    }
                    disabled={(LCSelectVisible === true) ? true : false }> 
                    Confirm 
                </LCButton>

                <LCSelect
                    disabled={LCNextImageVisible}
                    value = {(LCNextImageVisible === true) ? gameMode1IdentityAnswer : identity}
                    onChange= { value => {setIdentity(value);
                                        if (LCAnswerCheck(value , gameMode1IdentityAnswer) )
                                            {
                                                localStorage.setItem('GameMode1IdentityAnswer' , JSON.stringify(true));
                                                console.log('YES')
                                                setLCNextImageVisible(true)
                                                setLCGameModeBorderClassesShake(true)
                                                localStorage.setItem('gm1score', +(localStorage.getItem('gm1score'))+1)
                                            }
                                        else 
                                            setLCGameModeBorderClassesShake(false)}}
                    defaultValue = {identity}
                    options = {JSON.parse(identityList)}
                    answer = {gameMode1Answer}
                    visible = {LCSelectVisible}
                />

                <LCButton
                    visible = {LCNextImageVisible}
                    onClick= {(e)=> 
                        {e.preventDefault();
                            setLCGameModeBorderClassesShake('next') 
                            localStorage.removeItem('gameMode1Position')
                            answerSet(LCRandomTask(JSON.parse(identityList)));
                            nextImageShow(canvasRef)
                            setLCSelectVisible(false)
                            setLCNextImageVisible(false)
                            setUserAnswer('')
                            
                            

                }}>

                next image
            </LCButton>



        </div>
    </form>
    

);
};

export default LCGameMode1Menu;
