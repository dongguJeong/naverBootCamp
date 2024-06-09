import { Boat } from "./boat.js";

export class BoatController{
    constructor(){
        this.img = new Image();
        this.img.onload = () => {
            this.loaded();
        }
        this.img.src = './img/boat2.gif';
        this.item = null;
        this.cur = 0;
        this.isLoaded = false;
    }

    resize(stageWidth,stageHeight){
        this.stageWidth = stageWidth;
        this.stageHeight = stageHeight;
    }

    loaded(){
        this.isLoaded = true;
        this.addBoat();
    }

    addBoat(){
        this.item =new Boat(this.img, this.stageWidth);
    }

    draw(ctx, t, dots){
        if(this.isLoaded){
            // 화면 밖으로 나가면 원점으로
            if(this.item.x < -this.item.boatWidth){
                this.item.x = this.stageWidth + this.item.boatWidth/4;
            }
            this.item.draw(ctx, t, dots);
        }
    }
}
