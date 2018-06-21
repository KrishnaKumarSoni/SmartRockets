
!function(e){if("object"==typeof exports)module.exports=e();else if("function"==typeof define&&define.amd)define(e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.Victor=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
	exports = module.exports = Victor;

	function Victor (x, y) {
		if (!(this instanceof Victor)) {
			return new Victor(x, y);
		}
		this.x = x || 0;
		this.y = y || 0;
	};

	Victor.fromArray = function (arr) {
		return new Victor(arr[0] || 0, arr[1] || 0);
	};

	Victor.fromObject = function (obj) {
		return new Victor(obj.x || 0, obj.y || 0);
	};

	Victor.prototype.addX = function (vec) {
		this.x += vec.x;
		return this;
	};

	Victor.prototype.addY = function (vec) {
		this.y += vec.y;
		return this;
	};

	Victor.prototype.add = function (vec) {
		this.x += vec.x;
		this.y += vec.y;
		return this;
	};


	Victor.prototype.addScalar = function (scalar) {
		this.x += scalar;
		this.y += scalar;
		return this;
	};

	Victor.prototype.addScalarX = function (scalar) {
		this.x += scalar;
		return this;
	};

	Victor.prototype.addScalarY = function (scalar) {
		this.y += scalar;
		return this;
	};

	Victor.prototype.subtractX = function (vec) {
		this.x -= vec.x;
		return this;
	};

	Victor.prototype.subtractY = function (vec) {
		this.y -= vec.y;
		return this;
	};

	Victor.prototype.subtract = function (vec) {
		this.x -= vec.x;
		this.y -= vec.y;
		return this;
	};

	Victor.prototype.subtractScalar = function (scalar) {
		this.x -= scalar;
		this.y -= scalar;
		return this;
	};

	Victor.prototype.subtractScalarX = function (scalar) {
		this.x -= scalar;
		return this;
	};

	Victor.prototype.subtractScalarY = function (scalar) {
		this.y -= scalar;
		return this;
	};

	Victor.prototype.divideX = function (vector) {
		this.x /= vector.x;
		return this;
	};

	Victor.prototype.divideY = function (vector) {
		this.y /= vector.y;
		return this;
	};

	Victor.prototype.divide = function (vector) {
		this.x /= vector.x;
		this.y /= vector.y;
		return this;
	};

	Victor.prototype.divideScalar = function (scalar) {
		if (scalar !== 0) {
			this.x /= scalar;
			this.y /= scalar;
		} else {
			this.x = 0;
			this.y = 0;
		}

		return this;
	};

	Victor.prototype.divideScalarX = function (scalar) {
		if (scalar !== 0) {
			this.x /= scalar;
		} else {
			this.x = 0;
		}
		return this;
	};

	Victor.prototype.divideScalarY = function (scalar) {
		if (scalar !== 0) {
			this.y /= scalar;
		} else {
			this.y = 0;
		}
		return this;
	};

	Victor.prototype.invertX = function () {
		this.x *= -1;
		return this;
	};

	Victor.prototype.invertY = function () {
		this.y *= -1;
		return this;
	};

	Victor.prototype.invert = function () {
		this.invertX();
		this.invertY();
		return this;
	};

	Victor.prototype.multiplyX = function (vector) {
		this.x *= vector.x;
		return this;
	};

	Victor.prototype.multiplyY = function (vector) {
		this.y *= vector.y;
		return this;
	};

	Victor.prototype.multiply = function (vector) {
		this.x *= vector.x;
		this.y *= vector.y;
		return this;
	};

	Victor.prototype.multiplyScalar = function (scalar) {
		this.x *= scalar;
		this.y *= scalar;
		return this;
	};

	Victor.prototype.multiplyScalarX = function (scalar) {
		this.x *= scalar;
		return this;
	};

	Victor.prototype.multiplyScalarY = function (scalar) {
		this.y *= scalar;
		return this;
	};

	Victor.prototype.normalize = function () {
		var length = this.length();

		if (length === 0) {
			this.x = 1;
			this.y = 0;
		} else {
			this.divide(Victor(length, length));
		}
		return this;
	};

	Victor.prototype.norm = Victor.prototype.normalize;

	Victor.prototype.limit = function (max, factor) {
		if (Math.abs(this.x) > max){ this.x *= factor; }
		if (Math.abs(this.y) > max){ this.y *= factor; }
		return this;
	};

	Victor.prototype.randomize = function (topLeft, bottomRight) {
		this.randomizeX(topLeft, bottomRight);
		this.randomizeY(topLeft, bottomRight);

		return this;
	};


	Victor.prototype.randomizeX = function (topLeft, bottomRight) {
		var min = Math.min(topLeft.x, bottomRight.x);
		var max = Math.max(topLeft.x, bottomRight.x);
		this.x = random(min, max);
		return this;
	};

	Victor.prototype.randomizeY = function (topLeft, bottomRight) {
		var min = Math.min(topLeft.y, bottomRight.y);
		var max = Math.max(topLeft.y, bottomRight.y);
		this.y = random(min, max);
		return this;
	};


	Victor.prototype.randomizeAny = function (topLeft, bottomRight) {
		if (!! Math.round(Math.random())) {
			this.randomizeX(topLeft, bottomRight);
		} else {
			this.randomizeY(topLeft, bottomRight);
		}
		return this;
	};


	Victor.prototype.unfloat = function () {
		this.x = Math.round(this.x);
		this.y = Math.round(this.y);
		return this;
	};


	Victor.prototype.toFixed = function (precision) {
		if (typeof precision === 'undefined') { precision = 8; }
		this.x = this.x.toFixed(precision);
		this.y = this.y.toFixed(precision);
		return this;
	};


	Victor.prototype.mixX = function (vec, amount) {
		if (typeof amount === 'undefined') {
			amount = 0.5;
		}

		this.x = (1 - amount) * this.x + amount * vec.x;
		return this;
	};

	Victor.prototype.mixY = function (vec, amount) {
		if (typeof amount === 'undefined') {
			amount = 0.5;
		}

		this.y = (1 - amount) * this.y + amount * vec.y;
		return this;
	};

	Victor.prototype.mix = function (vec, amount) {
		this.mixX(vec, amount);
		this.mixY(vec, amount);
		return this;
	};

	Victor.prototype.clone = function () {
		return new Victor(this.x, this.y);
	};


	Victor.prototype.copyX = function (vec) {
		this.x = vec.x;
		return this;
	};

	Victor.prototype.copyY = function (vec) {
		this.y = vec.y;
		return this;
	};

	Victor.prototype.copy = function (vec) {
		this.copyX(vec);
		this.copyY(vec);
		return this;
	};

	Victor.prototype.zero = function () {
		this.x = this.y = 0;
		return this;
	};

	Victor.prototype.dot = function (vec2) {
		return this.x * vec2.x + this.y * vec2.y;
	};

	Victor.prototype.cross = function (vec2) {
		return (this.x * vec2.y ) - (this.y * vec2.x );
	};

	Victor.prototype.projectOnto = function (vec2) {
		var coeff = ( (this.x * vec2.x)+(this.y * vec2.y) ) / ((vec2.x*vec2.x)+(vec2.y*vec2.y));
		this.x = coeff * vec2.x;
		this.y = coeff * vec2.y;
		return this;
	};


	Victor.prototype.horizontalAngle = function () {
		return Math.atan2(this.y, this.x);
	};

	Victor.prototype.horizontalAngleDeg = function () {
		return radian2degrees(this.horizontalAngle());
	};

	Victor.prototype.verticalAngle = function () {
		return Math.atan2(this.x, this.y);
	};

	Victor.prototype.verticalAngleDeg = function () {
		return radian2degrees(this.verticalAngle());
	};

	Victor.prototype.angle = Victor.prototype.horizontalAngle;
	Victor.prototype.angleDeg = Victor.prototype.horizontalAngleDeg;
	Victor.prototype.direction = Victor.prototype.horizontalAngle;

	Victor.prototype.rotate = function (angle) {
		var nx = (this.x * Math.cos(angle)) - (this.y * Math.sin(angle));
		var ny = (this.x * Math.sin(angle)) + (this.y * Math.cos(angle));

		this.x = nx;
		this.y = ny;

		return this;
	};

	Victor.prototype.rotateDeg = function (angle) {
		angle = degrees2radian(angle);
		return this.rotate(angle);
	};

	Victor.prototype.rotateTo = function(rotation) {
		return this.rotate(rotation-this.angle());
	};

	Victor.prototype.rotateToDeg = function(rotation) {
		rotation = degrees2radian(rotation);
		return this.rotateTo(rotation);
	};

	Victor.prototype.rotateBy = function (rotation) {
		var angle = this.angle() + rotation;

		return this.rotate(angle);
	};

	Victor.prototype.rotateByDeg = function (rotation) {
		rotation = degrees2radian(rotation);
		return this.rotateBy(rotation);
	};

	Victor.prototype.distanceX = function (vec) {
		return this.x - vec.x;
	};


	Victor.prototype.absDistanceX = function (vec) {
		return Math.abs(this.distanceX(vec));
	};


	Victor.prototype.distanceY = function (vec) {
		return this.y - vec.y;
	};


	Victor.prototype.absDistanceY = function (vec) {
		return Math.abs(this.distanceY(vec));
	};


	Victor.prototype.distance = function (vec) {
		return Math.sqrt(this.distanceSq(vec));
	};


	Victor.prototype.distanceSq = function (vec) {
		var dx = this.distanceX(vec),
		dy = this.distanceY(vec);

		return dx * dx + dy * dy;
	};

	Victor.prototype.length = function () {
		return Math.sqrt(this.lengthSq());
	};

	Victor.prototype.lengthSq = function () {
		return this.x * this.x + this.y * this.y;
	};

	Victor.prototype.magnitude = Victor.prototype.length;

	Victor.prototype.isZero = function() {
		return this.x === 0 && this.y === 0;
	};

	Victor.prototype.isEqualTo = function(vec2) {
		return this.x === vec2.x && this.y === vec2.y;
	};

	Victor.prototype.toString = function () {
		return 'x:' + this.x + ', y:' + this.y;
	};

	Victor.prototype.toArray = function () {
		return [ this.x, this.y ];
	};

	Victor.prototype.toObject = function () {
		return { x: this.x, y: this.y };
	};


	var degrees = 180 / Math.PI;

	function random (min, max) {
		return Math.floor(Math.random() * (max - min + 1) + min);
	}

	function radian2degrees (rad) {
		return rad * degrees;
	}

	function degrees2radian (deg) {
		return deg / degrees;
	}

},{}]},{},[1])
(1)
});






