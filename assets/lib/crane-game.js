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
	    		render: {
	    			fillStyle: '#95a5a6'
	    		}
	    	},
	    	crane: {
	    		isStatic: true,
	    		render: {
	    			fillStyle: '#f1c40f'
	    		}
	    	}
	    }

	    // The Ground
	    var ground = Bodies.rectangle(200, 500, 300, 300, options.ground)
	   	World.add(world, ground);

	   	// The Building
	   	var building = Composites.stack(50, 160, 4, 10, 0, 0, function(x, y) {
	   		return Bodies.rectangle(x, y, 30, 20, options.building)
	   	})
	   	World.add(world, building);

	   	// The Crane
	   	var crane = [
	   		Bodies.rectangle(275, 325, 50, 50, options.crane),
	   		Bodies.rectangle(275, 175, 25, 250, options.crane),
	   		Bodies.rectangle(275, 75, 50, 50, options.crane),
	   		Bodies.rectangle(200, 75, 225, 25, options.crane),
	   	]
	   	World.add(world, crane);

	    // create runner
	    var runner = Runner.create();
	    Runner.run(runner, engine);

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