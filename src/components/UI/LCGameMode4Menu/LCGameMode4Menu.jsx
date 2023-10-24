import React from "react";
import classes from './LCGameMode4Menu.module.css';
import LCInput from "../LCInput/LCInput";
import LCButton from '../LCButton/LCButton'

const LCGameMode4Menu = () => {
return(
    <form>
        <div className={classes.LCGameModeBorder}>
            
            <div className={classes.LCEmoji}>  ⚔ 🚬 🚅 🧽 </div>
            
            <LCInput/>
            <LCButton> Confirm </LCButton>



        </div>
    </form>
    

);
};

export default LCGameMode4Menu;
