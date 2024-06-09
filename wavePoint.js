export class WavePoint{
    constructor(index, x,y,MAX){

        //좌표 설정
        this.x = x;
        this.y = y;
        this.index = index;
        
        // y 절편
        this.fixedY = y;
        
        this.speed = 0.1;

        //몇 번 째 점인지
        //각 인덱스마다 다르게 움직이도록
        this.cur = index;

        //얼만큼 움직일 것인가 . 최고점
        this.MAX = MAX + 100;
    }

    // 아래 위로 움직이게 만드는 함수 
    update(){
        this.cur += this.speed;

        //sin 함수를 써서 일정 주기로 위아래로 반복 운동하게 함
        this.y = this.fixedY + Math.sin(this.cur) * this.MAX;
    }
}