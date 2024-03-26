		// The following variables set the global width and height of the canvas to the viewport width and height on page load.
		var w = document.querySelector(".matter-js-canvas").clientWidth;
		var h = document.querySelector(".matter-js-canvas").clientHeight;
    
    // The following sets our canvas element as the Matter.js world.
    const world = document.querySelector(".matter-js-canvas");
    const {
        Engine,
        Render,
        Runner,
        World,
        Bodies
    } = Matter;
    // Below is where you'll place the image URLs you want to use for the sprite textures.
    const textures = [
       "https://uploads-ssl.webflow.com/62055dbc7a55d4069fa8caed/6206958a436d19ba5132c4e6_heart-pink.svg",
       "https://uploads-ssl.webflow.com/62055dbc7a55d4069fa8caed/6206958fc89e2b48712893a4_heart-pink-light.svg",
       "https://uploads-ssl.webflow.com/62055dbc7a55d4069fa8caed/6206958f638b03603ca3c7ca_heart-red.svg",
       "https://uploads-ssl.webflow.com/62055dbc7a55d4069fa8caed/6206959113216be8d53bf774_heart-maroon.svg"
       ];
		
    // This is how the ball shapes are generated. The sprite textures are applied to the ball shapes.
    function createBall() {
        const ball = Bodies.circle(Math.round(Math.random() * w), -30, 25, {
            angle: Math.PI * (Math.random() * 2 - 1),
            friction: 0.001,
            frictionAir: 0.01,
            restitution: 0.8,
            render: {
                sprite: {
                    texture: textures[
                        Math.floor(Math.random() * (textures.length))],
                }
            }
        });
				
        // The number below (35000) is the time in milliseconds it takes for the shapes to disappear.
        // Customize this number to make them disappear faster or more slowly.
        setTimeout(() => {
            World.remove(engine.world, ball);
        }, 35000);

        return ball;
    }

    const engine = Engine.create();
    const runner = Runner.create();
    const render = Render.create({
        canvas: world,
        engine: engine,
        options: {
            width: Math.min(w),
            height: Math.min(h),
            background: "transparent",
            wireframes: false
        }
    });

    const boundaryOptions = {
        isStatic: true,
        render: {
            fillStyle: "transparent",
            strokeStyle: "transparent"
        }
    };
    // This sets the ground of our world.
    const ground = Bodies.rectangle(800, h, w, 4, boundaryOptions);

    Render.run(render);
    Runner.run(runner, engine);

    World.add(engine.world, [ground]);

    const handleClick = () => {
        const ball2 = createBall();
        World.add(engine.world, [ball2]);
    };
		
		// The following adds an event listener when clicking a button with the #love-button ID.
    const button = document.querySelector("#love-button");
    button.addEventListener("click", handleClick);
