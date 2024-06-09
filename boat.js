export class Boat{
    constructor(img, stageWidth){
        this.img = img;
        this.totalFrame = 8;
        this.curFrame = 0;

        // 그림 한 장의 실제 넓이와 높이
        this.imgWidth =360;
        this.imgHeight = 300;

        //화면에 그려질 이미지의 넓이와 높이
        //레티나 디스플레이를 고려해 scale(2,2)를 한 상황
        //따라서 화면에 그려질 이미지의 크기를 실제 이미지의 절반씩으로 줄인다.
        this.boatWidth = 180;
        this.boatHeight = 150;

        // 배가 화면 밖에서 등장하도록 설정
        this.boatWidthhalf = this.boatWidth/2;
        this.x = stageWidth + this.boatWidth;
        this.y = 0;
        this.speed =  2;

        this.fps = 24;
        this.fpsTime = 1000/this.fps;
    }

    draw(ctx,t,dots){
        // requestAnimationFrame으로부터 받은 최초의 타임스탬프를 시간으로 정의한다
        if(!this.time){
            this.time = t;
        }

        // 애니메이션이 처음 시작된 후로부터 얼마나 지났는지 확인
        const now  = t- this.time;

        // fpsTime 보다 많이 지났다면 시간을 갱신해준다.
        if(now > this.fpsTime){
            this.time = t;
            this.curFrame += 1;

            // totalFrame보다 넘어가면 다시 0으로 초기화해서 반복될 수 있도록 한다
            if(this.curFrame == this.totalFrame){
                this.curFrame = 0;
            }
        }
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
            this.imgWidth * this.curFrame,
            0,
            this.imgWidth,
            this.imgHeight,
            -this.boatWidthhalf, 
            -this.boatHeight + 20, // 그림에서 생기는 여백만큼 플러스
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