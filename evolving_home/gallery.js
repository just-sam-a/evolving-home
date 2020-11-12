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

function sparsify(imgdata) {
    // mild compression of our image by removing zero pixels
    // compression would be even better stored as a flat array instead of object
    let local = {}

    let imgarr = imgdata.data;
    for(let i = 0; i < imgarr.length; i+=4) {
        // the data array is a flat array of RGBA values
        // so if any of the current four we're examining aren't 0, that means there's data there
        if(imgarr[i] != 0 || imgarr[i+1] != 0 || imgarr[i+2] != 0 || imgarr[i+3] != 0) {
            local[i] = [imgarr[i], imgarr[i+1], imgarr[i+2], imgarr[i+3]];
        }
    }
    local.len = imgarr.length;
    return local;
}

function desparsify(imgobj) {
    let local = [];
    let zeros = [0, 0, 0, 0];

    let len = imgobj.len;
    delete imgobj.len;

    // If we've got an element in our image object at this point,
    //    we'll push that element in, otherwise we'll push the zeros.
    for(let i = 0; i < len; i+=4) {
        if(i.toString() in imgobj) {
            local.push(...imgobj[i]);
        } else {
            local.push(...zeros);
        }
    }

    return local;
}

function saveCanvas() {
    // We're saving, to a global variable, our most recent image's data
    let imgData=drawing.context.getImageData(0, 0, drawing.canvas.width, drawing.canvas.height);
    globalImgData = imgData.data;

    // Compress the image, and convert to a string
    let compressed = sparsify(imgData);
    compressed = JSON.stringify(compressed);

    // If the compression is actually smaller, we'll use it, otherwise we'll use the original
    if(compressed.length < imgData.data.toString().length) {
        document.getElementById('toPHP_text').value = compressed;
    } else {
        document.getElementById('toPHP_text').value = imgData.data.toString();
    }
    
    // Finally, submit the form so that PHP can save the image.
    document.getElementById('toPHP_submit').click();
}

function newCanvas() {
    // remove event listeners from drawing.canvas
    // remember that we bound "this" to be the drawing object for our canvas actions
    //     so here we use drawing.canvas_<event> rather than 
    //     this.canvas_<event> (which wouldn't have made sense in this context, anyway)
    drawing.canvas.removeEventListener("mousedown", drawing.canvas_mousedown);
    drawing.canvas.removeEventListener("mouseup", drawing.canvas_mouseup);
    drawing.canvas.removeEventListener("mousemove", drawing.canvas_mousemove);

    saveCanvas();
    
    // append the canvas we've saved to the appropriate object in document
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
    // Let's load our most recent image from the global variable we created
    let savedData = globalImgData;
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

function loadFrom(img) {
    // Let's update our global which stores the most recent image
    globalImgData = img;
    let savedData = globalImgData;

    // Then create a new canvas element and associated variables
    let newCanvas = document.createElement('canvas');
    newCanvas.height = 450;
    newCanvas.width = 600;

    let context = newCanvas.getContext('2d');
    newCanvas.style.border = "thin solid black";
    
    let imgData = context.getImageData(0, 0, newCanvas.width, newCanvas.height);

    // and overwrite its data with the most recent image
    let data = imgData.data;
    for(let i = 0; i < data.length; i++){
        data[i] = savedData[i];
    }

    // Finally, let's append that canvas we created to our document.
    context.putImageData(imgData, 0, 0);
    document.getElementById("past_drawings").append(newCanvas);
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

    /*
    // Old code for loading a single image directly into the active canvas
    let element = document.getElementById('communication');
    let savedData = desparsify(JSON.parse(element.textContent));

    let imgData = drawing.context.getImageData(0, 0, drawing.canvas.width, drawing.canvas.height);

    let data = imgData.data;
    for(let i = 0; i < data.length; i++){
        data[i] = savedData[i];
    }

    drawing.context.putImageData(imgData, 0, 0);  
    */

    // We're going to split the text containing potentially multiple images by }
    let communication = document.getElementById('communication');
    let elements = communication.textContent.split('}');

    // Then loop through the result of the split 
    for(let i = 0; i < elements.length; ++i) {
        try {
            loadFrom(desparsify(JSON.parse(elements[i] + '}')));
        } catch(error) {
            console.log(error);
        }
    }
};