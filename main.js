const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
const PI = Math.PI;
const cWidth = 320, cHeight = 200;
var renderMode = 1;
// canvas is 320*200
requestAnimationFrame(frameFunc);
var upKey = false, downKey = false, leftKey = false, rightKey = false;
var playerX = 171, playerY = 130, playerDirection = -2.5, playerSpeed = 2, playerFOV = 70/180*3.14;
var magicViewNumber = 0.6;

var walls = []; walls.push([100,100,100,25,25,25,25,100]);
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
var pointsDir = [];
var pointsDist = [];


//for actual rendering
    var wallsToRender = [];

if(renderMode == 0){ //starts drawing walls in mode0
    ctx.strokeStyle = "#ffffff";
    ctx.beginPath();
}

    var allRenderWalls1Dir = [];
    var allRenderWalls1Dist = [];

for(var wallOn = 0; wallOn<walls.length; wallOn+=2){
    if(renderMode == 0)ctx.moveTo(walls[wallOn][0], walls[wallOn][1]);  //draws wall points in mode0
    var thisRenderWall1Dir = [];
    var thisRenderWall1Dist = [];
    for(var i = 0; i<walls[wallOn].length;i++){

        if(renderMode == 0) ctx.lineTo(walls[wallOn][i],walls[wallOn][i+1]);


                wallDirTest = Math.atan2(walls[wallOn][i + 1] - playerY, walls[wallOn][i] - playerX);

            wallDirDist = Math.sqrt(Math.pow(walls[wallOn][i] - playerX,2)+ Math.pow(walls[wallOn][i + 1] - playerY,2));
            var angDiff = (playerDirection - wallDirTest + PI + 2*PI) % (2*PI) - PI;

            if(angDiff>0-playerFOV/2&&angDiff<playerFOV/2){

                if(!pointsDir.includes(wallDirTest)) {

                    pointsDir.push(wallDirTest);
                    pointsDist.push(wallDirDist);

                    thisRenderWall1Dir.push(angDiff);
                    thisRenderWall1Dist.push(wallDirDist);

                }

        }
    }
    allRenderWalls1Dir.push(thisRenderWall1Dir);
    allRenderWalls1Dist.push(thisRenderWall1Dist);
    }
//console.log(allRenderWalls1Dir[0])
    if(renderMode == 0) {
        ctx.closePath(); //close wall drawing
        ctx.stroke();
    }
playerDirection = playerDirection%(2*PI);

    if(renderMode == 0) {
        ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.strokeStyle = "#ffffff";
        ctx.moveTo(playerX, playerY);
        ctx.lineTo(playerX + (Math.cos(playerDirection - playerFOV / 2) * 8000), playerY + (Math.sin(playerDirection - playerFOV / 2) * 8000));
        ctx.moveTo(playerX, playerY);
        ctx.lineTo(playerX + (Math.cos(playerDirection + playerFOV / 2) * 8000), playerY + (Math.sin(playerDirection + playerFOV / 2) * 8000));
        ctx.stroke();

    for(var pOn = 0; pOn<pointsDir.length; pOn++){
    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.strokeStyle = "#24f5b3";
    ctx.moveTo(playerX, playerY);
    ctx.lineTo(playerX+(Math.cos(pointsDir[pOn])*pointsDist[pOn]), playerY+(Math.sin(pointsDir[pOn])*pointsDist[pOn]));
    ctx.stroke();
    ctx.closePath();
 //       console.log("did it")
    }
    }


    var newPointsDir = pointsDir.slice();
    var newPointsDist = pointsDist.slice();

    for(var sI = 0; sI<newPointsDist.length; sI++ ){ //sorts by distance while keeping directions attatched
        for(var sJ = 0; sJ<newPointsDist.length; sJ++){
            if(newPointsDist[sI]>newPointsDist[sJ]){
                var hold = newPointsDist[sI];
                newPointsDist[sI] = newPointsDist[sJ];
                newPointsDist[sJ] = hold;

                var hold2 = newPointsDir[sI];
                newPointsDir[sI] = newPointsDir[sJ];
                newPointsDir[sJ] = hold2;
            }
        }
    }

        if(renderMode ==1){
            for(var i = 0; i<allRenderWalls1Dir.length; i++){
                ctx.beginPath();
                ctx.fillStyle = "#fff000";
                ctx.strokeStyle = "#24f5b3";


                for(var j = 0; j<allRenderWalls1Dir[i].length; j++){
                    var pointDisplayX = (0-allRenderWalls1Dir[i][j] + magicViewNumber) /(magicViewNumber*2)*cWidth; //don't ask me how i got here

                    console.log(pointDisplayX)


if(j%2==0){
    ctx.lineTo(pointDisplayX,70);
    ctx.lineTo(pointDisplayX,90);}
else {
    ctx.lineTo(pointDisplayX, 90);
    ctx.lineTo(pointDisplayX, 70);
}

                    // }
                }
                ctx.fill();
                ctx.closePath();
            }

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