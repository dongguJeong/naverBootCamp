import { WavePoint } from "./wavePoint.js";

export class Wave{
    constructor(totalPoints,color,MAX){
        this.totalPoints = totalPoints;
        this.color = color;
        this.wavePoints = [];
        this.MAX = MAX;
    }

    //resize 이벤트 설정
    //애니메이션을 그리려면 내가 그리고자 하는 애니메이션의 좌표값을 알아야함
    //따라서 애니메이션의 크기를 아는게 매우 매우 중요함
    resize(stageWidth, stageHeight){
        this.stageWidth = stageWidth;
        this.stageHeight = stageHeight;

        this.pointGap = this.stageWidth / (this.totalPoints -3);
        this.init();
    }

    init(){
       this.wavePoints = [];

       
       for(let i = 0 ; i < this.totalPoints ; i++){
            const wavePoint = new WavePoint(
                i,
                this.pointGap*i - 0.6*this.pointGap ,
                this.stageHeight/2,
                this.MAX,
            );
            this.wavePoints[i] = wavePoint;
       }
      
    }

    draw(ctx){
        ctx.beginPath();
        ctx.fillStyle = this.color;

        // 첫 번째와 마지막 점은 움직이지 않는다
        let prevX = this.wavePoints[0].x;
        let prevY = this.wavePoints[0].y;
        ctx.moveTo(prevX , prevY);

        let prevCx = prevX;
        let prevCy = prevY;

        let dots = [];

        for(let i = 1 ; i < this.totalPoints ; i++){
            if(i < this.totalPoints-1){
                this.wavePoints[i].update();
            }

            const cx = (prevX + this.wavePoints[i].x)/2;
            const cy = (prevY + this.wavePoints[i].y)/2;

            // prevX, prevY를 조절점으로 삼아 이전 cx,cy 와 
            // 현재 cx, cy를 잇는 부드러운 곡선을 그린다
            ctx.quadraticCurveTo(prevX,prevY,cx,cy);

            dots.push({
                x1 : prevCx,
                y1 : prevCy,
                x2 : prevX,
                y2 : prevY,
                x3 : cx,
                y3 : cy,
            });

            prevX = this.wavePoints[i].x;
            prevY = this.wavePoints[i].y;
            prevCx = cx;
            prevCy = cy;
        }

        ctx.lineTo(prevX,prevY);
        ctx.lineTo(this.stageWidth, this.stageHeight);
        ctx.lineTo(this.wavePoints[0].x , this.stageHeight);
        ctx.fill();
        ctx.closePath();

        return dots;
    }
}