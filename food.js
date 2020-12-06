class Food
{
    constructor( y , width  , height)
    {
        var foodfed , foodLeft;

        this.milkimg = loadImage("image123456/Milk.png");
        this.y = y;
        this.width = width;
        this.height = height;
        
    }

 

    
    
    display()
    {
      if(foodS >= 0)
      {
          for(var i; i <= 10; i += 1)
          {
             
              image(this.milkimg, i+ 20 , 200 , 20 ,20 );
          }
      }

    }
}