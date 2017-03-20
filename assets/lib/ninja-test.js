$(document).ready(function(event) {

	var Example = Example || {};

	Example.ninja = function() {
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
	        	background: '#ecf0f1',
	            width: 400,
	            height: 580,
	            showAngleIndicator: false,
	            wireframes: false
	        }
	    });

		// width: 800,
		// height: 600,
		// pixelRatio: 1,
		// background: '#fafafa',
		// wireframeBackground: '#222',
		// hasBounds: !!options.bounds,
		// enabled: true,
		// wireframes: true,
		// showSleeping: true,
		// showDebug: false,
		// showBroadphase: false,
		// showBounds: false,
		// showVelocity: false,
		// showCollisions: false,
		// showSeparations: false,
		// showAxes: false,
		// showPositions: false,
		// showAngleIndicator: false,
		// showIds: false,
		// showShadows: false,
		// showVertexNumbers: false,
		// showConvexHulls: false,
		// showInternalEdges: false,
		// showMousePosition: false

	    Render.run(render);

	    // create runner
	    var runner = Runner.create();
	    Runner.run(runner, engine);

	    // =====================================
	    // Body/Composite/Constraints options
	    // =====================================
	    var options = {
	    	box: {
	    		isStatic: true,
	    		render: {
	    			fillStyle: 'transparent',
	    			lineWidth: 1,
	    			strokeStyle: '#95a5a6'
	    		}
	    	},
	    	correct: {
	    		isStatic: false,
	    		render: {
	    			fillStyle: '#27ae60'
	    		}
	    	}
	    }

	    // =====================================
	    // Mouse Controller
	    // =====================================
		var mouse = Mouse.create(render.canvas),
        	mouseConstraint = MouseConstraint.create(engine, {
	            mouse: mouse,
	            constraint: {
	                stiffness: 0.2,
	                render: {
	                    visible: true
	                }
	            }
        });

    	World.add(world, mouseConstraint);

	    // =====================================
	    // Bodies
	    // =====================================
	    var box = Composites.stack(50, 50, 5, 8, 10, 10, function(x, y) {
	    	var Box = Bodies.rectangle(x, y, 50, 50, options.box);
	   			Box.label = 'Box';
	   		return Box;
	    })

	    World.add(world, box);
	    
	    Events.on(mouseConstraint, "mousedown", function(event) {
	    	console.log(event);
	    })

	    // =====================================
	    // Functions
	    // =====================================

	    var RandomBox = function() {
	    	var all = Composite.allBodies(box);
	    	var randBox = all[Math.floor(Math.random() * ((all.length - 1) - 0 + 1) + 0)];
	    		$.extend(true, randBox, options.correct);
	    		setTimeout(function(){ 
	    			$.extend(true, randBox, options.box);
	    			RandomBox();
	    		}, 3000);
	    }

	    var ChangeBox = function(body) {

	    };

	    var HideBox = function(body) {

	    };

	    var UpdateScore = function() {

	    };

	    $('#start-game').click(function(event) {
	    	RandomBox();
	    	$(this).attr('disabled', true);
	    })


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
	}

	Example.ninja();
})