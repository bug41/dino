var canvas = document.getElementById("canvas");
var ctx = canvas.getContext('2d');

canvas.width = window.innerWidth - 100;
canvas.height = window.innerHeight - 100;

//ctx.fillStyle = 'green';
//ctx.fillRect(10,10, 100,100)

var dino = {
    x: 10,
    y: 200,
    width: 50,
    height: 50,
    draw() {
        ctx.fillStyle = 'green';
        //ctx.fillRect(this.x, this.y, this.width,this.height)
        ctx.drawImage(img1, this.x, this.y ,this.width,this.height)
    }
}

var img1 = new Image();
img1.src = 'dino.jpg';

var img2 = new Image();
img2.src = 'cactus.png';


class Cactus {
    constructor(){
        this.x = 500;
        this.y = 200;
        this.width = 30;
        this.height = 30;
    }

    draw() {
        ctx.fillStyle = 'red';
        //ctx.fillRect(this.x, this.y, this.width,this.height)
        ctx.drawImage(img2, this.x, this.y, this.width,this.height)
    }   
}

var cactus = new Cactus();
cactus.draw();

var timer = 0;
var cactusArr = [];
var jumpCheck = 0;
var animation;


function frameForStart(){
    animation =  requestAnimationFrame(frameForStart)
    timer++;

    ctx.clearRect(0,0 , canvas.width, canvas.height);
    
    if(timer % 200 === 0){
        var cactus = new Cactus();
        cactusArr.push(cactus);
    }

    cactusArr.forEach((a, i , o) => {
        //x좌표가 0 미만이면 제거
        if(a.x < 0){
            o.splice(i,1)
        }

        a.x--;

        collapseCheck(dino, a);

        a.draw();
        //cactus.draw();
    })
    
    if(jumping == true){
        dino.y--;
        jumpCheck++;
    }

    if(jumping == false){
        if(dino.y < 200){
            dino.y ++ ;
        }
    }

    if(jumpCheck > 100){
        jumping = false;
        jumpCheck = 0;
    }
    //dino.x++;  
    dino.draw()
}

frameForStart();

//충돌확인
function collapseCheck(dino, cactus){
    var gapX = cactus.x - (dino.x + dino.width) ;
    var gapY = cactus.y - (dino.y + dino.height) ;
    if(gapX < 0 && gapY < 0){
        console.log("꽥");
        ctx.clearRect(0,0, canvas.width, canvas.height);
        cancelAnimationFrame(animation);
    }
}

var jumping = false;
document.addEventListener('keydown', function(e){
    if(e.code === 'Space'){
        jumping = true;
    }
})