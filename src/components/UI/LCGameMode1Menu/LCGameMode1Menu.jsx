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
        LCCanvasClear(context);
    }



    function UnDraw (xArr , yArr) {
        const canvas = canvasRef.current
        const context = canvas.getContext('2d')
        let x = Math.floor((Math.random() * (context.canvas.width - 0 + 1))/25)*25
        let y = Math.floor((Math.random() * (context.canvas.height - 0 + 1))/25)*25


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




return(
    <form  >
        <div className={classes.LCGameModeBorder}>

                <LCCanvas ref ={canvasRef} className={classes.LCGameModePicture} />



                <LCInput type = 'text' 
                name = 'userAnswer'
                placeholder = 'Enter LC character name' 
                onChange={(event) => setUserAnswer(event.target.value)}/>
                
                <LCButton onClick = {(e) => 
                                        {e.preventDefault();
                                            if (LCAnswerCheck(userAnswer, gameMode1Answer)) {
                                                canvasClear()
                                            }
                                            else {
                                                UnDraw(xArr,yArr)
                                            }
                                        }
                                    } > Confirm </LCButton>



        </div>
    </form>
    

);
};

export default LCGameMode1Menu;
