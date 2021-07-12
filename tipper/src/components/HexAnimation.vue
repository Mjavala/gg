<template>
    
</template>

<script>
import Victor from 'victor'

export default {
    mounted() {
/**
 * JS for Hexocet
 * 
 * @author Alexandre Andrieux
 * @since 2017-01-05
 */

var Hexocet = {
  seeds: [],
  stepCount: 0,
  birthPeriod: 1,
  hexSize: 30,
  targetBounceChance: 0.02,
  maxPop: 20,
  springStiffness: 0.015,
  viscosity: 0.8,
  particleOpacity: 0.03,
  fade: false,
  fadeLayerOpacity: 0.04
};
Hexocet.setupCanvas = function() {
  // Initialize own canvas
	var canvas = document.createElement('canvas');
	canvas.id = 'hexocet';
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	document.body.appendChild(canvas);

  // Get and store canvas context
	this.canvas = document.getElementById(canvas.id);
	this.ctx = this.canvas.getContext('2d');
  
  // Scale parameter
  this.canvasBase = Math.min(this.canvas.width, this.canvas.height);
  // Central point coordinates
  this.xC = this.canvas.width / 2;
  this.yC = this.canvas.height / 2;
};
Hexocet.hexCoordsToXY = function(Hx, Hy) {
  // Hx and Hy are integers corresponding to vertices coordinates in Hex space
  var xPrime, yPrime, XYprime, X, Y, XY;
  var isSumEven = ( (parseInt(Hx) + parseInt(Hy)) % 2 == 0 ? 1 : 0);
  xPrime = 1 * Hx;
  yPrime = 1 /Math.sqrt(3) * (3*Hy + 1 + isSumEven);
  
  XYprime = new Victor(xPrime * this.hexSize, yPrime * this.hexSize);
  XY = XYprime.clone().rotateDeg(30);
  
  return { x: XY.x, y: XY.y };
};
Hexocet.XYtoHexCoords = function(x, y) {
  // Approximate
  var XYprime = new Victor(x / this.hexSize, y / this.hexSize).rotateDeg(-30);
  var Hx = XYprime.x,
      Hy = Math.sqrt(3) * XYprime.y/3;
  return { Hx: Math.floor(Hx), Hy: Math.floor(Hy) };
};
Hexocet.update = function() {
  this.stepCount++;
  
  // Birthrate management
	if (this.stepCount % this.birthPeriod == 0 && this.stepCount < 12000000 && this.seeds.length < this.maxPop) {
    this.birth();
  }
  
  this.move();
  this.draw();
};
Hexocet.birth = function(xBirth, yBirth, seed) {
  // Give birth around the canvas center
  var targetH = this.XYtoHexCoords(xBirth || this.xC, yBirth || this.yC);
  // I said AROUND
  if (Math.random() > 0.9) {
    var spreadArea = 1 * Math.random();
  var angle = 2 * Math.PI * Math.random();
  targetH.Hx += 2 * Math.floor(spreadArea * Math.cos(angle));
  targetH.Hy += Math.floor(spreadArea * Math.sin(angle));
  } else {
    targetH.Hx += Math.floor(400 * (-0.5 + Math.random()));
  targetH.Hy += Math.floor(400 * (-0.5 + Math.random()));
  // Convert in Cartesian coords
  }
  
  var targetXY = this.hexCoordsToXY(targetH.Hx, targetH.Hy);
  
  var seed = seed || {
    xLast: targetXY.x,
    x: targetXY.x,
    xSpeed: 0,
    yLast: targetXY.y,
    y: targetXY.y,
    ySpeed: 0,
    targetHx: targetH.Hx,
    targetHy: targetH.Hy,
    age: 0,
    hue: 190 + 15 * Math.sin(this.stepCount / 50)
  };
  this.seeds.push(seed);
};
Hexocet.move = function() {
  // Move all particles
  for (var i = 0; i < this.seeds.length; i++) {
    var seed = this.seeds[i];
    // Get older
    seed.age++;
    // Save last position
    seed.xLast = seed.x;
    seed.yLast = seed.y;
    
    // Randomly change target
    if (Math.random() < this.targetBounceChance) {
      // Either move Hx or Hy, twice more likely to change Hx
      if (Math.random() > 0.33) {
        // Move Hx
        seed.targetHx += (Math.random() > 0.5 ? 1 : -1);
      } else {
        // Increase Hy + Hx is even
        if ((seed.targetHx + seed.targetHy) % 2 == 0) {
          seed.targetHy += 1;
        } else {
          seed.targetHy -= 1;
        }
        
      }
    }
    
    // Acceleration based on target
    var targetXY = this.hexCoordsToXY(seed.targetHx, seed.targetHy);
    // Spring
    var K = this.springStiffness;
    var accX = - K * (seed.x - targetXY.x);
    var accY = - K * (seed.y - targetXY.y);
    // Viscosity
    var visc = this.viscosity;
    accX -= visc * seed.xSpeed;
    accY -= visc * seed.ySpeed;
    // Speed
    seed.xSpeed += accX;
    seed.ySpeed += accY;
    
    // Speed calmers (here normalizers)
    /*
    var fixedSpeed = 0.0001;
		var maxSpeed = fixedSpeed, minSpeed = fixedSpeed;
		var speed = Math.sqrt(Math.pow(this.xSpeed, 2) + Math.pow(this.ySpeed, 2));
		if (speed > maxSpeed) {
			seed.xSpeed *= maxSpeed / speed;
			seed.ySpeed *= maxSpeed / speed;
		}
		if (speed < minSpeed) {
			seed.xSpeed *= minSpeed / speed;
			seed.ySpeed *= minSpeed / speed;
		}
    */
    
    // Position, with added canvas base size in order to maintain patterns accross zoom levels
    seed.x += 0.01 * seed.xSpeed * this.canvasBase;
    seed.y += 0.01 * seed.ySpeed * this.canvasBase;
  }
};
Hexocet.draw = function() {
  // Add translucid layer for trace effect
  if (this.fade) {
    var opa = this.fadeLayerOpacity;
    this.ctx.rect(0, 0, this.canvas.width, this.canvas.height);
		this.ctx.fillStyle = "rgba(0, 0, 0, " + opa + ")";
		this.ctx.fill();
  }
  for (var key in this.seeds) {
    var seed = this.seeds[key];

    // HSLA
    var hsla = {
      h: seed.hue,
      s: '90%',
      l: '55%',
      a: this.particleOpacity
    };

    // Line width
    var wLine = 2;

    // Stroke
    this.ctx.strokeStyle = 'hsla(' + hsla.h + ', ' + hsla.s + ', ' + hsla.l + ", " + hsla.a + ")";
    this.ctx.lineWidth = wLine;
    this.ctx.lineCap = "round";
    this.ctx.beginPath();
    this.ctx.moveTo(seed.xLast, seed.yLast);
    this.ctx.lineTo(seed.x, seed.y);
    this.ctx.stroke();
    
    // Point target in color
    /*
    hsla = {
      h: seed.hue,
      s: '70%',
      l: '100%',
      a: 0.01
    };
    
    wLine = 5;
    
    var targetXY = this.hexCoordsToXY(seed.targetHx, seed.targetHy);
    var tX = targetXY.x,
        tY = targetXY.y;
    this.ctx.lineWidth = wLine;
    this.ctx.strokeStyle = 'hsla(' + hsla.h + ', ' + hsla.s + ', ' + hsla.l + ", " + hsla.a + ")";
    this.ctx.beginPath();
    this.ctx.moveTo(tX, tY);
    this.ctx.lineTo(tX, tY);
    this.ctx.stroke();
    */
  }
};
Hexocet.testTheGrid = function() {
  // Line width
  var wLine = 5;

  // Stroke
  this.ctx.lineWidth = wLine;
  this.ctx.lineCap = "round";
  
  for (var i = -100; i < 100; i++) {
    for (var j = -100; j < 100; j++) {
      // HSLA
      var hsla = {
        h: 20 * j,
        s: '50%',
        l: '100%',
        a: 0.5
      };
      this.ctx.strokeStyle = 'hsla(' + hsla.h + ', ' + hsla.s + ', ' + hsla.l + ", " + hsla.a + ")";
      this.ctx.beginPath();
      var XY = this.hexCoordsToXY(i, j);
      this.ctx.moveTo(XY.x, XY.y);
      this.ctx.lineTo(XY.x, XY.y);
      this.ctx.stroke();
    }
  }
};

jQuery(document).ready(function() {
  Hexocet.setupCanvas();
  
  var frame = function() {
    Hexocet.update();
    window.requestAnimationFrame(frame);
  };
  frame();
  
  //Hexocet.testTheGrid();
  
  // Particle spread on click
  jQuery('canvas#hexocet').on('mousemove', function(event) {
    var x = event.pageX,
        y = event.pageY;
    Hexocet.birth(x, y)
  });
});

// Victor.js
/*!
MIT License

Copyright (c) 2011 Max Kueng, George Crabtree
 
Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:
 
The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.
 
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
  }
}
</script>

<style>
html, body {
  overflow: hidden;
}
#hexocet {
    position: absolute;
    top: 0;
    left: 0;
}
</style>