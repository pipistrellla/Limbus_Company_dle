import React, { useState } from "react";
import LCButton from "../LCButton/LCButton";
import classes from './LCHeader.module.css';
import { Link } from "react-router-dom";
import LCModal from "../LCModal/LCModal";
import LCSetting from "../LCSettings/LCSetting";



const LCHeader = () => {
    const [modal, setModal] =useState(false)
    return (
        <div className={classes.LCHeaderText}>
            Try to guess Limbus Company Character
            <div className={classes.LCHeaderButton}>

            
                <LCButton onClick = {() => setModal(true) }  > settings </LCButton>
                <LCModal visible={modal} setVisible={setModal}>
                    <LCSetting/>
                </LCModal>
                <LCButton onClick={()=> window.location.reload() }> 
                    <Link to= '/LCdle'> Limbus Companydle </Link> 
                </LCButton>

            </div>
        </div>
    );
}

export default  LCHeader;