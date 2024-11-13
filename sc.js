
const gameArea = document.getElementById("game-area")
const paddle = document.getElementById("paddle")
const ball = document.getElementById("ball")
const fpsnum = document.getElementById("fps")
const brickArea = document.getElementById("brick-area")
const leftside = document.getElementById("t")
const timer = document.getElementById("timer")
const overtext = document.getElementById("over")
const text = document.getElementById("t")
text.innerHTML = `MOVE THE PADDEL WITH MOUSE<br><center><br>LEFT MOUSE CLICK TO PAUSE<br> <br>SPACE TO RESTART </cneter>`

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
let seconds = 0 
let min = 0 
let gameOverb = false
let paused = false
//bricks
let rows = 5
let col = 10
const bW = 80
const bH = 20
const bPadding = 15
let start = false
let hitpointMul = 4

//fps 
let times = [];
let fps = 0;
let fpsUpdateInterval = 500;
let lastFpsUpdateTime = performance.now();

function createBricks() {
    let color = colorRandom()
    for (let row = 0; row < rows; row++){
      for (let colm = 0; colm < col; colm++){
        let brick = document.createElement("div")
        brick.style.backgroundColor = color
        brick.classList.add("brick")
        brick.style.left = `${colm * (bW + bPadding)}px`;
        brick.style.top = `${row * (bH + bPadding)}px`;
        brickArea.appendChild(brick)
    }
}


  function colorRandom(){
    
    let random = '#' + Math.floor(Math.random()*16777215).toString(16);
    return random

  }

}
createBricks()

function togglePause(e) {
  if (e.button === 0 && !gameOverb) {
      paused = !paused; // !pused means tha game still going
      leftside.style.transition = "opacity 0.5s cubic-bezier(0.445, 0.05, 0.55, 0.95)";
      if (!paused){
        update(); 
        leftside.style.opacity = "0";
      } else{
        leftside.style.visibility = "visible";
        leftside.style.opacity = "1";
      }   
  }
}

function gameOver(){
  gameOverb = true
  overtext.innerHTML = `<center>GAME OVER<br><br>TIME ${min}:${seconds}<br>SCORE ${score}<br>SPACE TO RESTART</center>` 
  overtext.style.transition = "opacity 0.5s cubic-bezier(0.445, 0.05, 0.55, 0.95)";
  overtext.style.visibility = "visible"
  overtext.style.opacity = "1";
  addEventListener("keydown", (e) => {
    if (e.key === " "){
      resetGame()
    }    
  })
}


  function mose(e){
    if (paused) return;
    if (gameOverb) return;
    let gameAreaRect = gameArea.getBoundingClientRect()
    let newPadx = e.clientX - gameAreaRect.left 

    console.log("🚀 ~ mose ~ newPadx:", newPadx)
    if (newPadx < 40) newPadx = 55;
    if (newPadx > 940) {
      newPadx = 940 ;
   }
    paddle.style.left = `${newPadx}px`; 
    paddleX = newPadx
  }

  
  document.addEventListener("keydown", startG);
  function startG(e){
    if (e.key === " " && paused){
      resetGame()
    }
  }
  
  
  let c = 0
  let lives = 3


  function resetGame() {
    gameOverb = false
    paused = true
    overtext.innerHTML = ""
    brickArea.innerHTML = ""
    createBricks()
    // Reset ball position and speed
    ballX = paddleX;
    ballY = 1120;
    ballSpeedX = 0;
    ballSpeedY = 2;
    score = 0
    maxSpeedX = 2 
    lives = 3
    level = 1 
    start = false;
    seconds = 0
    min = 0    
    gameArea.style.border = " 2px solid white"

    
    ball.classList.add('ball-exit');
    ball.style.animation = 'ballExit 1s ease-out';
  
    // Wait for the exit animation to complete, then reset and apply entry animation
    setTimeout(() => {
      ball.classList.remove('ball-exit');
      ball.style.animation = ''; // Clear the animation
  
      // Reset ball's position visually
      ball.style.left = `${paddleX}px`;
      ball.style.top = `95%`; // or the starting Y position
  
      // Apply the entry animation
      ball.style.animation = 'ballEntry 1s ease-out';
    }, 500);
  }

  
  function calculateFPS() {
    const now = performance.now();
    while (times.length > 0 && times[0] <= now - 1000) {
      times.shift();
    }
    times.push(now);
    fps = times.length;
    if (now - lastFpsUpdateTime >= fpsUpdateInterval) {
    fpsnum.textContent =  `${fps}`;
      lastFpsUpdateTime = now;
    }
  }

 let time = setInterval(() => {
        if (!paused){
        seconds++
        if(seconds == 60){
          min++
          seconds = 0
        }
      }
      },1000)

      
      function update(){
        if (paused) return;
        if (gameOverb) return;
        document.getElementById("score").textContent = `Score:${score} level:${level} Speed:${maxSpeedX} Lives:${lives}`
        calculateFPS()
    

    timer.textContent = `${min}:${seconds}`
   
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
      if (lives == 2){
        gameArea.style.border = " 2px solid yellow"
      }
      if (lives == 1){
        gameArea.style.border = " 2px solid red"
      }
      if (lives === 0){
    gameOver()
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
      console.log("🚀 ~ pos ~ c:", ballX)
      console.log("🚀 ~ pospaddel ~ c:", paddleX)
      
      const hitPoint = (ballX - paddleX) / 99.5; // from -0.5 to 0.5
      c++
        if (c == 2){
          c = 0
          
          if (ballSpeedY < levelspeed ){
            maxSpeedX++
            ballSpeedY++
            hitpointMul += 1
          }
        }
   
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
      ballSpeedX *= -1
    }
    if (minHit === TopHit || minHit === bottomHit){
      ballSpeedY *= -1
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
