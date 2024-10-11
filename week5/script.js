
// let board;
// let boardwidth=640;
// let boardheight=640;
// let context;

// let birdwidth=36;
// let birdheight=24;
// let birdx=boardwidth/8;
// let birdy=boardheight/2;
// let birdImg;

// let bird ={
//     x : birdx,
//     y:birdy,
//     width:birdwidth,
//     height:birdheight,
// }

// let pipeArray=[];
// let pipewidth=64;
// let pipeheight=512;
// let pipex=boardwidth;
// let pipey=0;
// let bottompipepic;
// let toppipepic;

// //pipemovement
// let speedx=2;


// window.onload =function (){
//     board=document.getElementById("board");
//     board.height=boardheight;
//     board.width=boardwidth;
//     context=board.getContext("2d");
//     context.fillRect(bird.x, bird.y, bird.width, bird.height);

//     birdpic= new Image();
//     birdpic.src="./assets/sprites/bluebird-midflap.png";
//     birdpic.onload =function(){
//         context.drawImage(bird.x, bird.y, bird.width, bird.height);
//     }
//     // context.drawImage(bird.x, bird.y, bird.width, bird.height);
//     toppipepic=new Image();
//     toppipepic.src="./assets/sprites/pipe-green-upper.png"
//     bottompipepic=new Image();
//     bottompipepic.src="./assets/sprites/pipe-green-upper.png";
//     requestAnimationFrame(update);
//     setInterval(placePipes, 1300);
// }

// function update(){
//     requestAnimationFrame(update);
//     context.clearReact(0,0,board.width, board.height);
//     context.drawImage(bird.x, bird.y, bird.width, bird.height);
//     for(i=0; i<pipeArray.length; i++){
//         let pipe=pipeArray[i];
//         pipe.x-=speedx;
//         context.drawImage(pipe.img, pipe.x, pipe.y, pipe.width, pipe.height);
//     }
// }

// function placePipes(){

//     let randompipey=pipey-pipeheight/4-Math.random()*(pipeheight/2);
//     let gap=board.height/4;

//     let toppipegreen= {
//         img: toppipepic,
//         x:pipex,
//         y:pipey,
//         width:pipewidth,
//         height:pipeheight,
//         passed: false,
//     }
//     pipeArray.push(toppipegreen);

//     let bottompiepegreen = {
//         img: bottompipepic,
//         x: pipex,
//         y:randompipey+pipeheight+gap,
//         width: pipewidth,
//         height: pipeheight,
//         passed: false,   
//     }
//     pipeArray.push(bottompiepegreen);
// }


//board
let board;
let boardWidth = 360;
let boardHeight = 640;
let context;

//bird
let birdWidth = 35; //width/height ratio = 408/228 = 17/12
let birdHeight = 24;
let birdX = boardWidth/8;
let birdY = boardHeight/2;
let birdImg;

let bird = {
    x : birdX,
    y : birdY,
    width : birdWidth,
    height : birdHeight
}

//pipes
let pipeArray = [];
let pipeWidth = 64; //width/height ratio = 384/3072 = 1/8
let pipeHeight = 512;
let pipeX = boardWidth;
let pipeY = 0;

let topPipeImg;
let bottomPipeImg;

//physics
let velocityX = -2; //pipes moving left speed
let velocityY = 0; //bird jump speed
let gravity = 0.4;

let gameOver = false;
let score = 0;

window.onload = function() {
    board = document.getElementById("board");
    board.height = boardHeight;
    board.width = boardWidth;
    context = board.getContext("2d"); //used for drawing on the board

    //draw flappy bird
    // context.fillStyle = "green";
    // context.fillRect(bird.x, bird.y, bird.width, bird.height);

    //load images
    birdImg = new Image();
    birdImg.src = "./assets/sprites/bluebird-midflap.png";
    birdImg.onload = function() {
        context.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);
    }

    // 
    
    
    // if(score<10){
        topPipeImg = new Image();
        topPipeImg.src = "./assets/sprites/pipe-green-upper.png";

        bottomPipeImg = new Image();
        bottomPipeImg.src = "./assets/sprites/pipe-green-lower.png";
        setInterval(placePipes, 5000);
    // }
    // if(score>=10){
    //     topPipeImg = new Image();
    //     topPipeImg.src = "./assets/sprites/pipe-red-upper.png";

    //     bottomPipeImg = new Image();
    //     bottomPipeImg.src = "./assets/sprites/pipe-red-lower.png";
    //     setInterval(placePipes, 2000);
    // }
    requestAnimationFrame(update);
    document.addEventListener("keydown", moveBird);
}

function update() {
    requestAnimationFrame(update);
    if (gameOver) {
        return;
    }
    context.clearRect(0, 0, board.width, board.height);

    //bird
    velocityY += gravity;

    bird.y = Math.max(bird.y + velocityY, 0);
    context.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);

    if (bird.y > board.height) {
        gameOver = true;
    }

    //pipes
    for (let i = 0; i < pipeArray.length; i++) {
        let pipe = pipeArray[i];
        pipe.x += velocityX;
        context.drawImage(pipe.img, pipe.x, pipe.y, pipe.width, pipe.height);

        if (!pipe.passed && bird.x > pipe.x + pipe.width) {
            score += 0.5; 
            pipe.passed = true;
        }

        if (detectCollision(bird, pipe)) {
            gameOver = true;
        }
    }

    //clear pipes
    while (pipeArray.length > 0 && pipeArray[0].x < -pipeWidth) {
        pipeArray.shift();
    }

    //score
    context.fillStyle = "white";
    context.font="45px sans-serif";
    context.fillText(score, 5, 45);

    if (gameOver) {
        context.fillText("GAME OVER", 5, 90);
    }
}

function placePipes() {
    if (gameOver) {
        return;
    }
    if(score>10){
        topPipeImg = new Image();
        topPipeImg.src = "./assets/sprites/pipe-red-upper.png";

        bottomPipeImg = new Image();
        bottomPipeImg.src = "./assets/sprites/pipe-red-lower.png";
    }

    //(0-1) * pipeHeight/2.
    // 0 -> -128 (pipeHeight/4)
    // 1 -> -128 - 256 (pipeHeight/4 - pipeHeight/2) = -3/4 pipeHeight
    let randomPipeY = pipeY - pipeHeight/4 - Math.random()*(pipeHeight/2);
    let openingSpace = board.height/4;

    let topPipe = {
        img : topPipeImg,
        x : pipeX,
        y : randomPipeY,
        width : pipeWidth,
        height : pipeHeight,
        passed : false
    }
    pipeArray.push(topPipe);

    let bottomPipe = {
        img : bottomPipeImg,
        x : pipeX,
        y : randomPipeY + pipeHeight + openingSpace,
        width : pipeWidth,
        height : pipeHeight,
        passed : false
    }
    pipeArray.push(bottomPipe);
}

function moveBird(e) {
    if (e.code == "Space" || e.code == "ArrowUp" || e.code == "KeyX") {
        //jump
        velocityY = -6;

        //reset game
        if (gameOver) {
            bird.y = birdY;
            pipeArray = [];
            score = 0;
            gameOver = false;
        }
    }
}

function detectCollision(a, b) {
    return a.x < b.x + b.width &&   
           a.x + a.width > b.x &&
           a.y < b.y + b.height &&  
           a.y + a.height > b.y;    
}