import React from "react";
import classes from './LCButton.module.css';

const LCButton = ({children , ...props}) => {
    return (

        
        <button {...props} className = {classes.LCButton}>
            {children}
        
        </button>
    );
        

}

export default  LCButton;