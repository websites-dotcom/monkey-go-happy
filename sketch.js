//creating global variables
var bg;
var ground, groundImage;

var monkey, monkey_running, monkey_stopped;
var banana, bananaImage;
var rock, rockImage;
var bananasGroup, rocksGroup;

var score = 0;

var time = 0;

var gamestate = 1;
var play = 1, end = 0;


function preload(){

  //inserting images into image variables
  bg = loadImage("bg-1.jpg");
  groundImage = loadImage("ground.jpg");
  
  bananaImage = loadImage("banana.png");
  rockImage = loadImage("obstacle.png");
  monkey_running = loadAnimation("sprite_1.png","sprite_2.png",     "sprite_3.png", "sprite_4.png", "sprite_5.png",        "sprite_6.png", "sprite_7.png", "sprite_8.png");
  monkey_stopped = loadAnimation("sprite_0.png");
 
}


function setup() {
  
  createCanvas(600,400);
  
  //creating basic sprites and groups
  ground = createSprite(300,400,600,20);
  ground.addImage(groundImage);
  
  monkey = createSprite(30,350,20,20);
  monkey.addAnimation("monkey", monkey_running);
  monkey.addAnimation("gameover", monkey_stopped);
  monkey.scale = 0.1;
  
  bananaGroup = new Group();
  rockGroup = new Group();
  
}


function draw() {

  background(bg);
  
  monkey.collide(ground);
  
  //reseting game on pressing 'r'
  if (keyDown("r") && gamestate === end){
    
    reset();
    
  }
  
  if (gamestate === play){
    
    ground.velocityX = -3;
    
    createBanana();
    createRock();
    
    if (ground.x < 0){
      
      ground.x = ground.width / 2;
      
    }
    
    time = time + Math.round(getFrameRate()/60);
    
    //making monkey jump on pressing spacebar
    if (keyDown("space") && monkey.y >= 125){
      
      monkey.velocityY = -15;
      
    }
    
    //adding gravity to monkey
    monkey.velocityY = monkey.velocityY + 1;
    
    if (bananaGroup.isTouching(monkey)){
      
      score = score + 2;  
      bananaGroup.destroyEach();
      
    }
    
    if (rockGroup.isTouching(monkey)){
      
      gamestate = end;
      
    }
    
  }
  
  if (gamestate === end){
    
    //stopping and destroying all sprites
    bananaGroup.velocityX = 0;
    rockGroup.velocityX = 0;   
    ground.velocityX = 0;
    
    bananaGroup.destroyEach();
    rockGroup.destroyEach();
    
    monkey.changeAnimation("gameover", monkey_stopped);
    
    //making gameover and restart text
    fill("yellow");
    textSize(27);
    textFont("Arial");
    text("GAME OVER", 300, 200);
    
    fill("black");
    textSize(24);
    textFont("Arial");
    text("Press 'r' to restart", 300, 230);
    
  }
  
  drawSprites();
  
  //creating score
  fill("teal");
  textSize(27);
  textFont("Ink Free");
  text("score = " + score, 390, 30);
  
  //creating survival time
  fill("teal");
  textSize(27);
  textFont("Ink Free");
  text("time survived = " + time, 50, 30);
  
}


function createBanana(){
  
  if (frameCount%80 === 0){
    
    banana = createSprite(600,0,20,20);
    banana.y = Math.round(random(140, 200));
    banana.velocityX = -4;
    banana.addImage("banana", bananaImage);
    banana.scale = 0.1;
    
    banana.setLifetime = 100;
    bananaGroup.add(banana);
    
  }
   
}


function createRock(){
  
  if (frameCount%300 === 0){
    
    rock = createSprite(600,350,20,20);
    rock.addImage("rock", rockImage);
    rock.velocityX = -4;
    rock.scale = 0.15;
  
    rock.setLifetime = 200;
    rockGroup.add(rock);
    
  }  
  
}


function reset(){
  
  gamestate = play;
  
  monkey.changeAnimation("monkey", monkey_running);
  
  score = 0;
  time = 0;
  
}

