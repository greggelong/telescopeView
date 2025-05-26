class Creature{
  constructor(clr, sz ){
      this.x = random(-width/4,width+width/4);
      this.y = random(-height/4,height+height/4)
      this.sz = sz;
      this.clr =clr 
      this.angle = random(360)
      this.off = 1;
      this.deathClock = random(100,500);
      this.dying = false;
      this.dead = false;
      this.xoff = random(1000)
      this.yoff = random(1000)
      this.angoff = random(1000)
      this.xincr = random(0.0001,0.001)
      this.yincr = random(0.0001,0.001)
      this.anginc =random(0.0001,0.001)
      this.phase = random(360)

      this.gene = random([instr,instr2]);
      this.turtle = new Gurtle(this.x,this.y, clr);
       
  }
  
   show(){
      if (!this.dead){
      this.turtle.x = this.x
      this.turtle.y = this.y
      this.turtle.angle = this.angle
      strokeWeight(1+this.sz/10)

      for (let i = 0; i < this.gene.length; i++) {
          // print(i, ins[i][0])
          switch (this.gene[i][0]) {
            case "l":
              this.turtle.left(this.gene[i][1] * this.off);
      
              break;
      
            case "r":
              this.turtle.right(this.gene[i][1] * this.off);
      
              break;
            case "f":
              this.turtle.forward(this.sz);
              break;
            case "push":
             this.turtle.pushIt();
              break;
            case "pop":
             this.turtle.popIt();
              break;
          }
        }
      }
   }

   squirm(n){
      this.off = sin(n+this.phase);

   }

   move(){
      this.x = map(noise(this.xoff),0,1,-width/5,width+width/5); //need to spread them out a bit
      this.y = map(noise(this.yoff),0,1,-height/5,height+height/5);
      this.angle =noise(this.angoff)*360
      this.xoff += this.xincr
      this.yoff += this.yincr
      this.angoff+=this.anginc
   }
  


   wither(){
    if(this.dying){
      this.deathClock--
      this.sz*=0.99;
      if(this.deathClock<0){
        this.dying = false
        this.dead = true
      }

    }
   }

  }