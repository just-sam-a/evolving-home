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
            <link rel="stylesheet" href="style.css">

            <script>
                setTimeout(function() {
                    window.location.href = '/~samamin/queue_login.php';
                }, 2000)
            </script>
        </head>
        <body>
            <header>
                <h1>Submission Queue</h1>
            </header>
            <main>
                <hr>
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
        <link rel="stylesheet" href="style.css">
        <script>
            let new_canvas;

            function loadFrom(filename, artist, admin) {
                let newDiv = document.createElement('div');
                newDiv.className = "queue_element";
                
                let newCheckbox = document.createElement('input');
                newCheckbox.type = "checkbox";
                newCheckbox.name = "filearr[]"
                newCheckbox.value = filename;

                let newSpan = document.createElement('span');
                newSpan.style="display: block;margin-bottom: .5%;"
                newSpan.innerHTML = artist;

                let newImage = new Image();
                newImage.src = "queue/" + filename;

                newImage.className = "queue_item";
                newCheckbox.className = "queue_item";

                newDiv.append(newSpan);
                newDiv.append(newImage);
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
            <hr>
            <br><br>
            <form method="post" action="<?php echo $_SERVER['PHP_SELF']; ?>">
                <div id="queue" class="image_container"></div>
                <input type="submit" name="submit" id="submit" value="Add selected to gallery">
                <input type="submit" name="clear" id="clear" value="Clear selected from queue">
            </form>
            <input type="button" value="Go to Gallery" onclick="document.location.href='gallery.html';">
            <?php
                $is_admin = $_SESSION['username'] === 'admin';
                $drawingsdb;
                try {
                    $drawingsdb = new SQLite3('drawings.db');
                } catch (Exception $ex) {
                    echo $ex->getMessage();
                }

                if(isset($_POST['filearr'])){
                    $file_array = $_POST['filearr'];
                    if(isset($_POST['submit'])) {
                        foreach($file_array as $filename) {
                            $file_directory = __DIR__ . "/queue/" . $filename;
                            $new_file_directory = __DIR__ . "/saved/" . $filename;

                            try {
                                //$drawingsdb = new SQLite3('drawings.db');
                                $statement = "SELECT artist FROM queue WHERE filename='$filename'";
                                $run = $drawingsdb->query($statement);
                
                                if($run) {
                                    $row = $run->fetchArray();
                                    $artist = $row['artist'];
                                    $statement = "INSERT OR IGNORE INTO drawings (filename, artist) VALUES ('$filename', '$artist');";
                                    $run = $drawingsdb->exec($statement);

                                    $statement = "DELETE FROM queue WHERE filename='$filename';";
                                    $run = $drawingsdb->exec($statement);
                                }
                            } catch (Exception $ex) {
                                echo $ex->getMessage();
                            }

                            rename($file_directory, $new_file_directory);
                        }
                    } else if (isset($_POST['clear'])) {
                        foreach($file_array as $filename) {
                            $file_directory = __DIR__ . "/queue/" . $filename;
                            unlink($file_directory);

                            try {
                                //$drawingsdb = new SQLite3('drawings.db');
                                $$statement = "DELETE FROM queue WHERE filename='$filename';";
                                $run = $drawingsdb->query($statement);
                            } catch (Exception $ex) {
                                echo $ex->getMessage();
                            }
                        }
                    }
                }

                $queue_dir = __DIR__ . "/queue";
                $files = array_diff(scandir($queue_dir), array('..', '.'));

                foreach($files as $filename) {
                    $curr_file = $queue_dir . '/' . $filename;
                    $artist = "";
                    try {
                        $statement = "SELECT artist FROM queue WHERE filename='$filename'";
                        $run = $drawingsdb->query($statement);
        
                        if($run) {
                            $row = $run->fetchArray();
                            $artist = $row['artist'];
                        }
                    } catch (Exception $ex) {
                        echo $ex->getMessage();
                    }
                    ?> <script>
                        loadFrom(<?php echo '"' . "$filename" . '"'; ?>, <?php echo '"' . "$artist" . '"' ?>, <?php echo "$is_admin" ?>);
                    </script> <?php
                } 
            ?>
        </main>
    </body>
    <?php if($_SESSION['username'] !== 'admin') { ?>
        <script>
            document.getElementById('submit').style.display = "none";
            document.getElementById('clear').style.display = "none";
        </script>
    <?php } ?>
</html>