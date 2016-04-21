var WINDOW_WIDTH = 1024,
    WINDOW_HEIGHT = 768,
    //圆半径
    RADIUS = 8,
    //每个数字距离画布上边距的距离
    MARGIN_TOP = 60,
    //第一个数字距离画布左边距的距离
    MARGIN_LEFT = 30;

const endTime = new Date('2016/4/22,10:00:00');
var curShowTimeSeconds = 0;

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
        curShowTimeSeconds = nextShowTimeSeconds;
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
