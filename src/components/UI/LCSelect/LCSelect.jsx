import React, { useState } from "react";
import  './LCSelect.css';

const LCSelect = ({options , defaultValue, value, onChange , visible}) => {

    const rootClass = ['LCSelect']

    if (visible) {
        rootClass.push('show')
        console.log('123')
    }

    return(
        <div className={rootClass}>
            <select
            value = {value}
            onChange = {event => onChange(event.target.value)}
            >
                <option disabled = {true} value ={defaultValue} > {defaultValue} </option>
                {options.map(option =>
                <option  key = {option.value} value={option.value}> {option.name} </option>)}
            </select>
        </div>
    )
}

export default LCSelect ;