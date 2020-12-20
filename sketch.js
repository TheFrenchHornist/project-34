//Create variables here
var dog, happyDog, database, foodS, foodStock;
var dogImg, dogImg1;
function preload()
{
  dogImg=loadImage("Dog.png");
  dogImg1=loadImage("happydog.png");
}

function setup() {

  database = firebase.database();
  createCanvas(1000, 700);
  dog=createSprite(700, 350, 10, 10);
  dog.addImage(dogImg);
  foodStock = database.ref('Food');
  foodStock.on("value", readStock);
  
}


function draw() {  
  background(46, 139, 87);
  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(dogImg1);
  }

  drawSprites();
  //add styles here
  textSize(25);
  stroke("white");
  text("Note:press the up arrow key to feed the dog!", 100, 70);
  text("food left: " + foodS, 100, 150);
}

function readStock(data){
  foodS=data.val();
}

function writeStock(x){
  if(x<=0){
    x=0;
  }else{
    x=x-1;
  }

  database.ref('/').update({
    Food:x
  })
}
