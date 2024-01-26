import React, {useRef} from "react";


const LCCanvas =  React.forwardRef((props, ref) => {

    
    return (
    <canvas
        ref = {ref}
        {...props}
        />)

});


export default LCCanvas;

// кнопки, которые пропадают при клике!! (идея не очень, но вполне можно реализовать для другого режима)
// рисуем квадраты по 25 px
// clearRect  для очистки
// полная очистка (0,0, context.canvas.width, context.canvas.height)

