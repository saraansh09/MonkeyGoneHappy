var backImage,backgr;
var player, player_running;
var ground,ground_img;
var bananaimg,bananaGroup;
var stoneimg,stoneGroup;
var END =0;
var PLAY =1;
var gameState = PLAY;
var score = 0;

function preload(){
  backImage=loadImage("jungle.jpg");
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  bananaimg = loadImage("banana.png");
  stoneimg = loadImage("stone.png")
}

function setup() {
  createCanvas(800,400);

  backgr=createSprite(400,0,800,400);
  backgr.addImage(backImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;

  
  player = createSprite(100,340,20,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.1;
  
  ground = createSprite(400,350,800,10);
  ground.x=ground.width/2;
  ground.visible = false;
  bananaGroup = new Group;
  stoneGroup = new Group;
  
}

function draw() { 
  background(0);

  if(gameState===PLAY){
  
  if(backgr.x<100){
    backgr.x=backgr.width/2;
  }
  
    if(keyDown("space") && player.y>200 ) {
      player.velocityY = -12;
    }
    player.velocityY = player.velocityY + 0.8;
  
    player.collide(ground);

  }

  drawSprites();

  if (bananaGroup.isTouching(player)){
    bananaGroup.destroyEach();
    score += 2;
    player.scale += 0.1;
  }

  if (stoneGroup.isTouching(player)){
    gameState = 0;
    backgr.velocityX = 0;
  }
   if (gameState === 0){
    player.visible = false;

    bananaGroup.destroyEach();
    stoneGroup.destroyEach();

    textSize(30);
    fill(255);
    text("Game Over",300,200);
  }
    spawnFood();
    spawnObstacle();
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+ score, 500,50);
}

function spawnFood(){
 if (frameCount % 80 === 0){
   var banana = createSprite(600,250,40,10);
   banana.y = random(120,200);
   banana.addImage(bananaimg);
   banana.scale = 0.05;
   banana.velocityX = -4;

   
   banana.lifetime = 300;
   player.depth = banana.depth+1;
   bananaGroup.add(banana);
 }
}

function spawnObstacle(){
  if (frameCount % 80 === 0){
    var stone = createSprite(600,310,40,10);
    stone.addImage(stoneimg);
    stone.scale = 0.2;
    stone.velocityX = -4;
 
    
    stone.lifetime = 300;
    player.depth = stone.depth+1;
    stoneGroup.add(stone);
  }
 }
 