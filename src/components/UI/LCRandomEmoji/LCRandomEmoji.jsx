import React, { useEffect, useRef } from 'react'
import classes from './LCRandomEmoji.module.css'
import correct from '../../../images/LCRandomImage/rignt/correct.png'
import correct1 from '../../../images/LCRandomImage/rignt/correct1.png'
import correct2 from '../../../images/LCRandomImage/rignt/correct2.png'
import correct3 from '../../../images/LCRandomImage/rignt/correct3.png'

import incorrect1 from '../../../images/LCRandomImage/wrong/incorrect1.png'
import incorrect2 from '../../../images/LCRandomImage/wrong/incorrect2.png'
import incorrect3 from '../../../images/LCRandomImage/wrong/incorrect3.png'
import incorrect4 from '../../../images/LCRandomImage/wrong/incorrect4.png'

const LCRandomEmoji = () => {

    const render = (ctx, canvas) => {
        ctx.clearRect(0,0,canvas.width, canvas.height)
        ctx.drawImage(image, 10, 10, 50, 50);
        requestAnimationFrame(render)
    }
    const canvasRef = useRef(null)
    
    let image = new Image(100000,100000)
    image.src = correct

    

    useEffect(() => {

        const canvas = canvasRef.current
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
        const ctx =  canvas.getContext('2d')

        image.onload = render(ctx, canvas)
    })


    return (
        <canvas ref = { canvasRef } className={classes.canvas}></canvas>
        
    )
}

export default LCRandomEmoji