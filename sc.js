const gameArea = document.getElementById("game-area")
const paddle = document.getElementById("paddle")
const ball = document.getElementById("ball")
const brickArea = document.getElementById("brick-area")

//ball postion
let ballX = 400
let ballY = 950
let ballSpeedX = 5
let ballSpeedY = -5

//paddle pos
let paddleX = 400 //mid pos
let paddleSpeed = 20

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

document.addEventListener("keydown",(e) => {
    if (e.key === "ArrowLeft" && paddleX > 0) {
            paddleX -= paddleSpeed
    }else if (e.key === "ArrowRight" && paddleX < gameArea.clientWidth - paddle.clientWidth) {
        paddleX += paddleSpeed
    }
    paddle.style.left = `${paddleX}px`
requestAnimationFrame(paddle);

})

function ballz(){
    ballX += ballSpeedX
    ballY += ballSpeedY

    if (ballX <= 0 || ballX >= gameArea.clientWidth - ball.clientWidth) {
        ballSpeedX = -ballSpeedX
    }
    if (ballY <= 0) {
        ballSpeedY = -ballSpeedY
    }
    if (
        ballY + ball.clientHeight >= gameArea.clientHeight - paddle.clientHeight &&
        ballX >= paddleX && 
        ballX <= paddleX + paddle.clientWidth
    ) {
        ballSpeedY = -ballSpeedY
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
    brick.remove();
    ballSpeedY = -ballSpeedY;
  }
});

// Game over condition
// if (ballY >= gameArea.clientHeight) {
//   alert("Game Over!");
//   document.location.reload();
// }

// Update ball position
ball.style.left = `${ballX}px`;
ball.style.top = `${ballY}px`;

requestAnimationFrame(ballz);
}


ballz();
