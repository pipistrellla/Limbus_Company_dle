import React , {useRef, useState} from "react";
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
// import { LCEGOList } from "../../LCDitectoryFileNameReader/test";

const LCGameMode3Menu = () => {

    // const List = require('../../LCDitectoryFileNameReader/test')
    // const LCEGOList = List.LCEGOList
    
    const canvasRef = useRef();

    useLCCanvasFill(canvasRef, LCFillBlack);

    const gameMode3Answer = 'ryoshu'

    const gameMode3EGOAnswer = 'forest for the flames'

    const [EGO , setEGO] = useState('chose the right EGO')
    const [userAnswer, setUserAnswer] = useState('')
    const [LCSelectVisible , setLCSelectVisible ] = useState(false)

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


    const clearRect = 50;

    function UnDraw (xArr , yArr) {
        const canvas = canvasRef.current
        const context = canvas.getContext('2d')
        let x = Math.floor((Math.random() * (context.canvas.width - 0 + 1))/clearRect)*clearRect
        let y = Math.floor((Math.random() * (context.canvas.height - 0 + 1))/clearRect)*clearRect



        for (let i = 0; i< xArr.length ; i++){
            
            if ((xArr[i] === x) && (yArr[i]===y)){
                if (xArr.length > 18)
                    {break}
                return UnDraw(xArr, yArr);
            }
        }
        
        xArr.push(x);
        yArr.push(y);

        LCUndraw(context,x,y,clearRect);
    }


    if (localStorage.getItem('gameMode3XArr') === null) {
        localStorage.setItem('gameMode3XArr' , `${clearRect}`);
        localStorage.setItem('gameMode3YArr' , `${clearRect}`);
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


    setTimeout(() => {
        
        for (let i = 0; i < xArr.length; i+=1  ){
            LCUndraw(canvasRef.current.getContext('2d'),xArr[i],yArr[i],clearRect)
        }
        
        if (localStorage.getItem('GameMode3Answer') === null) {
            setLCSelectVisible(false)
            
        }
        else {
            setLCSelectVisible(true)
        }


        if (JSON.parse(localStorage.getItem('GameMode3EGOAnswer')) === true) {
            console.log('ERA')
        }
    }, 
    20);






return(
    <form>
        <div className={classes.LCGameModeBorder}>
            

            <LCCanvas ref = {canvasRef} className={classes.LCEGO}/>
            
            <LCInput
            type = 'text' 
            name = 'userAnswer'
            placeholder = 'Enter LC character name' 
            onChange={(event) => setUserAnswer(event.target.value)}/>
            
            <LCButton onClick = {(e) => 
                                        {e.preventDefault();
                                            if (LCAnswerCheck(userAnswer, gameMode3Answer)) {
                                                canvasClear()
                                                localStorage.setItem('gameMode3XArr' , xArr.join(' '));
                                                localStorage.setItem('gameMode3YArr' , yArr.join(' '));
                                                localStorage.setItem('GameMode3Answer', JSON.stringify(true))
                                                setLCSelectVisible(true)
                                            }
                                            else {
                                                UnDraw(xArr,yArr)
                                                localStorage.setItem('gameMode3XArr' , xArr.join(' '));
                                                localStorage.setItem('gameMode3YArr' , yArr.join(' '));
                                            }
                                        }}
                                    > Confirm 
            </LCButton>

            <LCSelect
                value = {EGO}
                onChange= { value => {setEGO(value);
                                    if (LCAnswerCheck(value , gameMode3EGOAnswer) )
                                        {
                                            localStorage.setItem('GameMode3EGOAnswer' , JSON.stringify(true));
                                            console.log('YES')
                                        }}}
                defaultValue = {EGO}
                options = {LCEGOList}
                visible = {LCSelectVisible}
            />



        </div>
    </form>
    

);
};

export default LCGameMode3Menu;
