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
	        Events = Matter.Events;

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

	    console.log(render);

	    Render.run(render);

	    var options = {
	    	ground: {
	    		isStatic: true,
	    		render: {
	    			fillStyle: '#f5f5f5'
	    		}
	    	},
	    	building: {
	    		render: {
	    			fillStyle: '#95a5a6'
	    		}
	    	},
	    	buildingGuide: {
	    		isStatic: true,
	    		render: {
	    			fillStyle: '#34495e',
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
	    		render: {
	    			fillStyle: '#f39c12'
	    		}
	    	},
	    	hook: {
	    		density:2,
	    		render: {
	    			fillStyle: 'yellow'
	    		}
	    	}
	    }

	    // The Ground
	    // var ground = Bodies.rectangle(200, 500, 300, 300, options.ground)
	   	// World.add(world, ground);

	   	// The Building
	   	// var building = Composites.stack(50, 320, 4, 2, 0, 0, function(x, y) {
	   	// 	return Bodies.rectangle(x, y, 30, 20, options.building)
	   	// })

	   	// The String from the Crane
	   	// var string = Composites.stack(88, 90, 1, 30, 40, 0, function(x, y) {
	   	// 	return Bodies.circle(x, y, 2, options.string)
	   	// })
	   	// Composites.chain(string, 0, 0, 0, 0);

	   	// var hook = Bodies.rectangle(90, 220, 30, 10, options.hook)

	   	// var attach = Constraint.create({
	   	// 	bodyA: hook,
	   	// 	bodyB: string.bodies[string.bodies.length - 1]
	   	// })


	   	// World.add(world, [string, hook, attach, building]);

	   	// The Crane
	   	// var crane = [
	   	// 	Bodies.rectangle(275, 325, 50, 50, options.crane),
	   	// 	Bodies.rectangle(275, 175, 25, 250, options.crane),
	   	// 	Bodies.rectangle(275, 75, 50, 50, options.crane),
	   	// 	Bodies.rectangle(200, 75, 225, 25, options.crane),
	   	// 	Bodies.rectangle(90, 75, 12, 35, options.crane),
	   	// ]
	   	// World.add(world, crane);

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
	   		]
	   	}, true);
	   	var building = Composites.stack(50, 500, 4, 2, 0, 0, function(x, y) {
	   		return Bodies.rectangle(x, y, 30, 25, options.building);
	   	});
	   	var buildingGuide = Composites.stack(200, 450, 1, 4, 0, 0, function(x, y) {
	   		return Bodies.rectangle(x, y, 30, 25, options.buildingGuide);
	   	})
	   	var string = Composites.stack(50, 330, 1, 25, 0, 0, function(x, y) {
	   		return Bodies.circle(x, y, 3, options.string);
	   	});
	   	Composites.chain(string, 0, 0, 0, 0);
	   	var attachment = Constraint.create({
	   		bodyA:crane.bodies[4],
	   		bodyB:string.bodies[0]
	   	})
	   	// var hook;

	   	World.add(world, [ground, crane, building, buildingGuide, string, attachment/* hook */]);


	    // create runner
	    var runner = Runner.create();
	    Runner.run(runner, engine);

	    var mouse = Mouse.create(render.canvas),
        mouseConstraint = MouseConstraint.create(engine, {
            mouse: mouse,
            constraint: {
                stiffness: 0.2,
                render: {
                    visible: false
                }
            }
        });

        var Controller = function(body, timing, interval, translate) {
        	var count = 1;
			var myVar = setInterval(function(){ 
				console.log(body, timing, translate, count);
				count++;
				if(count >= timing) {
					clearInterval(myVar);
				} else {
					return Body.translate(body, translate);	
				}
			}, interval);
        }

		var count = 1;
		$("body").bind( "keypress keydown", function( event ) {
			if(event.which == '37') {
				// Left click
				event.preventDefault();
				Controller(crane.bodies[4], 25, 1, {x: -0.5, y: 0});
			}
			if(event.which == '39') {
				// Right key
				event.preventDefault();
				Controller(crane.bodies[4], 25, 1, {x: 0.5, y: 0});
			}
			if(event.which == '38') {
				// Up key
				event.preventDefault();
				Controller(crane.bodies[4], 25, 1, {x: 0, y: -0.5});
				Controller(crane.bodies[3], 25, 1, {x: 0, y: -0.5});
				Controller(crane.bodies[2], 25, 1, {x: 0, y: -0.5});
			}
			if(event.which == '40') {
				// Down key
				event.preventDefault();
				Controller(crane.bodies[4], 25, 1, {x: 0, y: 0.5});
				Controller(crane.bodies[3], 25, 1, {x: 0, y: 0.5});
				Controller(crane.bodies[2], 25, 1, {x: 0, y: 0.5});
			}
		});

    	World.add(world, mouseConstraint);

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