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





const LCGameMode1Menu = () => {

    const canvasRef = useRef();


    useLCCanvasFill(canvasRef, LCFillBlack);

    const gameMode1Answer = 'ryoshu'

    const [userAnswer, setUserAnswer] = useState('')


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
        
        for (let i = 0; i < xArr.length; i+=1  )
        LCUndraw(canvasRef.current.getContext('2d'),xArr[i],yArr[i],clearRect) }, 
    400);




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

                                            }
                                            else {
                                                UnDraw(xArr,yArr)
                                                localStorage.setItem('gameMode1XArr' , xArr.join(' '));
                                                localStorage.setItem('gameMode1YArr' , yArr.join(' '));
                                            }
                                        }
                                    } > Confirm 
                                    </LCButton>



        </div>
    </form>
    

);
};

export default LCGameMode1Menu;
