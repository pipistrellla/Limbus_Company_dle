import { useEffect } from "react";


export const useLCCanvasFill = (ref , drawFunc) => {

    useEffect(() => {
        const canvas = ref.current
        const context = canvas.getContext('2d')
        
        drawFunc(context);


    }, [])


};

