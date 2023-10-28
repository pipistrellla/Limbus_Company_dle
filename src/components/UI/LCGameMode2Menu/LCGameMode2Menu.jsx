import React, {useState, useRef} from "react";
import classes from './LCGameMode2Menu.module.css';
import LCInput from "../LCInput/LCInput";
import LCButton from '../LCButton/LCButton'
import LCCanvas from "../LCCanvas/LCCanvas";
import { useLCCanvasFill } from "../../hook/useLCCanvas";
import { LCFillBlack } from "../../LCFillBlack";
import {LCCanvasClear} from '../../LCCanvasClear';
import { LCAnswerCheck } from "../../LCAnswerCheck";



const LCGameMode2Menu = () => {
    let n = 0;
    const [userAnswer, setUserAnswer] = useState('');

    const canvasRefPassive = useRef();
    const canvasRefSupport = useRef();

    useLCCanvasFill(canvasRefPassive, LCFillBlack);
    useLCCanvasFill(canvasRefSupport, LCFillBlack);

    const gameMode2Answer = 'ryoshu'

    function canvasClearPassive(){
        const canvas = canvasRefPassive.current;
        const context = canvas.getContext('2d');
        LCCanvasClear(context);
    }

    function canvasClearSupport(){
        const canvas = canvasRefSupport.current;
        const context = canvas.getContext('2d');
        LCCanvasClear(context);
    }



return(
    <form>
        <div className={classes.LCGameModeBorder}>
            
            
            <div className={classes.LCFirstLine}>
                <LCCanvas ref ={canvasRefSupport} className={classes.LCSupport} />
                <LCCanvas ref ={canvasRefPassive} className={classes.LCPassive} />
            </div>


            <div className={classes.LCSecondLine}>

                <LCCanvas className={classes.LCSkill} />
                <LCInput 
                    style = {{minWidth: '500px' , height: '30%'}}
                    type = 'text' 
                    name = 'userAnswer'
                    placeholder = 'Enter LC character name' 
                    onChange={(event) =>   setUserAnswer(event.target.value)}/>

                <LCButton 
                    
                    onClick = {(e) => 
                        {e.preventDefault();
                            if (LCAnswerCheck(userAnswer, gameMode2Answer)) {
                                canvasClearPassive()
                                canvasClearSupport()
                            }
                            else {
                                canvasClearPassive()
                                if (n===1){
                                    canvasClearSupport()
                                    
                                }
                                n+=1
                            }
                        }
                    }> Confirm </LCButton>
            </div>



        </div>
    </form>
    

);
};

export default LCGameMode2Menu;