/**********************CODE STARTS HERE*********************************/


var canvas = document.querySelector('canvas');
var c = canvas.getContext('2d');

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
c.translate(canvas.width/2, canvas.height);

//GUIDE LINE
// c.beginPath();
// c.moveTo(0, 0);
// c.lineTo(0, -canvas.height);
// c.strokeStyle = "red";
// c.stroke();
// c.closePath();


//utility functions
function fillRectCentered(x, y, w, h){
	c.fillRect(x - (w/2), y - (h/2), w, h);
}

function randomIn(min, max){
	return Math.random()*(max-min) + min;
}

function randomVector(mag){
	var theta = Math.random()*(Math.PI*2);

	if(mag) magnitude = mag;
	else magnitude = Math.random();

	return Victor(mag*Math.cos(theta), mag*Math.sin(theta));
}
function distance(x1, y1, x2, y2){
	return Math.sqrt((x2 - x1)*(x2-x1) + (y2-y1)*(y2-y1));
}


//variables
var inst = document.getElementById('instructions').style;
var popSize = 30;
var population;
var lifespan = 300;
var target;
var mutation = 0.01;
var reward = 100;
var penalty = 100;
var forceValue = 0.4;
//obstacle
var ry = -canvas.height/2;
var w = 300;
var h = 20;
var rx = -w/2;

