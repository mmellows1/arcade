// ========================================
// Controller Object
// ========================================
var controller = {
	left: 213
}

// ========================================
// Matter JS
// ========================================

// module aliases
var Engine = Matter.Engine,
    Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies;


var sizes = {
	canvas: {
		width: $(window).width(),
		height: 600
	},
	snowball: {
		width: 3,
		height: 3
	},
	igloo: {
		width: 40,
		height: 40
	},
	tower: {
		width: 40,
		height: 400
	},
	ground: {
		width: 1200,
		height: 40
	}
}

// create an engine
var engine = Engine.create();

// create a renderer
var init = Render.create({
    element: document.getElementById('canvas'),
    engine: engine,
    options: {
        width: sizes.canvas.width,
	    height: sizes.canvas.height,
	    showAngleIndicator: true,
	    wireframes: false,
	    showAngleIndicator: false
	}
});

// run the renderer
Render.run(init);
var array = [];

var options = {
	friction: 100,
	restitution:0,
	speed:12312,
	render: {
		fillStyle: '#f5f5f5'
	}
}

var groundOptions = {
	isStatic: true,
	render: {
		fillStyle: '#f5f5f5'
	}

}

var iglooOptions = {
	isStatic: true,
	render: {
		fillStyle: '#f5f5f5',
		strokeStyle: '#323232',
		strokeWidth: 4
	}
}

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

console.log(array);

// Add the ground & igloos
// Ground
addToWorld(Bodies.rectangle($(window).width() / 2, 600, $(window).width(), 40, groundOptions))

// Igloo
addToWorld(Bodies.circle(getRandomArbitrary(0, sizes.canvas.width), 580, sizes.igloo.width, iglooOptions));

// Igloo
addToWorld(Bodies.circle(getRandomArbitrary(0, sizes.canvas.width), 580, sizes.igloo.width, iglooOptions));

// Igloo
addToWorld(Bodies.circle(getRandomArbitrary(0, sizes.canvas.width), 580, sizes.igloo.width, iglooOptions));

// Igloo
addToWorld(Bodies.circle(getRandomArbitrary(0, sizes.canvas.width), 580, sizes.igloo.width, iglooOptions));


// ========================================
// Triggers
// ========================================
$('.add-to-world').mousemove(function(event) {
	addToWorld(Bodies.circle(getRandomArbitrary(0, sizes.canvas.width), getRandomArbitrary(0, 400), sizes.snowball.width, options));
})

$('.clear-from-world').click(function(event) {
	clearFromWorld();
})

$('.move-cup').click(function() {

})

function addToWorld(Body) {
	return World.add(engine.world, Body)
}

function clearFromWorld() {
	return World.clear(engine.world, true);
}

// run the engine
Engine.run(engine);