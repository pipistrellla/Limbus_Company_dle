import React, { useState } from "react";
import  './LCSelect.css';

const LCSelect = ({options , defaultValue, value, onChange , visible, answer, ...props}) => {

    const rootClass = ['LCSelect']
    const [count, setCount] = useState(0)

    if (visible) {
        rootClass.push('show')
        if (count ===0)
            setCount(1)
    } else if (visible === false) {
        if (count === 1){
        rootClass.push('hide');
        setTimeout (() => setCount(0), 390)
        }
    }
    return(
        
        <div className={rootClass.join(' ')}>
            <select
            {...props}
            value = {value}
            
            onChange = {event => onChange(event.target.value)}
            >
                <option disabled = {true} value ={defaultValue} > {defaultValue} </option>
                {options.map(option => (option.characterName === answer) ?
                (<option  key = {option.name} value={option.name}> {option.name} </option>) : <div key = {option.name}></div>)}
            </select>
        </div>
    )
}

export default LCSelect ;