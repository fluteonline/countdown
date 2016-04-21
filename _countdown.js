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
    endTime : new Date('2016/4/22,10:00:00'),
    curShowTimeSeconds : 0,

    init:function(){
        var canvas = document.getElementById('canvas');
        countdown.ctx = canvas.getContext('2d');

        canvas.width = countdown.WINDOW_WIDTH;
        canvas.height = countdown.WINDOW_HEIGHT;
        countdown.curShowTimeSeconds = countdown.getCurrentShowTimeSeconds();
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
            curSeconds = curShowTimeSeconds % 60;

        if(nextSeconds != curSeconds){
            countdown.curShowTimeSeconds = nextShowTimeSeconds;
        }
    },

    render:function(ctx){
        ctx.clearRect(0,0,countdown.WINDOW_WIDTH,countdown.WINDOW_HEIGHT);

        var curShowTimeSeconds = countdown.curShowTimeSeconds,
            hours = parseInt(curShowTimeSeconds/(60*60)),
            minutes = parseInt(curShowTimeSeconds/60%60),
            seconds = curShowTimeSeconds % 60;

        countdown.renderDigit(countdown.MARGIN_LEFT,countdown.MARGIN_TOP,parseInt(hours/10),ctx);
        countdown.renderDigit(countdown.MARGIN_LEFT+(7*2+1)*(countdown.RADIUS+1),countdown.MARGIN_TOP,parseInt(hours%10),ctx);
        countdown.renderDigit(countdown.MARGIN_LEFT+(15*2)*(countdown.RADIUS+1),countdown.MARGIN_TOP,10,ctx);
        countdown.renderDigit(countdown.MARGIN_LEFT+(15*2+4*2+1)*(countdown.RADIUS+1),countdown.MARGIN_TOP,parseInt(minutes/10),ctx);
        countdown.renderDigit(countdown.MARGIN_LEFT+(45+9)*(countdown.RADIUS+1),countdown.MARGIN_TOP,parseInt(minutes%10),ctx);
        countdown.renderDigit(countdown.MARGIN_LEFT+(60+9)*(countdown.RADIUS+1),countdown.MARGIN_TOP,10,ctx);
        countdown.renderDigit(countdown.MARGIN_LEFT+(60+18)*(countdown.RADIUS+1),countdown.MARGIN_TOP,parseInt(seconds/10),ctx);
        countdown.renderDigit(countdown.MARGIN_LEFT+(75+18)*(countdown.RADIUS+1),countdown.MARGIN_TOP,parseInt(seconds%10),ctx);
    },

    renderDigit:function(x,y,num,ctx){
        var digit = countdown.digit;
        ctx.fillStyle = 'rgb(0,102,153)';

        for(var i=0;i<digit[num].length;i++){
            for(var j=0;j<digit[num][i].length;j++){
                if(digit[num][i][j]==1){
                    ctx.beginPath();
                    ctx.arc(x+j*2*(countdown.RADIUS+1)+(countdown.RADIUS+1),y+i*2*(countdown.RADIUS+1)+(countdown.RADIUS+1),countdown.RADIUS,0,2*Math.PI);
                    ctx.closePath();

                    ctx.fill();
                }
            }
        }
    },

    run:function(){
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