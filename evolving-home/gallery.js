const fileNames = [];
const folderNames = ['images/0_drawings/', 'images/1_bluecoats/'];
const colors = [[255, 0, 0], [0, 255, 0], [0, 0, 255], [255, 255, 0], [255, 170, 29], [97, 0, 161]];
let lastImage = "";
let shown = false;
let drawing;

function changePhoto(path) {
    let frame = document.getElementById('photo_frame');
    let overlay = document.getElementById('photo_img');

    if(path) {
        overlay.src = path;
        document.getElementById('image_overlay').style.display = "block";
        return;
    }

    // get a random index value for picking an item from our fileNames array
    let randIndex = Math.floor(Math.random() * fileNames.length);
    frame.src = fileNames[randIndex];
}

function showCaption(caption) {
    document.getElementById('photo_caption').innerHTML = "Image Caption: " + caption;
}

function navigation() {
    if(shown === false) {
        shown = true;
        document.getElementsByTagName('nav')[0].style.display = "block";
        document.getElementById('nav_button').style.left = String(document.getElementsByTagName('nav')[0].offsetWidth + 15) + 'px';
        document.getElementById('nav_button').value = "<";
    } else {
        shown = false;
        document.getElementsByTagName('nav')[0].style.display = "none";
        document.getElementById('nav_button').style.left = "10px";
        document.getElementById('nav_button').value = ">";
    }
}

function hide() {
    document.getElementById('image_overlay').style.display = "none";
}

function clearCanvas() {
    drawing.context.clearRect(0, 0, drawing.canvas.width, drawing.canvas.height);
}

function saveCanvas() {
    // We're saving, to a global variable, our most recent image's data
    let imgData=drawing.context.getImageData(0, 0, drawing.canvas.width, drawing.canvas.height);
    lastImage = imgData.data;

    drawing.canvas.toBlob(function (blob) {
        let image = new File([blob], "tmp.png", {
            type: "image/png",
        });
        
        const request = new XMLHttpRequest();

        let formdata = new FormData();
        formdata.append('image', image);

        request.open('POST', 'process_images.php');
        request.onload = function() {
            if (this.status === 200) {
                console.log(this.responseText.trim());
            }
        };

        request.send(formdata);
     });
}

function downloadCanvas() {
    let imageURL = drawing.canvas.toDataURL('image/png');

    let request = new XMLHttpRequest();
    request.responseType = 'blob';
    request.onload = function () {
        let a = document.createElement('a');
        a.href = window.URL.createObjectURL(request.response);
        a.download = 'canvas.png';
        a.style.display = 'none';
        document.body.appendChild(a);
        a.click();
        a.remove();
    };
    request.open('GET', imageURL);
    request.send();
}

