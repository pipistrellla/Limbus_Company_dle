// interface RandomImageProps {
//     x: number;
//     y: number;
//     size: number;
//     angle: number;
//     image: string;
//     ctx: CanvasRenderingContext2D;
// }


export class RandomImage {
    x: number;
    y: number;
    size: number;
    angle: number;
    image: CanvasImageSource;
    ctx: CanvasRenderingContext2D;

    constructor(x:number,y:number, image:CanvasImageSource, angle:number, size:number, ctx:CanvasRenderingContext2D){
        this.x = x;
        this.y = y 
        this.size = size 
        this.ctx = ctx 
        this.image = image;
        this.angle = angle;

    }


    draw() {
        this.ctx.save();
        this.ctx.translate(this.x,this.y);
        this.ctx.rotate(this.angle * (Math.PI / 360)); 
        this.ctx.drawImage(this.image, this.size , this.size, this.size, this.size);
        this.ctx.restore();
        console.log(this.angle)
    }

    update(canvas: HTMLCanvasElement) {
        this.y +=2
        // this.x += (Math.floor(Math.random() * 10)%2 === 0 ) ? Math.floor(Math.random() * 4) : -Math.floor(Math.random() * 4)
        this.angle +=1
        if (this.y > canvas.height*1.2) {
            this.y = -this.size*2
        }
        // if (this.x > canvas.width*1.2) {
        //     this.x = -this.size*2
        // }
    }
}