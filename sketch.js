//Create variables here
var dog,Dog,happyDog,database,foodS,foodStock;


function preload()
{
	//load images here
Dog = loadImage("images/dogimg.png")
happyDog = loadImage("images/dogimg1.png")
}



function setup() {
 database = firebase.database() 
createCanvas(500, 500);
  
dog = createSprite(250,400,20,20)
dog.addImage(Dog);
dog.scale = 0.2;

foodStock = database.ref('Food');
foodStock.on("value",readStock);

}

function draw() {  
background(46, 139, 87);
  drawSprites();
  
  fill("black");
  textSize(10);
  stroke(20);
  text('Note press UP ARROW to feed the dog',170,20);
  
  //add styles here
 fill("black");
 textSize(24);
 stroke(20);
 text("food remaining:"+foodS,140,300);


  if(keyWentDown(UP_ARROW)){
 writeStock(foodS);
 dog.addImage(happyDog);

}
}
 
function readStock(data){

 foodS = data.val();

}

function writeStock(x){

  if(x <= 0){
    x=0
    
    if(foodS.val == null){

       foodS = 20;
       
    }
  }
  else{
    x=x-1;
  }
  
  database.ref('/').update({
   Food:x

  })
}