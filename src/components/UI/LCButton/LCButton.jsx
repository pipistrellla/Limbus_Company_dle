import React, { useState } from "react";
import classes from './LCButton.module.css';

const LCButton = ({children , visible, ...props}) => {

    const rootClass = [classes.LCButton]
    const [count, setCount] = useState(0)

    if (visible === false)  {
        if (count === 0){
            rootClass.push(classes.none)
        } else if (count === 1){
            rootClass.push(classes.hide);
            setTimeout(()=> setCount(0), 390 )
        }

    } else if ((visible === true) && (count === 0)){
        rootClass.push(classes.show)
        setTimeout(()=> {setCount(1); rootClass.pop()}, 390 )}


    return (

        
        <button {...props} className = {rootClass.join(' ')}>
            {children}
        
        </button>
    );
        

}

export default  LCButton;