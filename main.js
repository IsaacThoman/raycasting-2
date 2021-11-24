const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
const PI = Math.PI;
// canvas is 320*200
requestAnimationFrame(frameFunc);
var upKey = false, downKey = false, leftKey = false, rightKey = false;
var playerX = 150, playerY = 150, playerDirection = 0, playerSpeed = 2, playerFOV = 70/180*3.14;

var walls = []; walls.push([100,100,100,25,25,25,25,110]);
document.addEventListener("keydown", keyDownHandler, false);
function keyDownHandler(e) {
    if (e.keyCode === 38)  //up
        upKey = true;
    if (e.keyCode === 40)  //down
        downKey = true;
    if (e.keyCode === 37)  //left
        leftKey = true;
    if (e.keyCode === 39)  //right
        rightKey = true;
}
document.addEventListener("keyup", keyUpHandler, false);
function keyUpHandler(e) {
    if (e.keyCode === 38)  //up
        upKey = false;
    if (e.keyCode === 40)  //down
        downKey = false;
    if (e.keyCode === 37)  //left
        leftKey = false;
    if (e.keyCode === 39)  //right
        rightKey = false;
}

function frameFunc(){


    ctx.beginPath();
    ctx.rect(0 ,0, 1000, 1000);
    ctx.fillStyle = "#2a2a2a";
    ctx.fill();
    ctx.closePath();

var wallDirTest = 0;
var wallDirDist = 0;
var inViewTest = false;

    ctx.strokeStyle = "#ffffff";
    ctx.beginPath();
for(var wallOn = 0; wallOn<walls.length; wallOn+=2){
    ctx.moveTo(walls[wallOn][0], walls[wallOn][1]);
    for(var i = 0; i<walls[wallOn].length;i++){
        ctx.lineTo(walls[wallOn][i],walls[wallOn][i+1]);
        if(true) {

                wallDirTest = Math.atan2(walls[wallOn][i + 1] - playerY, walls[wallOn][i] - playerX);

            wallDirDist = Math.sqrt(Math.pow(walls[wallOn][i] - playerX,2)+ Math.pow(walls[wallOn][i + 1] - playerY,2));
            var angDiff = (playerDirection - wallDirTest + PI + 2*PI) % (2*PI) - PI;

            if(angDiff>0-playerFOV/2&&angDiff<playerFOV/2){
                ctx.beginPath();
                ctx.rect(walls[wallOn][i]-2 ,walls[wallOn][i+1]-2, 4, 4);
                ctx.fillStyle = "#ff0000";
                ctx.fill();
                ctx.closePath();
            }
        }
    }

    }
    ctx.closePath();
    ctx.stroke();
playerDirection = playerDirection%(2*PI);

    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.strokeStyle = "#ffffff";
    ctx.moveTo(playerX, playerY);
    ctx.lineTo(playerX+(Math.cos(playerDirection-playerFOV/2)*8000), playerY+(Math.sin(playerDirection-playerFOV/2)*8000));
    ctx.moveTo(playerX, playerY);
    ctx.lineTo(playerX+(Math.cos(playerDirection+playerFOV/2)*8000), playerY+(Math.sin(playerDirection+playerFOV/2)*8000));
    ctx.stroke();

    if(inViewTest){
    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.strokeStyle = "#24f5b3";
    ctx.moveTo(playerX, playerY);
    ctx.lineTo(playerX+(Math.cos(wallDirTest)*wallDirDist), playerY+(Math.sin(wallDirTest)*wallDirDist));
    ctx.stroke();
    }
    if(leftKey)
        playerDirection-=0.02;
    if(rightKey)
        playerDirection+=0.02;
    if(upKey){
        playerX+=Math.cos(playerDirection)*playerSpeed;
        playerY+=Math.sin(playerDirection)*playerSpeed;
    }
    if(downKey){
        playerX-=Math.cos(playerDirection)*playerSpeed;
        playerY-=Math.sin(playerDirection)*playerSpeed;
    }

    requestAnimationFrame(frameFunc);
}