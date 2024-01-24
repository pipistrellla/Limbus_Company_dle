import React from "react";
import classes from "./LCModal.module.css";

const LCInput = React.forwardRef((props, ref) => {
    return (
        <input ref= {ref} className={classes.LCInput} {...props}/>
    );

});


export default LCInput;