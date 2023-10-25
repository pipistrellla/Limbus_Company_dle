import React, {useRef, useEffect} from "react";
import classes from './LCGameMode1Menu.module.css';
import LCInput from "../LCInput/LCInput";
import LCButton from '../LCButton/LCButton'
import LCCanvas from "../LCCanvas/LCCanvas";
import { useLCCanvasFill} from "../../hook/useLCCanvas";
import { LCFillBlack } from "../../LCFillBlack";
import { LCUndraw } from "../../LCUndraw";


const LCGameMode1Menu = () => {

    const canvasRef = useRef();

    useLCCanvasFill(canvasRef, LCFillBlack);


function UnDraw () {
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')
    LCUndraw(context,x,y);
    if (y >= context.canvas.height) {
        x+=25;
        y=-25;
    }
    y+=25;
}

let x = 0;
let y = 0;




return(
    <form  >
        <div className={classes.LCGameModeBorder}>

                <LCCanvas ref ={canvasRef} className={classes.LCGameModePicture} />


                <LCInput/>
                <LCButton onClick = {(e) => {e.preventDefault()
                                            UnDraw();
                                            }
                                    } > Confirm </LCButton>



        </div>
    </form>
    

);
};

export default LCGameMode1Menu;
