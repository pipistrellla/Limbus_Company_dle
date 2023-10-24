import React from "react";
import classes from './LCGameMode2Menu.module.css';
import LCInput from "../LCInput/LCInput";
import LCButton from '../LCButton/LCButton'

const LCGameMode2Menu = () => {
return(
    <form>
        <div className={classes.LCGameModeBorder}>
            
            <div className={classes.LCSkill}> </div>
            <div className={classes.LCPassive}> </div>
            <div className={classes.LCSupport}> </div>
            
            <LCInput/>
            <LCButton> Confirm </LCButton>



        </div>
    </form>
    

);
};

export default LCGameMode2Menu;
