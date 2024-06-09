import { BoatController } from "./boatController.js";
import { Wave } from "./wave.js";

const MAX = 5;

class App{
    constructor(){
        this.canvas = document.querySelector(".wave");
        this.ctx = this.canvas.getContext('2d');
        this.wave = new Wave(6,'rgb(33,150,243', MAX);
        this.boatController = new BoatController();
        window.addEventListener('resize',this.resize.bind(this),false);
        this.resize();
        requestAnimationFrame(this.animate.bind(this));
    }

    
    resize(){
        this.stageWidth = document.body.clientWidth;
        this.stageHeight = document.body.clientHeight;

        // 더블 사이즈로 지정해주면 레티나 디스플레이에서도 잘 보인다고 함
        this.canvas.width = this.stageWidth * 2;
        this.canvas.height = this.stageHeight * 2;
        this.ctx.scale(2,2);

        this.wave.resize(this.stageWidth,this.stageHeight);
        this.boatController.resize(this.stageWidth,this.stageHeight);
    }

    animate(t){
        requestAnimationFrame(this.animate.bind(this));
        this.ctx.clearRect(0,0,this.canvas.width, this.canvas.height);
        let dots = this.wave.draw(this.ctx);
        this.boatController.draw(this.ctx,t,dots);
    }
}


window.onload = () => {
    new App();
}
