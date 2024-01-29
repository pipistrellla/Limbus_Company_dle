export class RandomImage {
    x: number;
    y: number;
    size: number;
    angle: number;
    image: CanvasImageSource;
    ctx: CanvasRenderingContext2D;
    speed: number;

    constructor(x:number,y:number, image:CanvasImageSource, angle:number, size:number, ctx:CanvasRenderingContext2D,speed:number){
        this.x = x;
        this.y = y 
        this.size = size 
        this.ctx = ctx 
        this.image = image;
        this.angle = angle;
        this.speed = speed;

    }


    draw() {
        this.ctx.save();
        this.ctx.translate(this.x,this.y);
        this.ctx.rotate(this.angle * (Math.PI / 360)); 

        this.ctx.drawImage(this.image, -this.size/2 , -this.size/2, this.size, this.size);
        
        this.ctx.restore();
    }

    update(canvas: HTMLCanvasElement) {
        
        this.y = (this.y > canvas.height + 100) ? this.y : this.y + this.speed
        this.speed = (this.speed  > 10)? this.speed : this.speed * 1.005
        // дрожание
        // this.x += (Math.floor(Math.random() * 10)%2 === 0 ) ? Math.floor(Math.random() * 4) : -Math.floor(Math.random() * 4)
        this.angle += 10
        // if (this.y > canvas.height*1.2) {
        //     this.y = -this.size*2
        // }
    }
}