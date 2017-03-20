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

	    // =====================================
	    // Body/Composite/Constraints options
	    // =====================================
	    var options = {
	    	correct: {
	    		isStatic: false,
	    		render: {
	    			fillStyle: '#27ae60'
	    		}
	    	}
	    }

	    // =====================================
	    // Bodies
	    // =====================================
	    var correct = Composites.stack(50, 50, 5, 8, 10, 10, function(x, y) {
	    	var CorrectBox = Bodies.rectangle(x, y, 50, 50, options.correct);
	   			CorrectBox.label = 'CorrectBox';
	   		return CorrectBox;
	    })

	    World.add(world, correct);
	    
	    // =====================================
	    // Functions
	    // =====================================
	    var ShowBox = function(id) {

	    };

	    var HideBox = function(id) {

	    };

	    var UpdateScore = function() {

	    };

	    var Init = function() {

	    };
	}
	Example.ninja();
})