console.log(document.getElementById('instructions').style);

var opac = 1;
setInterval(
	function(){
		document.getElementById('instructions').style.opacity = opac;
		opac -= 0.01;
		console.log("done!");
	}, 100);


function reset(){
	if(document.getElementById('popSizeInput').value) popSize = document.getElementById('popSizeInput').value;
	else popSize = 30;
	if(document.getElementById('lifeSpanInput').value) lifespan = document.getElementById('lifeSpanInput').value;
	else lifespan = 300;
	if(document.getElementById('mutationInput').value) mutation = document.getElementById('mutationInput').value;
	else mutation = 0.01;
	if(document.getElementById('mutationInput').value > 0.99) 
		alert("SETTING MUTATION GREATER THAN 0.99 WILL LEAD TO UNEXPECTED RESULTS...(An optimum value could be (0.01 to 0.1))");

	initialise();
	count = 0;
	genNo = 1;
}

document.getElementById('lifeSpanInput').value = lifespan;
document.getElementById('popSizeInput').value = popSize;
document.getElementById('mutationInput').value = mutation;

function initialise(){
	population = new Population();
	target = new Victor(0, -500);
}
initialise();

function Population(){
	this.rockets = [];
	this.matingpool = [];

	for(var i=0; i<popSize; i++){
		this.rockets[i] = new Rocket();
	}

	this.evaluate = function(){
		
		var maxfit = 0;
		for(var i=0; i<popSize; i++){
			this.rockets[i].calcFitness();
			if(this.rockets[i].fitness > maxfit) maxfit = this.rockets[i].fitness;
		}

		//to make all fitness range from (0,1)
		for(var i=0; i<popSize; i++){
			this.rockets[i].fitness /= maxfit;
		}

		this.matingpool = [];
		for(var i=0; i<popSize; i++){
			var n = Math.floor(this.rockets[i].fitness * 100);
			for(var j=0; j<n; j++){
				this.matingpool.push(this.rockets[i]);
			}
		}
	}
	this.selection = function(){
		var newRockets = [];
		for(var i=0; i<popSize; i++){
			var parentA = this.matingpool[Math.floor(randomIn(0, this.matingpool.length))].dna;
			var parentB = this.matingpool[Math.floor(randomIn(0, this.matingpool.length))].dna;
			var child = parentA.crossover(parentB);
			child.mutation();
			newRockets[i] = new Rocket(child);
		}

		this.rockets = newRockets;
	}



}

