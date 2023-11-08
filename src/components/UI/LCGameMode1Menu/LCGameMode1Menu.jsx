import React, {useRef, useState} from "react";
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






const LCGameMode1Menu = () => { 
    const canvasRef = useRef();


    useLCCanvasFill(canvasRef, LCFillBlack);

    const gameMode1Answer = 'ryoshu'
    const gameMode1IdentityAnswer = 'W Corp. L3 Cleanup Agent Ry3F Full'

    const [identity , setIdentity] = useState('chose the right Identity')
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



    function UnDraw (xArr , yArr) {
        const canvas = canvasRef.current
        const context = canvas.getContext('2d')
        let x = Math.floor((Math.random() * (context.canvas.width - 0 + 1))/clearRect)*clearRect
        let y = Math.floor((Math.random() * (context.canvas.height - 0 + 1))/clearRect)*clearRect


        for (let i = 0; i< xArr.length ; i++){
            
            if ((xArr[i] === x) && (yArr[i]===y)){
                if (xArr.length > 74)
                        {break}
                return UnDraw(xArr, yArr);
            }
        }
        
        xArr.push(x);
        yArr.push(y);

        LCUndraw(context,x,y,clearRect);
    }

    const clearRect = 25;

    let xArr = [];
    let yArr = [];
    if (localStorage.getItem('gameMode1XArr') === null) {
        localStorage.setItem('gameMode1XArr' , `${clearRect}`);
        localStorage.setItem('gameMode1YArr' , `${clearRect}`);
    }



    let xArrLocal = localStorage.getItem('gameMode1XArr').split(' ')

    for (let i = 0; i < xArrLocal.length ; i+=1){
        xArr.push(+xArrLocal[i]);
    }

    let yArrLocal = localStorage.getItem('gameMode1YArr').split(' ')

    for (let i = 0; i < yArrLocal.length ; i+=1){
        yArr.push(+yArrLocal[i]);
    }



    setTimeout(() => {
        
        for (let i = 0; i < xArr.length; i+=1  ) {
            LCUndraw(canvasRef.current.getContext('2d'),xArr[i],yArr[i],clearRect);
        }

        if (localStorage.getItem('GameMode1Answer') === null) {
            setLCSelectVisible(false)
            
        }
        else {
            setLCSelectVisible(true)
        }


        if (JSON.parse(localStorage.getItem('GameMode1IdentityAnswer')) === true) {
            console.log('ERA')
        }
    }, 
    
    20);




return(
    <form  >
        <div className={classes.LCGameModeBorder}>

                <LCCanvas ref ={canvasRef} className={classes.LCGameModePicture} />



                <LCInput type = 'text' 
                name = 'userAnswer'
                placeholder = 'Enter LC character name' 
                onChange={(event) => setUserAnswer(event.target.value)} />
                
                <LCButton onClick = {(e) => 
                                        {e.preventDefault();
                                            if (LCAnswerCheck(userAnswer, gameMode1Answer)) {
                                                canvasClear()
                                                localStorage.setItem('gameMode1XArr' , xArr.join(' '));
                                                localStorage.setItem('gameMode1YArr' , yArr.join(' '));
                                                localStorage.setItem('GameMode1Answer', JSON.stringify(true))

                                            }
                                            else {
                                                UnDraw(xArr,yArr)
                                                localStorage.setItem('gameMode1XArr' , xArr.join(' '));
                                                localStorage.setItem('gameMode1YArr' , yArr.join(' '));
                                            }
                                        }
                                    }> Confirm 
                </LCButton>

                <LCSelect
                    value = {identity}
                    onChange= { value => {setIdentity(value);
                                        if (LCAnswerCheck(value , gameMode1IdentityAnswer) )
                                            {
                                                localStorage.setItem('GameMode1IdentityAnswer' , JSON.stringify(true));
                                                console.log('YES')
                                            }}}
                    defaultValue = {identity}
                    // options = {LCEGOList}
                    visible = {LCSelectVisible}
            />



        </div>
    </form>
    

);
};

export default LCGameMode1Menu;
