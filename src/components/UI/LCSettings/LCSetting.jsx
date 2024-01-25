import React from 'react'
import LCButton from '../LCButton/LCButton'
import classes from './LCSetting.module.css'

const LCSetting = () => {
    
    return(
        <div className={classes.settings}>
            <div>gm1 score: {((localStorage.getItem('gm1score') === null) ? 0 : localStorage.getItem('gm1score'))} </div>
            <div>gm2 score: {((localStorage.getItem('gm2score') === null) ? 0 : localStorage.getItem('gm2score'))} </div>
            <div>gm3 score: {((localStorage.getItem('gm3score') === null) ? 0 : localStorage.getItem('gm3score'))} </div>
            <div>gm4 score: {((localStorage.getItem('gm4score') === null) ? 0 : localStorage.getItem('gm4score'))}</div>
            <hr style={{    
                height: '2px',
                backgroundColor: 'burlywood',
                margin: '20px 0px 20px 0px',
                width: '100%',
                border: 'none'}}/>
            <LCButton onClick= {() => {localStorage.clear(); window.location.reload()}}>RESET ALL !!!</LCButton>
        </div>
    )
}

export default LCSetting