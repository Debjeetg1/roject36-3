var dog , dogimg , doghappyimg;
var database;
var foodS , foodStack;
var milk , milkimg;
var food
var feedbutton , addFood; 
var fedTime , lastFed;



function preload()
{
   dogimg = loadImage('image123456/dogImg.png');
  
  
 
}

function setup() {
  database = firebase.database();
  createCanvas(800, 700);

  foodS = 0;

  foodStack = database.ref('Food');
  foodStack.on("value" , readStock);
  
  dog = createSprite(400 , 600 , 20, 20);

  dog.scale = 0.2;

  food = new Food(200 , 20 ,50);

  feedbutton = createButton('Feed The Dog')
  feedbutton.position(950 , 605);
  feedbutton.mousePressed(feed)

  addFood = createButton('Add Food')
  addFood.position(950 , 655);
  addFood.mousePressed(addfood);


  
  

  
  
}





function draw() {  
  background(46, 139, 87);
 

    
  drawSprites();

   fill("white");
  textSize(50);
  text("Food left: " + foodS , 200 , 100);


 fill(255 , 255 , 254);
 textSize(30);
 if(lastFed >= 12)
 {
  text("LAST FED: " + lastFed % 12 + " PM" , 200 , 30);
 } 
else if(lastFed === 0)
{
  text("LAST FED: 12 AM", 200 ,30 )
}
else
{
  text("LAST FED: " + lastFed + " AM" , 200 ,30);
}




}


function readStock(data)
{
  foodS = data.val();
 

  
 
}



function writeStock()
{
  if(foodS <= 0)
 {
   foodS = 0
 }
 else
 {
   foodS -= 1;
 }
 
 
  database.ref('/').set({
   Food: foodS ,
   timefed: lastFed
 })

 

 
 
}


function addfood()
{
  
  if(foodS >= 20)
  {
    foodS = 20
  }
  else{
    foodS++
  }
  database.ref('/').update({
    Food:foodS,
    timefed: lastFed
  })


  
}


function feed()
{

    writeStock();
    // dog.addImage(doghappyimg)
  
  

}

async function hour()
{
  var response = await fetch("http://worldtimeapi.org/api/timezone/Asia/Kolkata");
  var responseJSON = await response.json();
  var datetime = responseJSON.datetime 
  
  var hour =  datetime.slice(11, 13);



}

function readHour()
{
  foodStock = database.ref('timefed');
  foodStock.on("value" , (data)=> {
      lastFed = data.val();
  })
}

function updateHour()
{
  database.ref('/').set({
    timefed: hour()
  })

  console.log(lastFed)
}