function DNA(genes){
	if(genes) this.genes = genes;
	else {
		this.genes = [];
		for(var i=0; i<lifespan; i++){
			this.genes[i] = randomVector(forceValue);
		}
	}

	this.crossover = function(parent){
		var newgenes = [];
		var midpoint = Math.floor(randomIn(0, lifespan));
		for(i=0; i<lifespan; i++){
			if(i < midpoint) newgenes[i] = this.genes[i];
			else if(i >= midpoint) newgenes[i] = parent.genes[i];
		}
		return new DNA(newgenes);
	}

	this.mutation = function(){
		for(var i=0; i<popSize; i++){
			if(randomIn(0, 1) < mutation){
				this.genes[i] = randomVector(forceValue);
				console.log("MUTATED GENE!");
			}
		}
	}
}

function Rocket(dna){
	this.pos = Victor(0, -100);
	this.vel = Victor(0, 0);
	this.acc = Victor(0, 0);
	if(dna) this.dna = dna;
	else this.dna = new DNA();
	this.count = 0;
	this.fitness = 0;
	this.completed = false;
	this.crashed = false;

	this.update = function(){
		var dist = distance(this.pos.x, this.pos.y, target.x, target.y)
		if(dist <= 30){
			this.completed = true;
		}

		if(this.pos.x > rx  && this.pos.x < rx + w && this.pos.y > ry  && this.pos.y < ry + h){
			this.crashed = true;
		}

		if(this.pos.x > inst.left  && this.pos.x < inst.left + inst.width && this.pos.y > inst.top && this.pos.y < inst.height + inst.top){
			this.crashed = true;
		}



		if(!this.completed && !this.crashed){
			this.acc.add(this.dna.genes[this.count]);
			this.count++;
			if(this.count == lifespan) this.count = 0;			
			this.vel.add(this.acc);
			this.pos.add(this.vel);
			this.acc.multiply(Victor(0, 0));
		}
	}

	this.show = function(){
		c.beginPath();
		c.fillStyle = "rgba(255, 255, 255, 0.7)";
		c.translate(this.pos.x, this.pos.y);
		c.rotate(Math.PI/2 - Math.atan(-this.vel.y/this.vel.x));
		fillRectCentered(0, 0, 5, 25);
		c.rotate(-Math.PI/2 + Math.atan(-this.vel.y/this.vel.x));
		c.translate(-this.pos.x, -this.pos.y);
	}

	this.calcFitness = function(){
		var d = distance(this.pos.x, this.pos.y, target.x, target.y);
		this.fitness = 1/d;

		if(this.completed == true) this.fitness *= reward;
		if(this.crashed == true) this.fitness /= penalty;
	}
}

var count = 0;
var genNo = 1;

function animate(){
	count++;
	requestAnimationFrame(animate);


	c.fillStyle = "black";
	c.fillRect(0, 0, -canvas.width, -canvas.height);
	c.fillRect(0, 0, canvas.width, -canvas.height);

	c.fillStyle = "rgba(255, 255, 255, 0.5)";
	for(var i=0; i<popSize; i++){
		fillRectCentered(population.rockets[i].pos.x, population.rockets[i].pos.y, 2, 2);
	}

	c.fillStyle = "white";
	c.arc(target.x, target.y, 25, 0, Math.PI*2, false);
	c.fill();

	c.fillRect(rx, ry, w, h);

	if(count == lifespan){
		genNo++;
		count = 0;
		population.evaluate();
		population.selection();
	}
	
	for(i=0; i<popSize; i++){
		population.rockets[i].update();
		population.rockets[i].show();
	}
	document.getElementById('genNo').innerHTML = "GENERATION NO: " + genNo;

}

animate();