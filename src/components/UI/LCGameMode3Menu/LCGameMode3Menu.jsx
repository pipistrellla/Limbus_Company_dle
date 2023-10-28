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

const LCGameMode3Menu = () => {

    const canvasRef = useRef();

    useLCCanvasFill(canvasRef, LCFillBlack);

    const gameMode3Answer = 'ryoshu'

    const [userAnswer, setUserAnswer] = useState('')

    function canvasClear(){
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
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

    let xArr = [];
    let yArr = [];



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
                                            }
                                            else {
                                                UnDraw(xArr,yArr)
                                            }
                                        }}
                                    > Confirm </LCButton>



        </div>
    </form>
    

);
};

export default LCGameMode3Menu;
