
const gameArea = document.getElementById("game-area")
const paddle = document.getElementById("paddle")
const ball = document.getElementById("ball")
const brickArea = document.getElementById("brick-area")
//ball postion
let ballX = 400
let ballY = 150
let ballSpeedX = 4
let ballSpeedY = 4
//paddle pos
let paddleX = 400 //mid pos
//bricks
let rows = 5
let col = 8
const bW = 80
const bH = 20
const bPadding = 10

function createBricks() {
    for (let row = 0; row < rows; row++){
      for (let colm = 0; colm < col; colm++){
        const brick = document.createElement("div")
        brick.classList.add("brick")
        brick.style.left = `${colm * (bW + bPadding)}px`;
        brick.style.top = `${row * (bH + bPadding)}px`;
        brickArea.appendChild(brick)
    }
}
}
createBricks()

  function mose(e){
    let gameAreaRect = gameArea.getBoundingClientRect()
    let paddleW = paddle.offsetWidth

    let newPadx = e.clientX - gameAreaRect.left - paddleW / 2


    if (newPadx < 0) newPadx = 0;
    if (newPadx > gameAreaRect.width - paddleW) {
      newPadx = gameAreaRect.width - paddleW;
   }
    paddle.style.left = `${newPadx}px`; 
    paddleX = newPadx
  }

function update(){
    ballY += ballSpeedY
    ballX += ballSpeedX
  
  
    if (ballX <= 0 || ballX >= gameArea.clientWidth - ball.clientWidth) {
        ballSpeedX = -ballSpeedX
    }
    if (ballY <= 0) {
        ballSpeedY = -ballSpeedY
    }
    

    let padRect = paddle.getBoundingClientRect();
    const ballRect = ball.getBoundingClientRect();


    if (
      ballSpeedY > 0 && // Only detect collision when the ball is moving downward
      ballRect.left < padRect.right &&
      ballRect.right > padRect.left &&
      ballRect.top < padRect.bottom &&
      ballRect.bottom > padRect.top
    ) {
      ballSpeedY = -ballSpeedY;
      ballSpeedX += (Math.random() - 0.5) * 0.2;
    }

     


    const bricks = document.querySelectorAll(".brick");
    bricks.forEach((brick) => {
    const brickRect = brick.getBoundingClientRect();
    const ballRect = ball.getBoundingClientRect();
   
  if (
    ballRect.left < brickRect.right &&
    ballRect.right > brickRect.left &&
    ballRect.top < brickRect.bottom &&
    ballRect.bottom > brickRect.top
  ) {
    brickArea.removeChild(brick);
    ballSpeedY = -ballSpeedY;
  }
});

ball.style.left = `${ballX}px`;
ball.style.top = `${ballY}px`;

requestAnimationFrame(update);
requestAnimationFrame(player)
}
gameArea.addEventListener("mousemove", mose);



update()
