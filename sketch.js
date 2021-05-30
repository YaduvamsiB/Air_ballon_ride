var balloon, balloonImage1, balloonImage2;
// create database and position variable here

var database;
var pos;
var position;

function preload() {
  bg = loadImage("cityImage.png");
  balloonImage1 = loadAnimation("hotairballoon1.png");
  balloonImage2 = loadAnimation(
    "hotairballoon1.png",
    "hotairballoon1.png",
    "hotairballoon1.png",
    "hotairballoon2.png",
    "hotairballoon2.png",
    "hotairballoon2.png",
    "hotairballoon3.png",
    "hotairballoon3.png",
    "hotairballoon3.png"
  );
}

//Function to set initial environment
function setup() {
  database = firebase.database();
  createCanvas(1500, 700);

  balloon = createSprite(250, 450, 150, 150);
  balloon.addAnimation("hotAirBalloon", balloonImage1);
  balloon.scale = 0.5;

  textSize(20);

  pos = database.ref("balloon/height");
  pos.on("value", readPos, showError);
}

// function to display UI
function draw() {
  background(bg);

  if (keyDown(LEFT_ARROW)) {
    changePosition(-10, 0);
    balloon.addAnimation("hotAirBalloon", balloonImage2);
  } else if (keyDown(RIGHT_ARROW)) {
    changePosition(10, 0);
    balloon.addAnimation("hotAirBalloon", balloonImage2);
  } else if (keyDown(UP_ARROW)) {
    changePosition(0, -10);
    balloon.addAnimation("hotAirBalloon", balloonImage2);
  } else if (keyDown(DOWN_ARROW)) {
    changePosition(0, +10);
    balloon.addAnimation("hotAirBalloon", balloonImage2);
  }

  drawSprites();
  fill(0);
  stroke("white");
  textSize(25);
  text("**Use arrow keys to move Hot Air Balloon!", 40, 40);
}

function changePosition(x, y) {
  database.ref("balloon/height").set({
    x: height.x + x,
    y: height.y + y,
  });
}

function readPos(data) {
  height = data.val();
  balloon.x = height.x;
  balloon.y = height.y;
}

function showError() {
  console.log("Show error");
}
