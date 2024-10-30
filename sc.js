const gameArea = document.getElementById("game-area")
const paddle = document.getElementById("paddle")
const ball = document.getElementById("ball")
const brickArea = document.getElementById("brick-area")

//ball postion
let ballX = 400
let ballY = 950
let ballSpeedX = 3
let ballSpeedY = 4

//paddle pos
let paddleX = 400 //mid pos
let paddleSpeed = 2
let movingLeft = false; // Flag for left movement
let movingRight = false; // Flag for right movement

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

function player(e) {
  if (e.key === "ArrowLeft") {
    movingLeft = true; // Set left movement flag
  } else if (e.key === "ArrowRight") {
    movingRight = true; // Set right movement flag
  }
}

  function stopPaddleMovement(e) {
    if (e.key === "ArrowLeft") {
      movingLeft = false; // Clear left movement flag
    } else if (e.key === "ArrowRight") {
      movingRight = false; // Clear right movement flag
    }
  }

function update(){

    ballX += ballSpeedX
    ballY += ballSpeedY
    if (movingLeft && paddleX > 0) {
      paddleX -= paddleSpeed; // Move left
    }
    if (movingRight && paddleX < gameArea.clientWidth - paddle.clientWidth) {
      paddleX += paddleSpeed; // Move right
    }
  
    paddle.style.left = `${paddleX}px`; // Update paddle position
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

ball.style.left = `${ballX}px`;
ball.style.top = `${ballY}px`;

requestAnimationFrame(update);
requestAnimationFrame(player)
}
document.addEventListener("keydown", player);
document.addEventListener("keyup", stopPaddleMovement);

update()
