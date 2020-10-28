const fileNames = ['bluecoats/bluecoats1.PNG', 'bluecoats/bluecoats2.PNG', 'bluecoats/bluecoats3.PNG', 'bluecoats/bluecoats4.PNG', 'bluecoats/bluecoats5.PNG', 'bluecoats/bluecoats6.PNG',
    'drawings/drawing1.png', 'drawings/drawing2.jpeg', 'drawings/drawing3.jpg', 'drawings/drawing4.jpeg', 'drawings/drawing5.jpeg', 'drawings/drawing6.JPG', 'drawings/drawing7.jpeg', 'drawings/drawing8.jpg'];

function changePhoto(path) {
    let frame = document.getElementById('photo_frame');
    if(path) {
        frame.src = path;
        frame.scrollIntoView(); // use to scroll to a particular element
        return;
    }

    // get a random index value for picking an item from our fileNames array
    let randIndex = Math.floor(Math.random() * fileNames.length);
    frame.src = 'images/' + fileNames[randIndex];
    // clear caption when we're randomly selecting an image so we don't use a mismatched one
    document.getElementById('photo_caption').innerHTML = ""; 
}

function showCaption(caption) {
    document.getElementById('photo_caption').innerHTML = "Image Caption: " + caption;
}

// we have two tables, so let's access them 
const table = document.getElementsByTagName('table');
// for each of our tables, we're going tog get all 
//     img-tagged elements and attach event listeners to them
for(let i = 0; i < table.length; ++i) {
    const imageElements = table[i].getElementsByTagName('img');
    console.log(imageElements);

    for(let j = 0; j < imageElements.length; ++j) { 
        // event listeners allow you to assign multiple actions to the same type of event
        //     (unlike attaching event callbacks via the DOM)
        imageElements[j].addEventListener('click', function(){changePhoto(this.src);});
        imageElements[j].addEventListener('click', function(){showCaption(this.alt);});
    }
}

function clearCanvas() {
    drawing.context.clearRect(0, 0, drawing.canvas.width, drawing.canvas.height);
}

function newCanvas() {
    // remove event listeners from drawing.canvas
    // remember that we bound "this" to be the drawing object for our canvas actions
    //     so here we use drawing.canvas_<event> rather than 
    //     this.canvas_<event> (which wouldn't have made sense in this context, anyway)
    drawing.canvas.removeEventListener("mousedown", drawing.canvas_mousedown);
    drawing.canvas.removeEventListener("mouseup", drawing.canvas_mouseup);
    drawing.canvas.removeEventListener("mousemove", drawing.canvas_mousemove);

    // append the canvas we're saving to the appropriate object in document
    document.getElementById("past_drawings").append(document.getElementsByTagName('canvas')[0]);

    // now create a new canvas element
    let newCanvas = document.createElement('canvas');
    newCanvas.style.border = "thin solid black";

    // and create a new Drawing object using the new canvas element
    let colors = ['red', 'green', 'blue', 'yellow', 'orange', 'purple'];
    let randIndex = Math.floor(Math.random() * colors.length); // randomly select color from list
    drawing = new Drawing(newCanvas, 600, 450, colors[randIndex]);
    drawing.start();

    // finally, append the newCanvas to the appropriate DOM element
    document.getElementById('drawing_area').appendChild(newCanvas);
}

function Drawing(canvas, width, height, color) {
    this.canvas = canvas;
    this.canvas.width = width;
    this.canvas.height = height;
  
    this.context = canvas.getContext('2d');
    this.context.strokeStyle = color;
    this.context.lineWidth = 1;

    this.x = 0;
    this.y = 0;
  }

Drawing.prototype.draw = function(newX, newY) {
    this.context.beginPath();
    this.context.moveTo(this.x, this.y);
    this.context.lineTo(newX, newY);
    this.context.stroke();
    this.context.closePath();
}
  
Drawing.prototype.canvas_mousemove = function(e) {
    this.draw(e.offsetX, e.offsetY);
    this.x = e.offsetX;
    this.y = e.offsetY;
}

Drawing.prototype.canvas_mousedown = function(e) {
    this.x = e.offsetX;
    this.y = e.offsetY;

    // when we mousedown, we want to add an event listener for mousemove
    //     in case this is the beginning of a new line in our drawing
    this.canvas_mousemove = this.canvas_mousemove.bind(this);
    this.canvas.addEventListener("mousemove", this.canvas_mousemove);
}

Drawing.prototype.canvas_mouseup = function(e) {
    // when we mouseup, either the line has been finished or was never started;
    //     in any case, we remove the event listener we previously attached to mousedown
    //     so that moving the mouse won't draw
    this.canvas.removeEventListener("mousemove", this.canvas_mousemove);
    this.draw(e.offsetX, e.offsetY);
    this.x = 0;
    this.y = 0;
}

Drawing.prototype.start = function() {
    // bind effectively creates a new function which, when called, uses the definition of 'this'
    //     which was passed into bind
    this.canvas_mousedown = this.canvas_mousedown.bind(this);
    this.canvas_mouseup = this.canvas_mouseup.bind(this);

    // so now when those functions are called by the event listeners, the appropriate definition of
    //     this will be used
    this.canvas.addEventListener("mousedown", this.canvas_mousedown);
    this.canvas.addEventListener("mouseup", this.canvas_mouseup);
};

let colors = ['red', 'green', 'blue', 'yellow', 'orange', 'purple'];
let randIndex = Math.floor(Math.random() * colors.length);
let drawing = new Drawing(document.getElementsByTagName('canvas')[0], 600, 450, colors[randIndex]);
  
window.onload = function() {
    document.getElementsByTagName('canvas')[0].style.border = "thin solid black";
    drawing.start();
};