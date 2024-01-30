import React, { useEffect, useRef, useState } from 'react'
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

const LCRandomEmoji = (canvasStatus) => {

    console.log(canvasStatus)
    console.log(canvasStatus.canvasStatus)
    const canvasRef = useRef(null)
    
    let image = new Image(50,50)
    let image1 = new Image(50,50)
    let image2 = new Image(50,50)
    let image3 = new Image(50,50)

    let inImage = new Image(50,50)
    let inImage1 = new Image(50,50)
    let inImage2 = new Image(50,50)
    let inImage3 = new Image(50,50)



    image.src = correct
    image1.src = correct1
    image2.src = correct2
    image3.src = correct3

    inImage.src = incorrect1
    inImage1.src = incorrect2
    inImage2.src = incorrect3
    inImage3.src = incorrect4

    const images = [image, image1 ,image2,image3]

    const inImages = [inImage,inImage1,inImage2,inImage3]

    const particles = []
    const inParticles = []
// генерация при верном ответе
    const render = () => {
        const canvas = canvasRef.current
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
        const ctx =  canvas.getContext('2d')

        if (particles.length === 0){
            for (let i = 0; i< 125; i++)
            particles.push(
                new RandomImage(
                    Math.random() * canvas.width,
                    -300,
                    images[Math.floor(Math.random() * 4)],
                    Math.random() * 360,
                    +40,
                    ctx,
                    Math.random() * 3             
                )
            )
        }

        ctx.clearRect(0,0,canvas.width, canvas.height)
        particles.forEach((particle) => {
            particle.draw();
            particle.update(canvas)

        } )
        requestAnimationFrame(render)
    }
// генерация при не верном ответе
    const inRender = () => {
        const canvas = canvasRef.current
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
        const ctx =  canvas.getContext('2d')

        if (inParticles.length === 0){
            for (let i = 0; i< 100; i++)
            inParticles.push(
                new RandomImage(
                    Math.random() * canvas.width,
                    -250,
                    inImages[Math.floor(Math.random() * 4)],
                    Math.random() * 360,
                    +40,
                    ctx,
                    Math.random() * 3             
                )
            )
        }

        ctx.clearRect(0,0,canvas.width, canvas.height)
        inParticles.forEach((particle) => {
            particle.draw();
            particle.update(canvas)

        } )
        requestAnimationFrame(inRender)
    }

    useEffect(() => {
        
        if (canvasStatus.canvasStatus === true){
            render()
        } else if (canvasStatus.canvasStatus ===false)
            inRender()


    },)

    
    return (
        <canvas ref = { canvasRef } className={classes.canvas}></canvas>
        
    )
}

export default LCRandomEmoji