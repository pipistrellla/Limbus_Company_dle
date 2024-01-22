import React, { useState } from "react";
import classes from './LCButton.module.css';

const LCButton = ({children , visible, ...props}) => {

    const rootClass = [classes.LCButton]
    const [count, setCount] = useState(0)

    if (visible === false)  {
        rootClass.push(classes.hide)
        if (count !==0){
            setCount(0)
        }
    }
    else if ((visible === true) && (count === 0)){
        rootClass.push(classes.show)
        setTimeout(()=> {setCount(1); rootClass.pop()}, 400 )
    } else if ((visible === true) && (count === 1)) {
        console.log(rootClass)
    }



    return (

        
        <button {...props} className = {rootClass.join(' ')}>
            {children}
        
        </button>
    );
        

}

export default  LCButton;