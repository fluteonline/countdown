var WINDOW_WIDTH = 1024,
    WINDOW_HEIGHT = 768,
    //圆半径
    RADIUS = 8,
    //每个数字距离画布上边距的距离
    MARGIN_TOP = 60,
    //第一个数字距离画布左边距的距离
    MARGIN_LEFT = 30;

var canvas = document.getElementById('canvas'),
    context = canvas.getContext('2d');

canvas.width = WINDOW_WIDTH;
canvas.height = WINDOW_HEIGHT;

render(context);

function render(cxt){
    var hours = 12,
        minutes = 34,
        seconds = 56;

    renderDigit(MARGIN_LEFT,MARGIN_TOP,parseInt(hours/10),cxt);
    renderDigit(MARGIN_LEFT+(7*2+1)*(RADIUS+1),MARGIN_TOP,parseInt(hours%10),cxt);
    renderDigit(MARGIN_LEFT+(15*2)*(RADIUS+1),MARGIN_TOP,10,cxt);
    renderDigit(MARGIN_LEFT+(15*2+4*2+1)*(RADIUS+1),MARGIN_TOP,parseInt(minutes/10),cxt);
    renderDigit(MARGIN_LEFT+(45+9)*(RADIUS+1),MARGIN_TOP,parseInt(minutes%10),cxt);
    renderDigit(MARGIN_LEFT+(60+9)*(RADIUS+1),MARGIN_TOP,10,cxt);
    renderDigit(MARGIN_LEFT+(60+18)*(RADIUS+1),MARGIN_TOP,parseInt(seconds/10),cxt);
    renderDigit(MARGIN_LEFT+(75+18)*(RADIUS+1),MARGIN_TOP,parseInt(seconds%10),cxt);
}

function renderDigit(x,y,num,cxt){
    cxt.fillStyle = 'rgb(0,102,153)';

    for(var i=0;i<digit[num].length;i++){
        for(var j=0;j<digit[num][i].length;j++){
            if(digit[num][i][j]==1){
                cxt.beginPath();
                cxt.arc(x+j*2*(RADIUS+1)+(RADIUS+1),y+i*2*(RADIUS+1)+(RADIUS+1),RADIUS,0,2*Math.PI);
                cxt.closePath();

                cxt.fill();
            }
        }
    }

}