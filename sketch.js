const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;


let engine;
let world;
var ground;
var rope2, rope3
var fruit,rope;
var fruit_con, fruit_con_2, fruit_con_3;

var bg_img;
var button, blower, mute_btn
var btn_2, btn_3
var food;
var rabbit;
var blink, eat, sad;
var cut_sound, sad_sound, eat_sound, air_sound, bk_song;

function preload()
{
  blink = loadAnimation("blink_1.png", "blink_2.png", "blink_3.png");
  eat = loadAnimation("eat_0.png", "eat_1.png", "eat_2.png", "eat_3.png", "eat_4.png");
  sad = loadAnimation("sad_1.png", "sad_2.png", "sad_3.png");

  bg_img = loadImage('background.png');
  food = loadImage('melon.png');
  rabbit = loadImage('Rabbit-01.png');

  bk_song = loadSound("sound1.mp3");
  sad_sound = loadSound("sad.wav");
  cut_sound = loadSound("rope_cut.mp3");
  eat_sound = loadSound("eating_sound.mp3");
  air_sound = loadSound("air.wav");
  
  blink.playing = true;
  eat.playing = true;
  sad.playing = true;
  eat.looping = false;
  sad.looping = false;
}

function setup() 
{
  var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
  if(isMobile == true){
    canW = displayWidth;
    canH = displayHeight
    createCanvas(canW, canH)
  }
  else{
    canW = windowWidth
    canH = windowHeight
    createCanvas(canW, canH)
  }


  
  frameRate(80);
  engine = Engine.create();
  world = engine.world;
  ground = new Ground(200,canH,600,20);

  rope = new Rope(7,{x:245,y:30});
  rope2 = new Rope(8, {x: 370, y:40})
  rope3 = new Rope(4, {x: 400, y: 225})
  fruit = Bodies.circle(300,300,20);
  Matter.Composite.add(rope.body,fruit);

  bunny = createSprite(420, canH - 80, 100, 100)
  bunny.addImage(rabbit)
  bunny.scale = 0.2

  bk_song.play()
  bk_song.setVolume(0.5)

  blink.frameDelay = 20;
  eat.frameDelay = 20;
  sad.frameDelay = 20;

  button = createImg("cut_button.png")
  button.position(220, 30)
  button.size(50, 50)
  button.mouseClicked(drop)

  btn_2 = createImg("cut_button.png")
  btn_2.position(330, 35)
  btn_2.size(50, 50)
  btn_2.mouseClicked(drop2)

  btn_3 = createImg("cut_button.png")
  btn_3.position(360, 200)
  btn_3.size(50, 50)
  btn_3.mouseClicked(drop3)
  
  blower = createImg("balloon.png")
  blower.position(10, 250)
  blower.size(150, 100)
  blower.mouseClicked(airBlow)

  mute_btn = createImg("mute.png")
  mute_btn.position(450, 20)
  mute_btn.size(50, 50)
  mute_btn.mouseClicked(mute)

  bunny.addAnimation("blinking", blink)
  bunny.addAnimation("crying", sad)
  bunny.addAnimation("eating", eat)

  bunny.changeAnimation("blinking")

  fruit_con = new Link(rope,fruit);
  fruit_con_2 = new Link(rope2, fruit)
  fruit_con_3 = new Link(rope3, fruit)

  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)
  imageMode(CENTER);
  
}

function draw() 
{
  background(51);

  image(bg_img,width/2,height/2,canW,canH);




if(fruit!=null){
  image(food,fruit.position.x,fruit.position.y,70,70);

}
  
  rope.show();
  rope2.show();
  rope3.show();
  Engine.update(engine);
  ground.show();


    if (collide(fruit, bunny)==true){
      bunny.changeAnimation("eating")
      eat_sound.play()
    }
    
    if(fruit!=null && fruit.position.y > 650){
      bunny.changeAnimation("crying")
      sad_sound.play()
      bk_song.stop()
      fruit=null
      
    }

   drawSprites()
}


function drop(){
rope.break()
cut_sound.play()
fruit_con.detach()
fruit_con = null;
}

function drop2(){
  rope2.break()
  cut_sound.play()
  fruit_con_2.detach()
  fruit_con_2 = null;

}

function drop3(){
  rope3.break()
  cut_sound.play()
  fruit_con_3.detach()
  fruit_con_3 = null

}

function airBlow(){
  Matter.Body.applyForce(fruit, {x: 0, y:0}, {x:0.01, y:0})
  air_sound.play()
}

function collide(body, sprite){
  if(body!=null){
    d = dist(body.position.x, body.position.y, sprite.position.x, sprite.position.y)
    if(d<=80){
      World.remove(engine.world, fruit)
      fruit = null
      return true
    }
    else{
      return false
    }
  }

}

function mute(){
  if(bk_song.isPlaying()){
    bk_song.stop()
  }
  else{
    bk_song.play()
  }

}