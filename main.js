const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

const SCREENWIDTH = 768;
const SCREENHEIGHT = 768;

var playerX = 150;
var playerY = 150;
var playerDirection = (0)/180*3.14;
var playerFOV = 80;

var startX = [200];
var startY = [0];
var endX = [310];
var endY = [0];

requestAnimationFrame(doFrame);
function doFrame(){
    playerDirection = playerDirection%4;
    ctx.beginPath();
    ctx.rect(0,0,1000,1000);
    ctx.fillStyle = "#9d8c8c";
    ctx.fill();
    ctx.closePath();
    console.log(playerDirection)
for(var i = 0; i<startX.length; i++){
    var dist1 = Math.sqrt(Math.pow(playerX-startX[i],2)+Math.pow(playerY-startY[i],2));
    var dir1 = playerDirection - Math.atan2(playerX-startX[i],playerY-startY[i]);
    var dist2 = Math.sqrt(Math.pow(playerX-endX[i],2)+Math.pow(playerY-endY[i],2));
    var dir2 = playerDirection - Math.atan2(playerX-endX[i],playerY-endY[i]);

    var polyXVals = [dir1*SCREENWIDTH/(playerFOV/180*3.14),dir1*SCREENWIDTH/(playerFOV/180*3.14),dir2*SCREENWIDTH/(playerFOV/180*3.14),dir2*SCREENWIDTH/(playerFOV/180*3.14)];
    var polyYVals = [(SCREENHEIGHT/2)+dist1,(SCREENHEIGHT/2)-dist1,(SCREENHEIGHT/2)-dist2,(SCREENHEIGHT/2)+dist1];
    // console.log(polyXVals[0],polyYVals[0])
    // console.log(polyXVals[1],polyYVals[1])
    // console.log(polyXVals[2],polyYVals[2])
    // console.log(polyXVals[3],polyYVals[3])
    ctx.fillStyle = '#ff0000';
    ctx.beginPath();
   for(var polyI = 0; polyI<polyXVals.length; polyI++){
       ctx.lineTo(polyXVals[polyI], polyYVals[polyI]);
   }
    ctx.closePath();
    ctx.fill();

}
    requestAnimationFrame(doFrame);
}