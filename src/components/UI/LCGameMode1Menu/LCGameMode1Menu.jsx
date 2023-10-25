import React from "react";
import classes from './LCGameMode1Menu.module.css';
import LCInput from "../LCInput/LCInput";
import LCButton from '../LCButton/LCButton'

const LCGameMode1Menu = () => {
return(
    <form>
        <div className={classes.LCGameModeBorder}>
            <canvas className={classes.LCGameModePicture}>
            </canvas>
            
            <LCInput/>
            <LCButton> Confirm </LCButton>



        </div>
    </form>
    

);
};

export default LCGameMode1Menu;
