import React from "react";
import classes from './LCButton.module.css';

const LCButton = ({children , visible, ...props}) => {

    const rootClass = [classes.LCButton]

    if (visible === false) {
        rootClass.push(classes.hide)
    }


    return (

        
        <button {...props} className = {rootClass.join(' ')}>
            {children}
        
        </button>
    );
        

}

export default  LCButton;