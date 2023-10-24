import React from "react";
import classes from "./LCInput.module.css";

const LCInput = React.forwardRef((props, ref) => {
    return (
        <input ref= {ref} className={classes.LCInput} {...props}/>
    );

});


export default LCInput;