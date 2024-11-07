
const gameArea = document.getElementById("game-area")
const paddle = document.getElementById("paddle")
const ball = document.getElementById("ball")
const brickArea = document.getElementById("brick-area")
gameArea.addEventListener("click", togglePause);
//paddle pos
let paddleX = 300 //mid pos
//ball postion
let ballX = paddleX
let ballY = 950
let ballSpeedX = 0
let ballSpeedY = 2
let score = 0
let maxSpeedX = 2;
ballSpeedX = Math.max(-maxSpeedX, Math.min(maxSpeedX, ballSpeedX));
let level = 1
let levelspeed = 5


let paused = false
//bricks
let rows = 5
let col = 8
const bW = 80
const bH = 20
const bPadding = 10
let start = false
let hitpointMul = 4
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

function togglePause(e) {
  if (e.button === 0) {
      paused = !paused;
      if (!paused){
        update(); 
      
      } 
        
  }
}

  function mose(e){
    if (paused) return;
    let gameAreaRect = gameArea.getBoundingClientRect()
    let newPadx = e.clientX - gameAreaRect.left 

    if (newPadx < 52) newPadx = 52;
    if (newPadx > 750) {
      newPadx = 745 ;
   }
    paddle.style.left = `${newPadx}px`; 
    paddleX = newPadx
  }

  
  document.addEventListener("keydown", startG);
  function startG(e){
    if (e.key === " " && !start){
      ballX = paddleX
      start = true
      requestAnimationFrame(update)
    }
    }
  
  
  
  let c = 0
  let lives = 3


  function resetGame() {
    brickArea.innerHTML = ""
    createBricks()
    // Reset ball position and speed
    ballX = paddleX;
    ballY = 900;
    ballSpeedX = 0;
    ballSpeedY = 2;
    score = 0
    maxSpeedX = 2 
    lives = 3
    level = 1 
    // Reset game state
    start = false;
   
  }      
  function update(){
    if (paused) return;
    document.getElementById("score").textContent = `Score: ${score}`
    document.getElementById("lives").textContent = `Lives: ${lives}`
    document.getElementById("speed").textContent = `level: ${level} speed ${maxSpeedX}`
   
    gameArea.addEventListener("mousemove", mose);
  
    ballY += -ballSpeedY
    ballX += ballSpeedX
    if (ballX <= 0 || ballX >= gameArea.clientWidth - ball.clientWidth) {
        ballSpeedX = -ballSpeedX
    }
    if (ballY <= 0) {
        ballSpeedY = -ballSpeedY
    }
    
    if (ballY > gameArea.clientHeight) {
      ballSpeedY = -ballSpeedY
      lives--
      if (lives === 0){
        resetGame(); 
      }

    
    }
   


    let padRect = paddle.getBoundingClientRect();
    const ballRect = ball.getBoundingClientRect();


   
    if (
      ballSpeedY < 0 && // Only detect collision when the ball is moving downward
      ballRect.left < padRect.right &&
      ballRect.right > padRect.left &&
      ballRect.top < padRect.bottom &&
      ballRect.bottom > padRect.top
    ) {

      ballSpeedY = -ballSpeedY;
      const hitPoint = (ballX - paddleX) / (100 - 0.5); // from -0.5 to 0.5
      c++
      console.log("🚀 ~ update ~ c:", c)
        if (c == 2){
          c = 0
          
          if (ballSpeedY < levelspeed ){
            maxSpeedX++
            ballSpeedY++
            hitpointMul += 1
          }
        }
          console.log("🚀 ~ update ~ ballSpeedX:", ballSpeedY)
   
       ballSpeedX += hitPoint * hitpointMul 
       ballSpeedX = Math.max(-maxSpeedX, Math.min(maxSpeedX, ballSpeedX)) // Add slight variation to X speed based on hit point
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
    score += 100

    // better hit cola
    const leftHit = ballRect.right - brickRect.left
    const rightHit = brickRect.right- ballRect.left
    const TopHit = ballRect.bottom - brickRect.top
    const bottomHit =brickRect.bottom-ballRect.top

    const minHit = Math.min(leftHit, rightHit, TopHit, bottomHit)
    if (minHit === leftHit || minHit === rightHit){
      ballSpeedX = -ballSpeedX
    }
    if (minHit === TopHit || minHit === bottomHit){
      ballSpeedY = -ballSpeedY
    }
  }
});
if (brickArea.querySelectorAll(".brick").length === 0 && ballY >= 500 ) {
  level++ 
  levelspeed += 2
  createBricks();

}
ball.style.left = `${ballX}px`;
ball.style.top = `${ballY}px`;

  requestAnimationFrame(update);
}
// update()
