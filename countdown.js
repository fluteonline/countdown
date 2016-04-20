var WINDOW_WIDTH = 1024,
    WINDOW_HEIGHT = 768;

var canvas = document.getElementById('canvas'),
    context = canvas.getContext('2d');

canvas.width = WINDOW_WIDTH;
canvas.height = WINDOW_HEIGHT;

render(context);

function render(cxt){
    var hours = 12,
        minutes = 34,
        seconds = 56;

    renderDigit(0,0,parseInt(hours/10),cxt);
}

function renderDigit(x,y,num,cxt){
    cxt.fillstyle = 'rgb(0,102,153)';

    for(var i=0;i<digit[num].length;i++){
        for(var j=0;i<digit[num][i].length;j++){
            if(digit[num][i][j]==1){
                cxt.beginPath();
                cxt.arc();
                cxt.closePath();

                cxt.fill();
            }
        }
    }

}