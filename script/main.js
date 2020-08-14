// setup canvas

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

const ballCountHtm = document.querySelector('p');
let ballsCount = 0;
updateBallsCount();
// Shape Class

class Shape {
  constructor(x, y, velX, velY) {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    this.exists = true;
  }
}

// Ball Class

class Ball extends Shape {
  constructor(x, y, velX, velY, color, size) {
    super(x, y, velX, velY);
    this.color = color;
    this.size = size;
  }

  // Function to draw the ball
  draw() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fill();
  }

  // Function to move the ball
  update() {
    if ((this.x + this.size) >= width) {
      this.velX = -(this.velX);
    }

    if ((this.x - this.size) <= 0) {
      this.velX = -(this.velX);
    }

    if ((this.y + this.size) >= height) {
      this.velY = -(this.velY);
    }

    if ((this.y - this.size) <= 0) {
      this.velY = -(this.velY);
    }

    this.x += this.velX;
    this.y += this.velY;
  }


  // Function to detect collision
  collisionDetect() {
    for (let j = 0; j < balls.length; j++) {
      if (!(this === balls[j])) {
        const dx = this.x - balls[j].x;
        const dy = this.y - balls[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < this.size + balls[j].size) {
          balls[j].color = this.color = 'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) + ')';
        }
      }
    }
  }

}

// Evil Circle
class evilCircle extends Shape {
  constructor(x, y) {
    super(x, y, 20, 20);
    this.color = 'white';
    this.size = 10;
  }
  // Evil circle draw method
  draw() {
    ctx.beginPath();
    ctx.lineWidth = 3;
    ctx.strokeStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.stroke();
  }

  // Evil circle check bounds
  checkBounds() {
    if ((this.x + this.size) >= width) {
      this.x = width - (3 * this.size);
    }

    if ((this.x - this.size) <= 0) {
      this.x = (3 * this.size);
    }

    if ((this.y + this.size) >= height) {
      this.y = height - (3 * this.size);
    }

    if ((this.y - this.size) <= 0) {
      this.y = (3 * this.size);
    }

  }

  // Evil Circle controls
  setControls() {
    let _this = this; // We are using this here because we don't want to change velX/VelY for every 
    //object. We just want to change for the particular object by which this method is invoked.
    window.onkeydown = function (e) {
      if (e.key === 'a') {
        _this.x -= _this.velX;
      } else if (e.key === 'd') {
        _this.x += _this.velX;
      } else if (e.key === 'w') {
        _this.y -= _this.velY;
      } else if (e.key === 's') {
        _this.y += _this.velY;
      }
    }
  }

  // Evil circle Collision detect
  collisionDetect() {

    for (let j = 0; j < balls.length; j++) {
      if ((balls[j].exists)) {
        const dx = this.x - balls[j].x;
        const dy = this.y - balls[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < this.size + balls[j].size) {
          balls[j].exists = false;
          decreaseBallsCount();
        }
      }
    }

  }
}

// function to generate random number

function random(min, max) {
  const num = Math.floor(Math.random() * (max - min + 1)) + min;
  return num;
}


// Create Balls

let balls = [];
while (balls.length < 25) {
  let size = random(10, 20);
  let ball = new Ball(
    // ball position always drawn at least one ball width
    // away from the edge of the canvas, to avoid drawing errors
    random(0 + size, width - size),
    random(0 + size, height - size),
    random(-7, 7),
    random(-7, 7),
    'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) + ')',
    size
  );

  balls.push(ball);
  increaseBallsCount();
}

// Animation loop
function loop() {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
  ctx.fillRect(0, 0, width, height);

  for (let i = 0; i < balls.length; i++) {
    if (balls[i].exists) {
      balls[i].draw();
      balls[i].update();
      balls[i].collisionDetect();
    }
  }
  evilCircleObj.setControls();
  evilCircleObj.draw();
  evilCircleObj.checkBounds();
  evilCircleObj.collisionDetect();

  requestAnimationFrame(loop);
}

// Making Evil Circle enter in the game
let randomNum = random(10, 20);
let evilCircleObj = new evilCircle(
  random(0 + randomNum, width - randomNum),
  random(0 + randomNum, height - randomNum)
);


// Drawing balls
loop();

// Decrease balls count
function decreaseBallsCount() {
  ballsCount--;
  updateBallsCount();
}

// Increase balls count
function increaseBallsCount() {
  ballsCount++;
  updateBallsCount();
}

// Update Balls Count on window
function updateBallsCount() {
  ballCountHtm.textContent = `Balls Count : ${ballsCount}`;

}