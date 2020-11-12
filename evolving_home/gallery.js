const fileNames = ['bluecoats/bluecoats1.PNG', 'bluecoats/bluecoats2.PNG', 'bluecoats/bluecoats3.PNG', 'bluecoats/bluecoats4.PNG', 'bluecoats/bluecoats5.PNG', 'bluecoats/bluecoats6.PNG',
    'drawings/drawing1.png', 'drawings/drawing2.jpeg', 'drawings/drawing3.jpg', 'drawings/drawing4.jpeg', 'drawings/drawing5.jpeg', 'drawings/drawing6.JPG', 'drawings/drawing7.jpeg', 'drawings/drawing8.jpg', 'drawings/drawing9.jpeg'];
const colors = [[255, 0, 0], [0, 255, 0], [0, 0, 255], [255, 255, 0], [255, 170, 29], [97, 0, 161]];
let globalImgData = "";

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

    // We're saving, to a global variable, our most recent image's data
    let imgData=drawing.context.getImageData(0, 0, drawing.canvas.width, drawing.canvas.height);
    console.log(imgData.data);
    globalImgData = JSON.stringify(imgData.data);
    document.getElementById('toPHP_text').value = imgData.data.toString();
    document.getElementById('toPHP_submit').click();

    /*
    // This was a both noble and silly idea for saving and loading images inside of cookies
    // I'm leaving the code here in case it's relevant, later
    
    let loopCount = toJSON.length / 1000;
    for(let i = 0; i < loopCount; ++i) {
        document.cookie = "image" + i + "=" + toJSON.slice(0, 1000);
        toJSON = toJSON.slice(1000)
    } 
    */
    
    // append the canvas we're saving to the appropriate object in document
    document.getElementById("past_drawings").append(document.getElementsByTagName('canvas')[0]);

    // now create a new canvas element
    let newCanvas = document.createElement('canvas');
    newCanvas.style.border = "thin solid black";

    // and create a new Drawing object using the new canvas element
    let randIndex = Math.floor(Math.random() * colors.length); // randomly select color from list
    document.getElementById('red').value = colors[randIndex][0]; // let's update our sliders to correspond
    document.getElementById('green').value = colors[randIndex][1];
    document.getElementById('blue').value = colors[randIndex][2];
    drawing = new Drawing(newCanvas, 600, 450, colors[randIndex]);
    drawing.start();

    // finally, append the newCanvas to the appropriate DOM element
    document.getElementById('drawing_area').appendChild(newCanvas);
}

function loadImage() {
    /*
    // This was a both noble and silly idea for saving and loading images inside of cookies
    // I'm leaving the code here in case it's relevant, later

    let cookieValues = document.cookie.split('; ');
    cookieValues.sort();
    let imageCookie = "";
    for(let i = 0; i < cookieValues.length; i++) {
        let localCookie = cookieValues[i].split("=");
        console.log(localCookie[0]);
        if (localCookie[0].startsWith("image")) {
            console.log(localCookie[1]);
            imageCookie += localCookie[1];
        }
    } 
    */

    // Let's load our most recent image from the global variable we created
    let savedData = JSON.parse(globalImgData);
    let imgData = drawing.context.getImageData(0, 0, drawing.canvas.width, drawing.canvas.height);

    let data = imgData.data;
    for(let i = 0; i < data.length; i++){
        data[i] = savedData[i];
    }

    //     and stick that image data into our canvas, 
    //     while removing the corresponding canvas from our "past_drawings" element
    drawing.context.putImageData(imgData, 0, 0);  
    let canvases = document.getElementById("past_drawings");
    canvases.removeChild(canvases.lastChild);
}

// oninput will be called continuously as the slider is being updated
// onchange will be called once the user releases the slider
function updateColors() {
    let r = document.getElementById('red').value;
    let g = document.getElementById('green').value;
    let b = document.getElementById('blue').value;

    drawing.set_color(r, g, b);

    // every time our colors are updated, let's update (or create) cookies to store the colors
    document.cookie = "red=" + r;
    document.cookie = "green=" + g;
    document.cookie = "blue=" + b;
}

//---------------------------------------------------------

function Drawing(canvas, width, height, color) {
    this.canvas = canvas;
    this.canvas.width = width;
    this.canvas.height = height;
  
    this.context = canvas.getContext('2d');
    this.context.strokeStyle = 'rgb(' + color[0] + ',' + color[1] + ',' + color[2] + ')';
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

Drawing.prototype.set_color = function(r, g, b) { 
    // since set_color is only ever being directly
    //     called on a Drawing object, we don't need to bind "this" for it
    this.context.strokeStyle = "rgb(" + r + "," + g + "," + b + ")";
}

// The reason I've switched, here, from using anonymous functions to named functions 
//     for our event listeners is so that they can later be removed. 
// In order to remove an event listener, you have to have used a named function
//     which is in scope at the time of removal.
// As a result of this, we've changed the way we handle 'this', as it is not possible
//     to specify arguments to the function you pass in to an event listener 
//     without using an anonymous function.
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

// Let's pick a color, set our sliders to it, and create our Drawing object
let randIndex = Math.floor(Math.random() * colors.length);
document.getElementById('red').value = colors[randIndex][0];
document.getElementById('green').value = colors[randIndex][1];
document.getElementById('blue').value = colors[randIndex][2];
let drawing = new Drawing(document.getElementsByTagName('canvas')[0], 600, 450, colors[randIndex]);
  
window.onload = function() {
    document.getElementsByTagName('canvas')[0].style.border = "thin solid black";
    drawing.start();

    // on window load, let's check to see if cookies for the image color have been set
    let cookieValues = document.cookie.split('; ');
    let r, g, b;
    for(let i = 0; i < cookieValues.length; i++) {
        let localCookie = cookieValues[i].split("=");
        if(localCookie[0] === "red") {
            r = localCookie[1];
        } else if(localCookie[0] === "blue") {
            b = localCookie[1];
        } else if(localCookie[0] === "green") {
            g = localCookie[1];
        }
    }

    // if so, let's use the value of those cookies to set our Drawing color
    //     and color sliders; otherwise, we'll keep the random color from earlier
    if(r !== undefined && g !== undefined && b !== undefined) {
        drawing.set_color(r, g, b);
        document.getElementById('red').value = Number(r);
        document.getElementById('blue').value = Number(b);
        document.getElementById('green').value = Number(g);
    }

    let element = document.getElementById('communication');
    let data = element.textContent;
};