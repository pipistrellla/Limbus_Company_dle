import React from "react";
import classes from './LCGameMode3Menu.module.css';
import LCInput from "../LCInput/LCInput";
import LCButton from '../LCButton/LCButton'

const LCGameMode3Menu = () => {
return(
    <form>
        <div className={classes.LCGameModeBorder}>
            
            <div className={classes.LCEGO}> </div>

            
            <LCInput/>
            <LCButton> Confirm </LCButton>



        </div>
    </form>
    

);
};

export default LCGameMode3Menu;
