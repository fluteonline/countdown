var countdown = {
    WINDOW_WIDTH : 1024,
    WINDOW_HEIGHT : 768,
    //圆半径
    RADIUS : 8,
    //每个数字距离画布上边距的距离
    MARGIN_TOP : 60,
    //第一个数字距离画布左边距的距离
    MARGIN_LEFT : 30,
    ctx : null,
    //结束时间
    endTime : new Date('2016/4/26,10:00:00'),
    curShowTimeSeconds : 0,
    balls: [],

    init:function(){
        var canvas = document.getElementById('canvas');
        countdown.ctx = canvas.getContext('2d');

        canvas.width = countdown.WINDOW_WIDTH;
        canvas.height = countdown.WINDOW_HEIGHT;
        countdown.curShowTimeSeconds = countdown.getCurrentShowTimeSeconds();
    },

    responsive:function(){
        countdown.WINDOW_WIDTH = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        countdown.WINDOW_HEIGHT = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
        countdown.RADIUS = Math.round(countdown.WINDOW_WIDTH * 4./ 5 /108) - 1;
        countdown.MARGIN_TOP = Math.round(countdown.WINDOW_HEIGHT / 5);
        countdown.MARGIN_LEFT = Math.round(countdown.WINDOW_WIDTH / 10);
    },

    getCurrentShowTimeSeconds:function(){
        var curTime = new Date(),
            ret = countdown.endTime.getTime() - curTime.getTime();
        ret = Math.round(ret/1000);

        return ret >= 0? ret:0;
    },

    update:function(){
        var nextShowTimeSeconds = countdown.getCurrentShowTimeSeconds(),
            curShowTimeSeconds = countdown.curShowTimeSeconds,
            nextHours = parseInt(nextShowTimeSeconds/(60*60)),
            nextMinutes = parseInt(nextShowTimeSeconds/60%60),
            nextSeconds = nextShowTimeSeconds % 60,
            curHours = parseInt(curShowTimeSeconds/(60*60)),
            curMinutes = parseInt(curShowTimeSeconds/60%60),
            curSeconds = curShowTimeSeconds % 60,
            MARGIN_LEFT = countdown.MARGIN_LEFT,
            MARGIN_TOP = countdown.MARGIN_TOP,
            RADIUS = countdown.RADIUS;

        if(nextSeconds != curSeconds){
            if(parseInt(curHours/10) != parseInt(nextHours/10)){
                countdown.addBalls(MARGIN_LEFT,MARGIN_TOP,parseInt(curHours/10));
            }
            if(parseInt(curHours%10) != parseInt(nextHours%10)){
                countdown.addBalls(MARGIN_LEFT+15*(RADIUS+1),MARGIN_TOP,parseInt(curHours%10));
            }
            if(parseInt(curMinutes/10) != parseInt(nextMinutes/10)){
                countdown.addBalls(MARGIN_LEFT+39*(RADIUS+1),MARGIN_TOP,parseInt(curMinutes/10));
            }
            if(parseInt(curMinutes%10) != parseInt(nextMinutes%10)){
                countdown.addBalls(MARGIN_LEFT+54*(RADIUS+1),MARGIN_TOP,parseInt(curMinutes%10));
            }
            if(parseInt(curSeconds/10) != parseInt(nextSeconds/10)){
                countdown.addBalls(MARGIN_LEFT+78*(RADIUS+1),MARGIN_TOP,parseInt(curSeconds/10));
            }
            if(parseInt(curSeconds%10) != parseInt(nextSeconds%10)){
                countdown.addBalls(MARGIN_LEFT+93*(RADIUS+1),MARGIN_TOP,parseInt(curSeconds%10));
            }
            countdown.curShowTimeSeconds = nextShowTimeSeconds;
        }

        countdown.updateBalls();
    },

    updateBalls:function(){
        var i,
            //len = countdown.balls.length,
            WINDOW_HEIGHT = countdown.WINDOW_HEIGHT,
            WINDOW_WIDTH = countdown.WINDOW_WIDTH,
            RADIUS = countdown.RADIUS,
            cnt = 0,
            balls = countdown.balls,
            len = balls.length;

        for(i=0;i<len;i++){
            balls[i].x += balls[i].vx;
            balls[i].y += balls[i].vy;
            balls[i].vy += balls[i].g;

            if(balls[i].y >= WINDOW_HEIGHT-RADIUS){
                balls[i].y = WINDOW_HEIGHT-RADIUS;
                balls[i].vy = -balls[i].vy*0.75;
            }
        }

        for(i=0;i<len;i++){
            if(balls[i].x + RADIUS > 0 && balls[i].x - RADIUS < WINDOW_WIDTH){
                balls[cnt++] = balls[i];
            }
        }

        countdown.balls = balls;

        //for(i=0;i<len;i++){
        //    countdown.balls[i].x += countdown.balls[i].vx;
        //    countdown.balls[i].y += countdown.balls[i].vy;
        //    countdown.balls[i].vy += countdown.balls[i].g;
        //
        //    if(countdown.balls[i].y >= WINDOW_HEIGHT-RADIUS){
        //        countdown.balls[i].y = WINDOW_HEIGHT-RADIUS;
        //        countdown.balls[i].vy = -countdown.balls[i].vy*0.75;
        //    }
        //}
        //
        //for(i=0;i<len;i++){
        //    if(countdown.balls[i].x + RADIUS > 0 && countdown.balls[i].x - RADIUS < WINDOW_WIDTH){
        //        countdown.balls[cnt++] = countdown.balls[i];
        //    }
        //}

        countdown.balls.splice(Math.min(300,cnt));
    },

    addBalls:function(x,y,num){
        var aBall,
            digit = countdown.digit,
            RADIUS = countdown.RADIUS;

        for(var i=digit[num].length-1;i>=0;i--){
            for(var j=digit[num][i].length-1;j>=0;j--){
                if(digit[num][i][j]==1){
                    aBall = {
                        x:x+j*2*(RADIUS+1)+(RADIUS+1),
                        y:y+i*2*(RADIUS+1)+(RADIUS+1),
                        g:1.5+Math.random(),
                        vx:Math.pow(-1,Math.ceil(Math.random()*1000))*4,
                        vy:-5,
                        color:'hsl('+Math.round(Math.random()*360)+',50%,70%)'
                    };

                    countdown.balls.push(aBall);
                }
            }
        }
    },

    render:function(ctx){
        ctx.clearRect(0,0,countdown.WINDOW_WIDTH,countdown.WINDOW_HEIGHT);

        var curShowTimeSeconds = countdown.curShowTimeSeconds,
            hours = parseInt(curShowTimeSeconds/(60*60)),
            minutes = parseInt(curShowTimeSeconds/60%60),
            seconds = curShowTimeSeconds % 60,
            MARGIN_LEFT = countdown.MARGIN_LEFT,
            MARGIN_TOP = countdown.MARGIN_TOP,
            RADIUS = countdown.RADIUS,
            balls = countdown.balls;

        countdown.renderDigit(MARGIN_LEFT,MARGIN_TOP,parseInt(hours/10),ctx);
        countdown.renderDigit(MARGIN_LEFT+(7*2+1)*(RADIUS+1),MARGIN_TOP,parseInt(hours%10),ctx);
        countdown.renderDigit(MARGIN_LEFT+(15*2)*(RADIUS+1),MARGIN_TOP,10,ctx);
        countdown.renderDigit(MARGIN_LEFT+(15*2+4*2+1)*(RADIUS+1),MARGIN_TOP,parseInt(minutes/10),ctx);
        countdown.renderDigit(MARGIN_LEFT+(45+9)*(RADIUS+1),MARGIN_TOP,parseInt(minutes%10),ctx);
        countdown.renderDigit(MARGIN_LEFT+(60+9)*(RADIUS+1),MARGIN_TOP,10,ctx);
        countdown.renderDigit(MARGIN_LEFT+(60+18)*(RADIUS+1),MARGIN_TOP,parseInt(seconds/10),ctx);
        countdown.renderDigit(MARGIN_LEFT+(75+18)*(RADIUS+1),MARGIN_TOP,parseInt(seconds%10),ctx);

        for(var i=balls.length-1;i>=0;i--){
            ctx.fillStyle = balls[i].color;
            ctx.beginPath();
            ctx.arc(balls[i].x,balls[i].y,RADIUS,0,2*Math.PI,true);
            ctx.closePath();
            ctx.fill();
        }
    },

    renderDigit:function(x,y,num,ctx){
        var digit = countdown.digit,
            RADIUS = countdown.RADIUS;
        ctx.fillStyle = 'rgb(0,102,153)';

        for(var i=digit[num].length-1;i>=0;i--){
            for(var j=digit[num][i].length-1;j>=0;j--){
                if(digit[num][i][j]==1){
                    ctx.beginPath();
                    ctx.arc(x+j*2*(RADIUS+1)+(RADIUS+1),y+i*2*(RADIUS+1)+(RADIUS+1),RADIUS,0,2*Math.PI);
                    ctx.closePath();

                    ctx.fill();
                }
            }
        }
    },

    run:function(){
        countdown.responsive();
        countdown.init();

        setInterval(function(){
            countdown.render(countdown.ctx);
            countdown.update();
        },50);
    },

    digit:
        [
            [
                [0,0,1,1,1,0,0],
                [0,1,1,0,1,1,0],
                [1,1,0,0,0,1,1],
                [1,1,0,0,0,1,1],
                [1,1,0,0,0,1,1],
                [1,1,0,0,0,1,1],
                [1,1,0,0,0,1,1],
                [1,1,0,0,0,1,1],
                [0,1,1,0,1,1,0],
                [0,0,1,1,1,0,0]
            ],//0
            [
                [0,0,0,1,1,0,0],
                [0,1,1,1,1,0,0],
                [0,0,0,1,1,0,0],
                [0,0,0,1,1,0,0],
                [0,0,0,1,1,0,0],
                [0,0,0,1,1,0,0],
                [0,0,0,1,1,0,0],
                [0,0,0,1,1,0,0],
                [0,0,0,1,1,0,0],
                [1,1,1,1,1,1,1]
            ],//1
            [
                [0,1,1,1,1,1,0],
                [1,1,0,0,0,1,1],
                [0,0,0,0,0,1,1],
                [0,0,0,0,1,1,0],
                [0,0,0,1,1,0,0],
                [0,0,1,1,0,0,0],
                [0,1,1,0,0,0,0],
                [1,1,0,0,0,0,0],
                [1,1,0,0,0,1,1],
                [1,1,1,1,1,1,1]
            ],//2
            [
                [1,1,1,1,1,1,1],
                [0,0,0,0,0,1,1],
                [0,0,0,0,1,1,0],
                [0,0,0,1,1,0,0],
                [0,0,1,1,1,0,0],
                [0,0,0,0,1,1,0],
                [0,0,0,0,0,1,1],
                [0,0,0,0,0,1,1],
                [1,1,0,0,0,1,1],
                [0,1,1,1,1,1,0]
            ],//3
            [
                [0,0,0,0,1,1,0],
                [0,0,0,1,1,1,0],
                [0,0,1,1,1,1,0],
                [0,1,1,0,1,1,0],
                [1,1,0,0,1,1,0],
                [1,1,1,1,1,1,1],
                [0,0,0,0,1,1,0],
                [0,0,0,0,1,1,0],
                [0,0,0,0,1,1,0],
                [0,0,0,1,1,1,1]
            ],//4
            [
                [1,1,1,1,1,1,1],
                [1,1,0,0,0,0,0],
                [1,1,0,0,0,0,0],
                [1,1,1,1,1,1,0],
                [0,0,0,0,0,1,1],
                [0,0,0,0,0,1,1],
                [0,0,0,0,0,1,1],
                [0,0,0,0,0,1,1],
                [1,1,0,0,0,1,1],
                [0,1,1,1,1,1,0]
            ],//5
            [
                [0,0,0,0,1,1,0],
                [0,0,1,1,0,0,0],
                [0,1,1,0,0,0,0],
                [1,1,0,0,0,0,0],
                [1,1,0,1,1,1,0],
                [1,1,0,0,0,1,1],
                [1,1,0,0,0,1,1],
                [1,1,0,0,0,1,1],
                [1,1,0,0,0,1,1],
                [0,1,1,1,1,1,0]
            ],//6
            [
                [1,1,1,1,1,1,1],
                [1,1,0,0,0,1,1],
                [0,0,0,0,1,1,0],
                [0,0,0,0,1,1,0],
                [0,0,0,1,1,0,0],
                [0,0,0,1,1,0,0],
                [0,0,1,1,0,0,0],
                [0,0,1,1,0,0,0],
                [0,0,1,1,0,0,0],
                [0,0,1,1,0,0,0]
            ],//7
            [
                [0,1,1,1,1,1,0],
                [1,1,0,0,0,1,1],
                [1,1,0,0,0,1,1],
                [1,1,0,0,0,1,1],
                [0,1,1,1,1,1,0],
                [1,1,0,0,0,1,1],
                [1,1,0,0,0,1,1],
                [1,1,0,0,0,1,1],
                [1,1,0,0,0,1,1],
                [0,1,1,1,1,1,0]
            ],//8
            [
                [0,1,1,1,1,1,0],
                [1,1,0,0,0,1,1],
                [1,1,0,0,0,1,1],
                [1,1,0,0,0,1,1],
                [0,1,1,1,0,1,1],
                [0,0,0,0,0,1,1],
                [0,0,0,0,0,1,1],
                [0,0,0,0,1,1,0],
                [0,0,0,1,1,0,0],
                [0,1,1,0,0,0,0]
            ],//9
            [
                [0,0,0,0],
                [0,0,0,0],
                [0,1,1,0],
                [0,1,1,0],
                [0,0,0,0],
                [0,0,0,0],
                [0,1,1,0],
                [0,1,1,0],
                [0,0,0,0],
                [0,0,0,0]
            ]//:
        ]
};

window.onload = function(){
    countdown.run();
};