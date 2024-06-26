export class Boat{
    constructor(img, stageWidth){
        this.img = img;
        this.totalFrame = 8;
        this.curFrame = 0;

        // 그림 한 장의 실제 넓이와 높이
        this.imgWidth =1280;
        this.imgHeight = 720;

        //화면에 그려질 이미지의 넓이와 높이
        //레티나 디스플레이를 고려해 scale(2,2)를 한 상황
        //따라서 화면에 그려질 이미지의 크기를 실제 이미지의 절반씩으로 줄인다.
        this.boatWidth = 640;
        this.boatHeight = 360;

        // 배가 화면 밖에서 등장하도록 설정
        this.boatWidthhalf = this.boatWidth/2;
        this.x = stageWidth ;
        this.y = 0;
        this.speed =  2;

        this.fps = 24;
        this.fpsTime = 1000/this.fps;
    }

    draw(ctx,t,dots){
        
        this.animate(ctx,dots);
    }

    animate(ctx,dots){
        this.x -= this.speed;
        const closest = this.getY(this.x,dots);
        this.y = closest.y;

        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.fillStyle = '#000000';
        ctx.drawImage(
            this.img,
            -this.boatWidthhalf,
            -this.boatHeight + 90,
            this.boatWidth,
            this.boatHeight
        );
        ctx.restore(); // 저장했던 캔버스 복구
    }

    // 현재 boat가 어느 점에 있나 찾기
    // step 1 : 현재 boat가 어느 커브를 지나나 찾기
    getY(x,dots){
        for(let i = 1 ; i < dots.length ; i++){
            if(x >= dots[i].x1 && x <= dots[i].x3){
                return this.getY2(x,dots[i]);
            }
        }
        {
            return {
                y : 0,
                rotation : 0
            }
        }
    }

    // step2 
    // 찾은 함수의 어느 점을 지나고 있나 찾기 
    getY2(x,dot){
        let pt = this.getPointOnQuad(dot.x1, dot.y1,dot.x2,dot.y2,dot.x3,dot.y3,0);
        let prevX = pt.x;
        const total = 200;
        for(let i = 1; i < total ; i++){
            const t = i / total;
            pt = this.getPointOnQuad(dot.x1, dot.y1,dot.x2,dot.y2,dot.x3,dot.y3,t);

            if(x >= prevX && x <= pt.x){
                return pt;
            }
            prevX = pt.x;
        }
        return pt;
    }


    // Bezier Curve에서 t일 때의 값 알아내는 함수
    getQuadValue(p0,p1,p2,t){
        return (1-t)*(1-t)*p0 + 2*(1-t)*t*p1 + t*t*p2;
    }

    // Bezier Curve에서 t일 때의 x,y 값 알아내는 함수
    getPointOnQuad(x1,y1,x2,y2,x3,y3,t){
        return{
            x : this.getQuadValue(x1,x2,x3,t),
            y : this.getQuadValue(y1,y2,y3,t),
        }
    }
}