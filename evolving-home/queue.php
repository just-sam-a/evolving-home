#!/usr/local/bin/php
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Submission Queue</title>
        <script>
            let new_canvas;

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

            // this version of loadFrom loads a file into a canvas, the file's 
            //    name into a checkbox, and both of those into a new div to be
            //    appended to our queue 
            function loadFrom(img, filename) {
                let newDiv = document.createElement('div');
                let newCheckbox = document.createElement('input');
                newCheckbox.type = "checkbox";
                // store all checkbox results in an array for PHP
                // $_POST['filearr']
                newCheckbox.name = "filearr[]" 
                newCheckbox.value = filename;

                let newCanvas = document.createElement('canvas');
                newCanvas.height = 450;
                newCanvas.width = 600;

                let context = newCanvas.getContext('2d');
                newCanvas.style.border = "thin solid black";
                
                // Load the image into our new canvas
                let imgData = context.getImageData(0, 0, newCanvas.width, newCanvas.height);

                let data = imgData.data;
                for(let i = 0; i < data.length; i++){
                    data[i] = img[i];
                }

                context.putImageData(imgData, 0, 0);

                // We stick them all together & append the div to queue
                newDiv.append(newCanvas);
                newDiv.append(newCheckbox);

                document.getElementById("queue").append(newDiv);
            }
        </script>
    </head>

    <body>
        <header>
            <h1>Submission Queue</h1>
        </header>
    
        <main>
            <form method="post" action="<?php echo $_SERVER['PHP_SELF']; ?>">
                <div id="queue"></div>
                <input type="submit">
            </form>
            <?php
                // If we have an array of approved files
                if(isset($_POST['filearr'])){
                    $file_array = $_POST['filearr'];

                    $savedcanvases = fopen('saved_canvases.txt', 'a');

                    // let's go ahead and append the content of all those files
                    // to 'saved_canvases.txt'
                    foreach($file_array as $filename) {
                        $file_directory = __DIR__ . "/queue/" . $filename;
                        $curr_canvas = file_get_contents($file_directory);
                        fwrite($savedcanvases, $curr_canvas);
                    }
                }

                $queue_dir = __DIR__ . "/queue";
                $files = array_diff(scandir($queue_dir), array('..', '.'));
                $currnum = count($files);

                // load each file awaiting approval into the queue
                foreach($files as $filename) {
                    $curr_file = $queue_dir . '/' . $filename;
                    $canvas = file_get_contents($curr_file);
                    ?> <script>
                        new_canvas = <?php echo "$canvas"; ?>;
                        loadFrom(desparsify(new_canvas), <?php echo '"' . "$filename" . '"'; ?>);
                    </script> <?php
                    unset($curr_file);
                    unset($canvas);
                }
            ?>
        </main>
    </body>
</html>