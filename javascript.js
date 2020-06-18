console.log('i am working');

// Select the elements on the page that we will be using and that the user will be ineracting with - canvas, shake button
const canvas = document.querySelector('#etch-a-sketch');
const ctx = canvas.getContext('2d'); // sets up the canvas
const shakeButton = document.querySelector('.shake');
const increaseStroke = document.querySelector('.increase');
const decreaseStroke = document.querySelector('.decrease');
let MOVE_AMOUNT = 90;

// Set up our canvas for drawing 
const { width, height } = canvas; //destructing - making a variable called height and width from the same properites on our canvas

// Create random x and y values for starting point on the canvas
let x = Math.floor(Math.random() * width);
let y = Math.floor(Math.random() * height);

ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.lineWidth = MOVE_AMOUNT;

let hue = 0;
ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;

ctx.beginPath();
ctx.moveTo(x, y);
ctx.lineTo(x, y);
ctx.stroke();

// Write a draw function
function draw({ key }) {
    // incrementing the hue colour
    hue += 10;
    ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`; //we have to explictly reupdate this here
    console.log(key);
    // start the path of the drawing
    ctx.beginPath();
    ctx.moveTo(x, y); //where is started

    // move our x and y values depending on what the user did
    switch (key) {
        case 'ArrowUp':
            y -= MOVE_AMOUNT;
            break;
        case 'ArrowRight':
            x += MOVE_AMOUNT;
            break;
        case 'ArrowDown':
            y += MOVE_AMOUNT;
            break;
        case 'ArrowLeft':
            x -= MOVE_AMOUNT;
            default:
                break;
    }
    // x -= MOVE_AMOUNT; //is the same as x = x - 10
    // y -= MOVE_AMOUNT;
    ctx.lineTo(x,y); //connects the old line to the new line
    ctx.stroke(); //creates the stroke so that we can see the line
}

// Write a function to change the size of the paint stroke
function strokeIncreaser() {
    let newvalue = MOVE_AMOUNT++;
    ctx.lineWidth = newvalue;
    console.log('i am increasing' + newvalue);
}

function strokeDecreaser() {
    let newvalue = MOVE_AMOUNT--;
    ctx.lineWidth = newvalue;
    console.log('i am decreasing' + newvalue);
}

// Write a handler function for the keys 
function handleKey(e) {
    if (e.key.includes('Arrow')) {
        e.preventDefault(); // stops the browser from moving up and down and keeps the etch-a-sketch still
        draw({ key: e.key });
    }
}

// Write a function to shake and clear the canvas
function clearCanvas() {
    canvas.classList.add('shake');
    ctx.clearRect(0, 0, width, height);
    canvas.addEventListener('animationend', function() {
        console.log('done the shake');
        canvas.classList.remove('shake');
    }, 
    { once: true })
}

// Listen for arrow keys when the user is drawing
window.addEventListener('keydown', handleKey); 
shakeButton.addEventListener('click', clearCanvas);
increaseStroke.addEventListener('click', strokeIncreaser);
decreaseStroke.addEventListener('click', strokeDecreaser);