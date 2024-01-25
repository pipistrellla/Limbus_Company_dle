import React, { useState } from 'react'
import classes from './LCModal.module.css'

const LCModal = ({ children, visible, setVisible }) => {
    const rootClasses = [classes.LCModal]
    const contenClasses = [classes.LCModalContent]
    const [count, setCount] = useState(0)

    if (visible) {
        rootClasses.push(classes.active)
        contenClasses.push(classes.active)
        if (count===0)
            setCount(1)
    } else if (visible === false){
        if (count ===1){
            setTimeout(() => setCount(0), 900)
        } else if (count === 0 )
            rootClasses.push(classes.block)
    }
    
    return (
        <div
            className={rootClasses.join(' ')}
            onClick={() => setVisible(false)}
        >
            {/* для выхода из модалки по клику не по ней
             */}
            <div
                className={contenClasses.join(' ')}
                onClick={(event) => event.stopPropagation()}
            >
                {children}
            </div>
        </div>
    )
}

export default LCModal