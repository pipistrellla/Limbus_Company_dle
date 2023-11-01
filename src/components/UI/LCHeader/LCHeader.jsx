import React from "react";
import LCButton from "../LCButton/LCButton";
import classes from './LCHeader.module.css';
import { Link } from "react-router-dom";


const LCHeader = () => {
    return (
        <div className={classes.LCHeaderText}>
            Try to guess Limbus Company Character
            <div className={classes.LCHeaderButton}>

            
                <LCButton onClick = {() => localStorage.clear() }  > settings </LCButton>
                <LCButton onClick = {() => console.log('hellow world!')}> 
                    <Link to= '/LCdle'> Limbus Companydle </Link> 
                </LCButton>

            </div>
        </div>
    );
}

export default  LCHeader;