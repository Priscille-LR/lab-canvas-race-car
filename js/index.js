const canvas = document.querySelector("canvas");
canvas.style.border = "2px solid gray";
let ctx = canvas.getContext("2d");
let startscreen = document.querySelector(".game-intro");
let gameOverScreen = document.querySelector(".game-over");

let intervalId = 0;
let isGameOver = false;
let score = 0;

let background = new Image();
background.src = "../images/road.png";

let car = new Image();
car.src = "../images/car.png";
let carX = 250;
let carY = 400;

let carWidth = 80;
let carLength = 130; //car height

let coneWidth = 50;
let coneHeight = 50;


let greenCarWidth = 80;
let greenCarHeight = 130;

let minX = 50;
let maxX = canvas.width - 150;

//obstacle car
const obstacles = []

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

let obCar = new Image();
obCar.src = "../images/red-car.png";
let obCarX = Math.floor(Math.random() * (maxX - minX + 1) + minX); //Math.random() * (500 - 200) + 100; //300 
let obCarY = -400; //-400

let obCone = new Image();
obCone.src = "../images/cone.png";
let obConeX = Math.floor(Math.random() * (maxX - minX + 1) + minX) // Math.random() * (500 - 200) + 100; //300 Math.floor(Math.random() * 500) Math.random() * (500 - 200) + 100;
let obConeY = -400; //-400

let obGreenCar = new Image();
obGreenCar.src = "../images/green-car.png";
let obGreenCarX = Math.floor(Math.random() * (maxX - minX + 1) + minX) //300 Math.floor(Math.random() * 500) Math.random() * (500 - 200) + 100;
let obGreenCarY = -400; //-400

// let obCar = new Image();
// obCar.src = "../images/car.png";
// let obCar2X = 300;
// let obCar2Y = -400;

// let obCar = new Image();
// obCar.src = "../images/car.png";
// let obCar3X = 300;
// let obCar3Y = -400;


window.onload = () => {
  canvas.style.display = "none";
     
  gameOverScreen.style.display = "none";
  document.getElementById("start-button").onclick = () => {
    startGame();
  };

  document.getElementById("restart-button").onclick = () => {
    isGameOver = false;
    obGreenCarY = -400;
    obConeY = -400;
    obCarY = -400;
    startGame();
  }

  document.addEventListener("keydown", (e) => {
    if (e.code === "ArrowRight" && carX + carWidth < canvas.width - 50) {
      carX += 16;
    } else if (e.code === "ArrowLeft" && carX > 50) {
      carX -= 16;
    }
  });

  function startGame() {
    //loop theough
    canvas.style.display = "block";
    startscreen.style.display = "none";
    gameOverScreen.style.display = "none";

    ctx.drawImage(background, 0, 0, canvas.width, canvas.height); // start at top left corner and takes full width/height
    ctx.drawImage(car, carX, carY, carWidth, carLength);
    ctx.drawImage(obCar, obCarX, obCarY, carWidth, carLength);
    ctx.drawImage(obCone, obConeX, obConeY, coneWidth, coneHeight);
    ctx.drawImage(obGreenCar, obGreenCarX, obGreenCarY, greenCarWidth, greenCarHeight);

    //obcar mvt
    obCarY += 5
    if(obCarY > canvas.height) {
      obCarY = -400
      obCarX = Math.floor(Math.random() * (maxX - minX + 1) + minX);
      score++
    }

    obConeY += 5
    if(obConeY > canvas.height) {
      obConeY = -400
      obConeX = Math.floor(Math.random() * (maxX - minX + 1) + minX)
      score++
    }

    obGreenCarY += 7
    if(obGreenCarY > canvas.height) {
      obGreenCarY = -400
      obGreenCarX = Math.floor(Math.random() * (maxX - minX + 1) + minX)
      score += 5
    }

    //collision
    if(carY < obCarY + carLength && 
      carX < obCarX + carWidth - 5 && 
      carX + carWidth > obCarX +5 &&
      carY + carLength > obCarY 
      ) { //if top of car < bottom of obcar
      isGameOver = true
    }

    if(carY < obConeY + carLength && 
      carX < obConeX + carWidth - 5 && 
      carX + carWidth > obConeX +5 &&
      carY + carLength > obConeY 
      ) { 
      isGameOver = true
    }

    if(carY < obGreenCarY + carLength && 
      carX < obGreenCarX + carWidth - 5 && 
      carX + carWidth > obGreenCarX +5 &&
      carY + carLength > obGreenCarY 
      ) { //if top of car < bottom of obcar
      isGameOver = true
    }




    //score board
    ctx.font = "30px Georgia";
    ctx.fillText(`Score: ${score}`, 100, 40);
    intervalId = requestAnimationFrame(startGame);

    if (isGameOver) {
      cancelAnimationFrame(intervalId);
      gameOverScreen.style.display = "block";
      canvas.style.display = "none";
    }
  }
};
