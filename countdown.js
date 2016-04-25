//var WINDOW_WIDTH = 1024,
//    WINDOW_HEIGHT = 768,
//    //圆半径
//    RADIUS = 8,
//    //每个数字距离画布上边距的距离
//    MARGIN_TOP = 60,
//    //第一个数字距离画布左边距的距离
//    MARGIN_LEFT = 30;
var WINDOW_WIDTH = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
    WINDOW_HEIGHT = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight,
//圆半径
    RADIUS = Math.round(WINDOW_WIDTH * 4 / 5 /108) - 1,
//每个数字距离画布上边距的距离
    MARGIN_TOP = Math.round(WINDOW_HEIGHT / 5),
//第一个数字距离画布左边距的距离
    MARGIN_LEFT = Math.round(WINDOW_WIDTH / 10);
//结束时间
const endTime = new Date('2016/4/27,10:00:00');
var curShowTimeSeconds = 0,
    balls = [];
const colors = ['#33b5e5','#09c','#a6c','#93c','#9c0','#690','#fb3','#f80','#f44','#c00'];

var canvas = document.getElementById('canvas'),
    context = canvas.getContext('2d');

canvas.width = WINDOW_WIDTH;
canvas.height = WINDOW_HEIGHT;

curShowTimeSeconds = getCurrentShowTimeSeconds();

setInterval(function(){
    render(context);
    update();
},50);


function getCurrentShowTimeSeconds(){
    var curTime = new Date(),
        ret = endTime.getTime() - curTime.getTime();
    ret = Math.round(ret/1000);

    return ret >= 0? ret:0;
}

function update(){
    var nextShowTimeSeconds = getCurrentShowTimeSeconds(),
        nextHours = parseInt(nextShowTimeSeconds/(60*60)),
        nextMinutes = parseInt(nextShowTimeSeconds/60%60),
        nextSeconds = nextShowTimeSeconds % 60,
        curHours = parseInt(curShowTimeSeconds/(60*60)),
        curMinutes = parseInt(curShowTimeSeconds/60%60),
        curSeconds = curShowTimeSeconds % 60;

    if(nextSeconds != curSeconds){
        if(parseInt(curHours/10) != parseInt(nextHours/10)){
            addBalls(MARGIN_LEFT,MARGIN_TOP,parseInt(curHours/10));
        }
        if(parseInt(curHours%10) != parseInt(nextHours%10)){
            addBalls(MARGIN_LEFT+15*(RADIUS+1),MARGIN_TOP,parseInt(curHours%10));
        }
        if(parseInt(curMinutes/10) != parseInt(nextMinutes/10)){
            addBalls(MARGIN_LEFT+39*(RADIUS+1),MARGIN_TOP,parseInt(curMinutes/10));
        }
        if(parseInt(curMinutes%10) != parseInt(nextMinutes%10)){
            addBalls(MARGIN_LEFT+54*(RADIUS+1),MARGIN_TOP,parseInt(curMinutes%10));
        }
        if(parseInt(curSeconds/10) != parseInt(nextSeconds/10)){
            addBalls(MARGIN_LEFT+78*(RADIUS+1),MARGIN_TOP,parseInt(curSeconds/10));
        }
        if(parseInt(curSeconds%10) != parseInt(nextSeconds%10)){
            addBalls(MARGIN_LEFT+93*(RADIUS+1),MARGIN_TOP,parseInt(curSeconds%10));
        }
        curShowTimeSeconds = nextShowTimeSeconds;
    }

    updateBalls();
}

function updateBalls(){
    var i,
        len = balls.length,
        cnt = 0;

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

    while(balls.length>Math.min(300,cnt)){
        balls.pop();
    }
}

function addBalls(x,y,num){
    var aBall;

    for(var i=digit[num].length-1;i>=0;i--){
        for(var j=digit[num][i].length-1;j>=0;j--){
            if(digit[num][i][j]==1){
                aBall = {
                    x:x+j*2*(RADIUS+1)+(RADIUS+1),
                    y:y+i*2*(RADIUS+1)+(RADIUS+1),
                    g:1.5+Math.random(),
                    vx:Math.pow(-1,Math.ceil(Math.random()*1000))*4,
                    vy:-5,
                    color:colors[Math.floor(Math.random()*colors.length)]
                    //color:'hsl('+Math.round(Math.random()*360)+',50%,70%)'
                };

                balls.push(aBall);
            }
        }
    }
}

function render(ctx){
    ctx.clearRect(0,0,WINDOW_WIDTH,WINDOW_HEIGHT);

    var hours = parseInt(curShowTimeSeconds/(60*60)),
        minutes = parseInt(curShowTimeSeconds/60%60),
        seconds = curShowTimeSeconds % 60;

    renderDigit(MARGIN_LEFT,MARGIN_TOP,parseInt(hours/10),ctx);
    renderDigit(MARGIN_LEFT+(7*2+1)*(RADIUS+1),MARGIN_TOP,parseInt(hours%10),ctx);
    renderDigit(MARGIN_LEFT+(15*2)*(RADIUS+1),MARGIN_TOP,10,ctx);
    renderDigit(MARGIN_LEFT+(15*2+4*2+1)*(RADIUS+1),MARGIN_TOP,parseInt(minutes/10),ctx);
    renderDigit(MARGIN_LEFT+(45+9)*(RADIUS+1),MARGIN_TOP,parseInt(minutes%10),ctx);
    renderDigit(MARGIN_LEFT+(60+9)*(RADIUS+1),MARGIN_TOP,10,ctx);
    renderDigit(MARGIN_LEFT+(60+18)*(RADIUS+1),MARGIN_TOP,parseInt(seconds/10),ctx);
    renderDigit(MARGIN_LEFT+(75+18)*(RADIUS+1),MARGIN_TOP,parseInt(seconds%10),ctx);

    for(var i=balls.length-1;i>=0;i--){
        ctx.fillStyle = balls[i].color;
        ctx.beginPath();
        ctx.arc(balls[i].x,balls[i].y,RADIUS,0,2*Math.PI,true);
        ctx.closePath();
        ctx.fill();
    }
}

function renderDigit(x,y,num,ctx){
    ctx.fillStyle = 'rgb(0,102,153)';

    for(var i=0;i<digit[num].length;i++){
        for(var j=0;j<digit[num][i].length;j++){
            if(digit[num][i][j]==1){
                ctx.beginPath();
                ctx.arc(x+j*2*(RADIUS+1)+(RADIUS+1),y+i*2*(RADIUS+1)+(RADIUS+1),RADIUS,0,2*Math.PI);
                ctx.closePath();

                ctx.fill();
            }
        }
    }

}
