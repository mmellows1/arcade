$(document).ready(function(event) {

	var Example = Example || {};
	
	Example.bridge = function() {
	    var Engine = Matter.Engine,
	        Render = Matter.Render,
	        Runner = Matter.Runner,
	        Body = Matter.Body,
	        Composite = Matter.Composite,
	        Composites = Matter.Composites,
	        Common = Matter.Common,
	        Constraint = Matter.Constraint,
	        MouseConstraint = Matter.MouseConstraint,
	        Mouse = Matter.Mouse,
	        World = Matter.World,
	        Bodies = Matter.Bodies,
	        Events = Matter.Events,
	        Pairs = Matter.Pairs;

	    // create engine
	    var engine = Engine.create(),
	        world = engine.world;

	    // create renderer
	    var render = Render.create({
	        element: document.getElementById('console'),
	        engine: engine,
	        options: {
	        	background: '#34495e',
	            width: 400,
	            height: 600,
	            showAngleIndicator: false,
	            wireframes: false
	        }
	    });

	    Render.run(render);

	    var options = {
	    	ground: {
	    		isStatic: true,
	    		render: {
	    			fillStyle: '#f5f5f5'
	    		}
	    	},
	    	building: {
	    		density: 4,
	    		friction: 12,
	    		render: {
	    			fillStyle: '#95a5a6'
	    		}
	    	},
	    	buildingGuide: {
	    		isStatic: true,
	    		isSensor: true,
	    		render: {
	    			fillStyle: 'transparent',
	    			strokeStyle: 'lime',
	    			lineWidth: 1
	    		}
	    	},
	    	crane: {
	    		isStatic: true,
	    		render: {
	    			fillStyle: '#f1c40f'
	    		}
	    	},
	    	string: {
	    		isStatic: true,
	    		render: {
	    			fillStyle: '#f39c12'
	    		}
	    	},
	    	hook: {
	    		render: {
	    			fillStyle: 'yellow'
	    		}
	    	}
	    }

	   	var ground = Composite.create({
	   		bodies: [
	   			Bodies.rectangle(150, 750, 250, 400, options.ground)
	   		]
	   	}, true);

	   	var crane = Composite.create({
	   		bodies: [
	   			Bodies.rectangle(340, 600, 75, 75, options.crane),
	   			Bodies.rectangle(340, 375, 25, 800, options.crane),
	   			Bodies.rectangle(340, 300, 75, 75, options.crane),
	   			Bodies.rectangle(200, 300, 350, 25, options.crane),
	   			Bodies.rectangle(53, 300, 25, 50, options.crane),
	   			Bodies.rectangle(52.5, 375, 10, 100, options.string)
	   		],
	   		label: 'Crane'
	   	}, true);

	   	crane.bodies[crane.bodies.length - 1].label = "String";

	   	var building = Composites.stack(50, 500, 4, 2, 0, 0, function(x, y) {
	   		var BuildingBlock = Bodies.rectangle(x, y, 30, 25, options.building);
	   			BuildingBlock.label = 'BuildingBlock';
	   		return BuildingBlock;
	   	});

	   	for(var i = 0; i < building.bodies.length; i++) {
	   		 console.log(building.bodies[i].label);
	   	}

	   	var buildingGuide = Composites.stack(200, 450, 1, 4, 0, 0, function(x, y) {
	   		return Bodies.rectangle(x, y, 30, 25, options.buildingGuide);
	   	})

	   	buildingGuide.label = 'BuildingGuide';

	   	World.add(world, [ground, crane, building, buildingGuide]);

	    // create runner
	    var runner = Runner.create();
	    Runner.run(runner, engine);

	    var buildingToCrane = Composite.create();


	    // This function attaches the building blocks to the cranes string
    	Events.on(engine, 'collisionStart', function(event) {
	        var pairs = event.pairs;

	        // change object colours to show those starting a collision
	        for (var i = 0; i < pairs.length; i++) {
	            var pair = pairs[i];
	            console.log(pair);
	            if(pair.bodyB.label == 'BuildingBlock' && pair.bodyA.label == 'String') {
	            	pair.bodyA.render.fillStyle = 'red';
	            	pair.bodyB.render.fillStyle = 'green';
	            	buildingToCrane.constraints = [
		            		Constraint.create({
		            		bodyA: pair.bodyA,
		            		bodyB: pair.bodyB,
		            		pointA: {x: 0, y:45},
		            		label: 'BuildingBlockToCrane'
		            	}) 
	            	]
	            	World.add(world, buildingToCrane);
	            }
	        }
	    });

	    // This function detaches the building blocks from the cranes string
	    var Detach = function() {
	    	console.log('Detaching');
	    	// Composite.allConstraints(buildingToCrane);
	    	console.log(Composite.allConstraints(buildingToCrane));
	    	World.clear(buildingToCrane);
	    }

        // This function fixes the animation to be smoother
        var Controller = function(body, timing, interval, translate) {
        	var count = 1;
			var myVar = setInterval(function(){ 
				count++;
				if(count >= timing) {
					clearInterval(myVar);
				} else {
					return Body.translate(body, translate);	
				}
			}, interval);
        }

		var count = 1;
		$(document).bind('keydown keyup', function( event ) {
			var intervals = 12;
			var speed = 0.05;

			// Left click
			if(event.which == 37) {
				event.preventDefault();
				Controller(crane.bodies[5], intervals, speed, {x: -0.5, y: 0});
				Controller(crane.bodies[4], intervals, speed, {x: -0.5, y: 0});
			}

			// Right key
			if(event.which == 39) {
				event.preventDefault();
				Controller(crane.bodies[5], intervals, speed, {x: 0.5, y: 0});
				Controller(crane.bodies[4], intervals, speed, {x: 0.5, y: 0});
			}

			// Up key
			if(event.which == 38) {
				event.preventDefault();
				Controller(crane.bodies[5], intervals, speed, {x: 0, y: -0.5});
				Controller(crane.bodies[4], intervals, speed, {x: 0, y: -0.5});
				Controller(crane.bodies[3], intervals, speed, {x: 0, y: -0.5});
				Controller(crane.bodies[2], intervals, speed, {x: 0, y: -0.5});
			}

			// Down key
			if(event.which == 40) {
				event.preventDefault();
				Controller(crane.bodies[5], intervals, speed, {x: 0, y: 0.5});
				Controller(crane.bodies[4], intervals, speed, {x: 0, y: 0.5});
				Controller(crane.bodies[3], intervals, speed, {x: 0, y: 0.5});
				Controller(crane.bodies[2], intervals, speed, {x: 0, y: 0.5});
			}

			// Pick up button (space)
			if(event.which == 32) {
				Attach();
			}

			// Drop button (d)
    		if(event.which == 68) {	
    			Detach();
    		}
		});

		// This needs to be seperated from the triggers above because the keypress is not
		// read properly...
		// var count = 0;
		// $(document).keypress(function(event) {
		// 	if(count == 0) {
		// 		count++;
		// 		if(event.which == '32') {
		// 			event.preventDefault();
		// 		}
		// 	}
		// 	else if(count > 0) {
		// 		count--;
		// 		if(event.which == '32') {
		// 			event.preventDefault();
		// 		}
		// 	}
		// })

	    // context for MatterTools.Demo
	    return {
	        engine: engine,
	        runner: runner,
	        render: render,
	        canvas: render.canvas,
	        stop: function() {
	            Matter.Render.stop(render);
	            Matter.Runner.stop(runner);
	        }
	    };
	};
	Example.bridge();
})

