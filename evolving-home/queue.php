#!/usr/local/bin/php
<?php
    session_save_path(__DIR__ . "/sessions");
    session_name('queue_login');
    session_start();
?>
<!DOCTYPE html>
<?php
    if(!isset($_SESSION['loggedin']) or !$_SESSION['loggedin']) { ?>
        <head>
            <meta charset="UTF-8">
            <title>Submission Queue</title>
            <script>
                setTimeout(function(){
                    window.location.href = '/~samamin/queue_login.php';
                }, 2000);
            </script>
        </head>
        <body>
            <header>
                <h1>Submission Queue</h1>
            </header>
            <main>
                <p>You're not logged in. <a href="queue_login.php">Please go back and try again.</a></p>
            </main>
        </body>
    <?php 
        exit;
    }
?>
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

            function loadFrom(img, filename, admin) {
                let newDiv = document.createElement('div');
                let newCheckbox = document.createElement('input');
                newCheckbox.type = "checkbox";
                newCheckbox.name = "filearr[]"
                newCheckbox.value = filename;

                let newCanvas = document.createElement('canvas');
                newCanvas.height = 450;
                newCanvas.width = 600;

                let context = newCanvas.getContext('2d');
                newCanvas.style.border = "thin solid black";
                
                let imgData = context.getImageData(0, 0, newCanvas.width, newCanvas.height);

                // and overwrite its data with the most recent image
                let data = imgData.data;
                for(let i = 0; i < data.length; i++){
                    data[i] = img[i];
                }

                // Finally, let's append that canvas we created to our document.
                context.putImageData(imgData, 0, 0);

                newDiv.append(newCanvas);
                if (admin) {
                    newDiv.append(newCheckbox);
                }

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
                <input type="submit" id="submit">
            </form>
            <?php
                $is_admin = $_SESSION['username'] === 'admin';

                if(isset($_POST['filearr'])){
                    $file_array = $_POST['filearr'];

                    $savedcanvases = fopen('saved_canvases.txt', 'a');

                    foreach($file_array as $filename) {
                        $file_directory = __DIR__ . "/queue/" . $filename;
                        $curr_canvas = file_get_contents($file_directory);
                        fwrite($savedcanvases, $curr_canvas);
                    }
                }

                $queue_dir = __DIR__ . "/queue";
                $files = array_diff(scandir($queue_dir), array('..', '.'));
                $currnum = count($files);

                foreach($files as $filename) {
                    $curr_file = $queue_dir . '/' . $filename;
                    $canvas = file_get_contents($curr_file);
                    ?> <script>
                        new_canvas = <?php echo "$canvas"; ?>;
                        loadFrom(desparsify(new_canvas), <?php echo '"' . "$filename" . '"'; ?>, <?php echo "$is_admin" ?>);
                    </script> <?php
                    unset($curr_file);
                    unset($canvas);
                }
            ?>
        </main>
    </body>
    <?php if($_SESSION['username'] !== 'admin') { ?>
        <script>
            document.getElementById('submit').style = "display: none;";
        </script>
    <?php } ?>
</html>