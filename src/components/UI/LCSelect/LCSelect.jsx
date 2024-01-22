import React from "react";
import  './LCSelect.css';

const LCSelect = ({options , defaultValue, value, onChange , visible}) => {

    const rootClass = ['LCSelect']

    if (visible) {
        rootClass.push('show')
    }

    return(
        <div className={rootClass.join(' ')}>
            <select
            value = {value}
            onChange = {event => onChange(event.target.value)}
            >
                <option disabled = {true} value ={defaultValue} > {defaultValue} </option>
                {options.map(option =>
                <option  key = {option.name} value={option.name}> {option.name} </option>)}
            </select>
        </div>
    )
}

export default LCSelect ;