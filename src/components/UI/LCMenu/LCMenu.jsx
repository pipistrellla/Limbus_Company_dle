import React from "react";
import classes from './LCMenu.module.css';
import LCButton from "../LCButton/LCButton";
import { Link } from "react-router-dom";


const LCMenu = () => {
    return (
        <div className={classes.LCMenuBorder}>
            <div className={classes.LCMenuMods}>

                <LCButton>
                    <Link to ='/LCdle/LCGM1'>Guess by picture</Link> 
                </LCButton> 

                <LCButton>
                    <Link to ='/LCdle/LCGM2'>Guess by skill or passive</Link>
                </LCButton>

                <LCButton>
                    <Link to ='/LCdle/LCGM3'>Guess by E.G.O</Link>
                </LCButton>

                <LCButton>
                    <Link to ='/LCdle/LCGM4'>Guess by emoji</Link>
                </LCButton>

            </div>


        </div>
    );
}

export default  LCMenu;