function newCanvas() {
    // remove event listeners from drawing.canvas
    // remember that we bound "this" to be the drawing object for our canvas actions
    //     so here we use drawing.canvas_<event> rather than 
    //     this.canvas_<event> (which wouldn't have made sense in this context, anyway)
    drawing.canvas.removeEventListener("mousedown", drawing.canvas_mousedown);
    drawing.canvas.removeEventListener("mouseup", drawing.canvas_mouseup);
    drawing.canvas.removeEventListener("mousemove", drawing.canvas_mousemove);

    drawing.canvas.removeEventListener("touchstart", drawing.canvas_mousedown);
    drawing.canvas.removeEventListener("touchend", drawing.canvas_mouseup);
    drawing.canvas.removeEventListener("touchmove", drawing.canvas_mousemove);

    saveCanvas();
    alert("Canvas successfully submitted to queue.");
    
    // append the canvas we've saved to the appropriate object in document
    if (document.getElementById("submitted_drawings").style.display === "none") {
        document.getElementById("submitted_drawings").style.display = "block";
    }
    document.getElementById("submitted_drawings").append(document.getElementsByTagName('canvas')[0]);

    // now create a new canvas element
    let newCanvas = document.createElement('canvas');

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

function loadRecentImage() {
    if (lastImage !== "") {
        // Let's load our most recent image from the global variable we created
        let savedData = lastImage;
        let imgData = drawing.context.getImageData(0, 0, drawing.canvas.width, drawing.canvas.height);

        let data = imgData.data;
        for(let i = 0; i < data.length; i++){
            data[i] = savedData[i];
        }

        // and stick that image data into our canvas, 
        drawing.context.putImageData(imgData, 0, 0);  
    } else {
        let images = document.getElementsByTagName('img');
        let image = images[images.length - 1];

        drawing.context.drawImage(image, 0, 0);
    }
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
    e.preventDefault();

    if (e.touches.length === 0) {
        this.draw(e.offsetX, e.offsetY);
        this.x = e.offsetX;
        this.y = e.offsetY;
    } else {
        let x = (e.touches[0].pageX - this.canvas.offsetLeft) * (this.canvas.width / this.canvas.clientWidth);
        let y = (e.touches[0].pageY - this.canvas.offsetTop) * (this.canvas.height / this.canvas.clientHeight);
        this.draw(x, y);

        this.x = x;
        this.y = y;
    }
}

Drawing.prototype.canvas_mousedown = function(e) {
    e.preventDefault();

    if (e.touches.length === 0) {
        this.x = e.offsetX;
        this.y = e.offsetY;
    } else {
        this.x = (e.touches[0].pageX - this.canvas.offsetLeft) * (this.canvas.width / this.canvas.clientWidth);
        this.y = (e.touches[0].pageY - this.canvas.offsetTop) * (this.canvas.height / this.canvas.clientHeight);
    }

    // when we mousedown, we want to add an event listener for mousemove
    //     in case this is the beginning of a new line in our drawing
    this.canvas_mousemove = this.canvas_mousemove.bind(this);
    this.canvas.addEventListener("mousemove", this.canvas_mousemove);
    this.canvas.addEventListener("touchmove", this.canvas_mousemove, false);
}

Drawing.prototype.canvas_mouseup = function(e) {
    // when we mouseup, either the line has been finished or was never started;
    //     in any case, we remove the event listener we previously attached to mousedown
    //     so that moving the mouse won't draw
    this.canvas.removeEventListener("mousemove", this.canvas_mousemove);
    this.canvas.removeEventListener("touchmove", this.canvas_mousemove);
    if (e !== false && e.touches.length === 0) {
        this.draw(e.offsetX, e.offsetY);
        this.x = 0;
        this.y = 0;
    } else if (e.targetTouches.length !== 0) {
        let x = (e.touches[0].pageX - this.canvas.offsetLeft) * (this.canvas.width / this.canvas.clientWidth);
        let y = (e.touches[0].pageY - this.canvas.offsetTop) * (this.canvas.height / this.canvas.clientHeight);
        this.draw(x, y);

        this.x = 0;
        this.y = 0;
    }
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

    this.canvas.addEventListener("touchstart", this.canvas_mousedown, false);
    this.canvas.addEventListener("touchend", this.canvas_mouseup, false);
};
  
window.onload = function() {
    // Let's pick a color, set our sliders to it, and create our Drawing object
    let randIndex = Math.floor(Math.random() * colors.length);
    document.getElementById('red').value = colors[randIndex][0];
    document.getElementById('green').value = colors[randIndex][1];
    document.getElementById('blue').value = colors[randIndex][2];
    drawing = new Drawing(document.getElementsByTagName('canvas')[0], 600, 450, colors[randIndex]);
    drawing.start();

    window.addEventListener('mouseup', function(e){
        drawing.canvas_mouseup(false);
    });

    window.addEventListener('touchend', function(e) {
        drawing.canvas_mouseup(false);
    });

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

    // Request to load all submitted drawings
    const submissions_request = new XMLHttpRequest();
    submissions_request.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            let documents = this.responseText.trim();
            documents = documents.split(',');

            let numRows = Math.ceil(documents.length / 3.0);
            for(let i = 0; i < numRows; ++i) {
                let newRow = document.createElement('div');
                newRow.className = "image_row";
                document.getElementById('past_drawings').append(newRow);
            }

            let index = 0, row = 0;
            documents.forEach(name => {
                let newImage = new Image();
                newImage.src = "saved/" + name;
                newImage.className = "gallery_image";
                newImage.addEventListener('click', function(){changePhoto(this.src);});

                if (index % 3 === 0 && index > 0) {
                    ++row;
                }
                document.getElementById('past_drawings').getElementsByClassName('image_row')[row].append(newImage);
                ++index;
            });
        }
    };

    submissions_request.open('GET', 'get_images.php?submissions=1');
    submissions_request.send();

    // Request to load all my drawings
    const drawings_request = new XMLHttpRequest();
    drawings_request.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            let lines = this.responseText.trim();
            lines = lines.split('\n');
            let element = 0; // element tracks which image_container we're adding to
            lines.forEach(line => {
                let files = line.split(',');
                let numRows = Math.ceil(files.length / 3.0);
                for(let i = 0; i < numRows; ++i) {
                    let newRow = document.createElement('div');
                    newRow.className = "image_row";
                    document.getElementsByClassName('image_container')[element].append(newRow);
                }
                let index = 0, row = 0; // row tracks which row within an image_container, index which image
                files.forEach(name => {
                    let newImage = new Image();
                    newImage.className = "gallery_image";
                    newImage.src = folderNames[element] + name;
                    newImage.addEventListener('click', function(){changePhoto(this.src);});
                    //newImage.addEventListener('click', function(){showCaption(this.alt);});
                    
                    fileNames.push(newImage.src);
                    
                    if (index % 3 === 0 && index > 0) {
                        ++row;
                    }
                    document.getElementsByClassName('image_container')[element].getElementsByClassName('image_row')[row].append(newImage);
                    ++index;
                })
                ++element;
            });
        }
    };

    drawings_request.open('GET', 'get_images.php?drawings=1');
    drawings_request.send();
};