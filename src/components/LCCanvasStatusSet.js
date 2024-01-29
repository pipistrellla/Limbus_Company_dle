export const LCCanvasStatusSet = (state) => {
    localStorage.setItem('canvasStatus' ,state)
    console.log(localStorage.getItem('canvasStatus'))
}