var monkey, ground, bg;
var backImg,bananaImg,obstacleImg;

var score=0;

var foodGroup, obstaclesGroup;

function preload(){
  backImg=loadImage("jungle.jpg");
  
  monkeyImg=loadAnimation("Monkey_01.png" ,"Monkey_02.png", "Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");


  bananaImg=loadImage("banana.png");

  obstacleImg=loadImage("stone.png");
}  


function setup() {
  createCanvas(400, 400);
  
  bg = createSprite(0,0,400,400);
  bg.addImage(backImg);
  bg.velocityX=-4;
  bg.scale = 1.2;
  
  ground = createSprite(400,350,800,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  ground.visible=false;
  
  
  monkey=createSprite(100,340,20,50);
  monkey.addAnimation("monkey",monkeyImg);
  monkey.scale=0.1;
  
  foodGroup = new Group();
  obstaclesGroup = new Group();
  
}

function draw() {
  background(220);
  
  if (bg.x<0) {
    bg.x=bg.width/2;
  }
  
  if (foodGroup.isTouching(monkey)) {
    score=score+2;
    foodGroup.destroyEach();
  }
  
  if (obstaclesGroup.isTouching(monkey)) {
    score=score-1;
    obstaclesGroup.destroyEach();
  }
  
  if (ground.x < 0){
    ground.x = ground.width/2;
  }
  
  if (keyDown("space")) {
    monkey.velocityY=-18;
  }
  
  monkey.velocityY=monkey.velocityY+0.8;

  monkey.collide(ground);
  
  food();
  obstacles();
  
  drawSprites();
  
  strokeWeight(2);
  fill("black");
  text("score:"+ score, 270, 30);
  
}

function food(){
  if (frameCount%120===0) {
    var banana = createSprite(400,Math.round(random(120,200)),10,10);
    banana.addImage(bananaImg)
    banana.scale=0.05;
    banana.velocityX=-3;
    banana.lifetime=250;
    foodGroup.add(banana);
  } 
}


function obstacles(){
  if (frameCount%200===0) {
    var stone=createSprite(400,320,20,20);
    stone.addImage(obstacleImg);
    stone.scale=0.15;
    stone.velocityX=-3;
    stone.lifetime=250;
    obstaclesGroup.add(stone);
  }
  
}