var particles = [];
var cx,cy;

var zoom=0.6;
var offset={'x':300,'y':0};

function setup() {
	createCanvas(windowWidth, windowHeight);
	cx=windowWidth/2;
	cy=windowHeight/2;
	stroke(255);
	for (var i = 24; i >= 0; i--) {
		var p=new Particle(random(windowWidth/zoom),random(windowHeight/zoom),0,0,0,0,random(20,30),1);
		particles.push(p);
	}
    for (var i = 3; i >= 0; i--) {
        var p=new Particle(random(windowWidth/zoom), random(windowHeight/zoom),0,0,0,0,10000,1);
        particles.push(p);
    }
    for (var i = 5; i >= 0; i--) {
        var p=new Particle(random(windowWidth/zoom), random(windowHeight/zoom),0,0,0,0,5000,1);
        particles.push(p);
    }
    for (var i = 4; i >= 0; i--) {
        var p=new Particle(random(windowWidth/zoom), random(windowHeight/zoom),0,0,0,0,10000,-1);
        particles.push(p);
    }
     for (var i = 5; i >= 0; i--) {
        var p=new Particle(random(windowWidth/zoom), random(windowHeight/zoom),0,0,0,0,5000,-1);
        particles.push(p);
    }
	}
	function draw() {
		background(237, 230, 219);
		push();
		scale(zoom);
		translate(offset.x,offset.y);
		calcNewton();
		for (var i = particles.length - 1; i >= 0; i--) {
			particles[i].render();
			particles[i].update();
		}
		pop();

	}

	function Particle(x,y,vx,vy,ax,ay,mass,MassSign){
		this.x=x;
		this.y=y;
		this.vx=vx;
		this.vy=vy;
		this.ax=ax;
		this.ay=ay;
		this.mass=mass;
		this.MassSign=MassSign;
		this.r=Math.log(Math.abs(mass));
		this.myColor=this.MassSign>0?color(65, 125, 122,128):color(26, 60, 64,128);

		this.render = function(){
			fill(this.myColor);
			stroke(this.myColor)
			ellipse(this.x,this.y,this.r*4);
		}

	}

	Particle.prototype.updateAcc = function(ax,ay) {
		this.ax=ax*0.01;
		this.ay=ay*0.01;
	}; 
	Particle.prototype.update = function() {
		this.vx+=this.ax;
		this.vy+=this.ay;
		this.x+=this.vx;
		this.y+=this.vy;
		this.myColor=this.MassSign>0?color(65, 125, 122,12+Math.log(this.mass)*8):color(26, 60, 64,12+Math.log(this.mass)*8);	}; 


	function calcNewton() {
		var pnum=particles.length;
		for (var i = pnum - 1; i >= 0; i--) {
			var bodyA=particles[i];
			var sum_ax=0,sum_ay=0;
			for (var j = pnum - 1; j >= 0; j--) {
				if(i!=j){
					var bodyB=particles[j];
					var d=dist(bodyA.x,bodyA.y,bodyB.x,bodyB.y);
					var dx=bodyB.x-bodyA.x;
					var dy=bodyB.y-bodyA.y;
					if(d>(bodyA.r+bodyB.r)){
					sum_ax += bodyA.MassSign/bodyB.MassSign*bodyB.mass*dx/(d*d*d*d); //Sum of GM*X/r*r*r
					sum_ay += bodyA.MassSign/bodyB.MassSign*bodyB.mass*dy/(d*d*d*d);// of GM*Y/r*r*r					
				}
			}
		}

			r1=dist(bodyA.x,bodyA.y,0,bodyA.y); // repelent wall
			r2=dist(bodyA.x,bodyA.y,bodyA.x,0); // repelent wall
			r3=dist(bodyA.x,bodyA.y,windowWidth/zoom,bodyA.y); // repelent wall
			r4=dist(bodyA.x,bodyA.y,bodyA.x,windowHeight/zoom); // repelent wall
            sum_ax+= -10000*(0-bodyA.x)/(r1*r1);
            sum_ay+= -10000*(0-bodyA.y)/(r2*r2);
            sum_ax+= -10000*(windowWidth/zoom-bodyA.x)/(r3*r3);
            sum_ay+= -10000*(windowHeight/zoom-bodyA.y)/(r4*r4);	

			if (particles.length>0) {
				particles[i].updateAcc(sum_ax,sum_ay);				
			}
		}
	}
// dynamically adjust the canvas to the window
function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}

