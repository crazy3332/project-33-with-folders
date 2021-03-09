var Engine = Matter.Engine,
  World = Matter.World,
  Events = Matter.Events,
  Bodies = Matter.Bodies;
 
var particle;
var plinkos = [];
var divisions = [];
var scoreTable = [];
    

var divisionHeight=300;
var score =0;
var count = 0;
var gameState = "start";

function setup() {
  createCanvas(800, 800);
  engine = Engine.create();
  world = engine.world;
  ground = new Ground(width/2,height,width,20);
  
   for (var k = 0; k <=width; k = k + 80) {
     divisions.push(new Divisions(k, height-divisionHeight/2, 10, divisionHeight));
   }

   for (var k = 0; k <divisions.length; k++) {
    scoreTable [k] = Math.round(random(1, 10)) * 50;
  }

    for (var j = 75; j <=width; j=j+50) 
    {
    
       plinkos.push(new Plinko(j,75));
    }

    for (var j = 50; j <=width-10; j=j+50) 
    {
    
       plinkos.push(new Plinko(j,175));
    }

     for (var j = 75; j <=width; j=j+50) 
    {
    
       plinkos.push(new Plinko(j,275));
    }

     for (var j = 50; j <=width-10; j=j+50) 
    {
    
       plinkos.push(new Plinko(j,375));
    }
    
}
 


function draw() {
  background("black");
  textSize(20)
  text("Score : "+score,20,30);
  Engine.update(engine);
 
  
   for (var i = 0; i < plinkos.length; i++) {
     
     plinkos[i].display();
     
   }
   
   //if(frameCount%60===0){
     //particles.push(new Particle(random(width/2-30, width/2+30), 10,10));
     //score++;
   //}
 
  //for (var j = 0; j < particles.length; j++) {
   
     //particles[j].display();
   //}
   for (var k = 0; k < divisions.length; k++) {
     
     divisions[k].display();
   }

   var scoreTextX = 25;
   var scoreTextY = 550;
   //var scoreTable = [500, 400, 300, 200, 100, 100, 200, 300, 400, 500];

   for (var k = 0; k < divisions.length; k++) {
     text(scoreTable[k], scoreTextX, scoreTextY);
     scoreTextX += 80;
   }
   
   if (particle != null) {
    particle.display();

    //if particle has entered the division
    if (particle.body.position.y > 550){
      score += scoreTable[Math.round(particle.body.position.x/80)];
      particle = null;
    }

   }
   
}

function mousePressed() {

  if (gameState != "end") {
    particle = new Particle(mouseX, 10, 10);
    count ++;
  }
  
  if (count === 5){
    gameState = "end";
  }
}