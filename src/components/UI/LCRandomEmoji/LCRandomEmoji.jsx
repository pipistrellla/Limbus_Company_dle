import React, { useEffect, useRef } from 'react'
import classes from './LCRandomEmoji.module.css'
import { RandomImage } from './randomImage.ts'

import correct from '../../../images/LCRandomImage/rignt/correct.png'
import correct1 from '../../../images/LCRandomImage/rignt/correct1.png'
import correct2 from '../../../images/LCRandomImage/rignt/correct2.png'
import correct3 from '../../../images/LCRandomImage/rignt/correct3.png'

import incorrect1 from '../../../images/LCRandomImage/wrong/incorrect1.png'
import incorrect2 from '../../../images/LCRandomImage/wrong/incorrect2.png'
import incorrect3 from '../../../images/LCRandomImage/wrong/incorrect3.png'
import incorrect4 from '../../../images/LCRandomImage/wrong/incorrect4.png'

const LCRandomEmoji = () => {

    const canvasRef = useRef(null)
    
    let image = new Image(50,50)
    let image1 = new Image(50,50)
    let image2 = new Image(50,50)
    let image3 = new Image(50,50)

    image.src = correct
    image1.src = correct1
    image2.src = correct2
    image3.src = correct3
    const images = [image, image1 ,image2,image3]

    const particles = []
    useEffect(() => {

        const canvas = canvasRef.current
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
        const ctx =  canvas.getContext('2d')



        if (particles.length === 0){
            for (let i = 0; i< 100; i++)
            particles.push(
                new RandomImage(
                    Math.random() * canvas.width,
                    Math.random() * canvas.height,
                    images[Math.floor(Math.random() * 3)],
                    Math.random * 360,
                    +80,
                    ctx               
                )
            )
        }

        

        const render = () => {
            ctx.clearRect(0,0,canvas.width, canvas.height)
            particles.forEach((particle) => {
                particle.draw();
                particle.update(canvas)

            } )
            requestAnimationFrame(render)
        }

        image.onload = render(ctx, canvas)


    }, )


    return (
        <canvas ref = { canvasRef } className={classes.canvas}></canvas>
        
    )
}

export default LCRandomEmoji