#!/usr/local/bin/php
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Sam's Gallery</title>

        <script src="gallery.js?v=7" defer></script>
    </head>

    <body>
        <header>
            <h1>Sam's Drawing Page</h1>
        </header>
        <hr>
        <h2>Navigation</h2>
        <ul>
            <li><a href="#some_drawings">Recent Drawings</a></li>
            <li><a href="#bluecoats">Bluecoats Illustrations</a></li>
            <li><a href="#your_turn">Your Turn!</a></li>
        </ul>
        <hr>

        <main>
            <h2>Featured Image</h2>
            <span>Click for a random image, or select one from below.</span><br>
            <img src="images/drawings/drawing2.jpeg" id="photo_frame" onclick="changePhoto()" width="600">
            <br><span id="photo_caption"></span><br>
            
            <h2 id="some_drawings">Recent Drawings</h2>
            <table>
                <tbody>
                    <tr>
                        <td><img src="images/drawings/drawing2.jpeg" alt="Sam's hair goals" width="200"></td>
                        <td>
                            <img src="images/drawings/drawing1.png" alt="Sam's garbage children" width="200">
                            <br>
                            <figurecaption>Purdy does not love me :(</figurecaption>
                        </td>
                        <td><img src="images/drawings/drawing3.jpg" alt="Sparkly picture" width="200"></td>
                    </tr>

                    <tr>
                        <td><img src="images/drawings/drawing4.jpeg" alt="Sam looking cool" width="200"></td>
                        <td><img src="images/drawings/drawing6.JPG" alt="Portrait of Kevin" width="200"></td>
                        <td><img src="images/drawings/drawing5.jpeg" alt="Church lady" width="200"></td>
                    </tr>

                    <tr>
                        <td><img src="images/drawings/drawing7.jpeg" alt="Trouble sleeping" width="200"></td>
                        <td><img src="images/drawings/drawing9.jpeg" alt="&lt;3 &lt;3 &lt;3 Michael & Lara &lt;3 &lt;3 &lt;3" width="200"></td>
                        <td><img src="images/drawings/drawing8.jpg" alt="Waiting during the pandemic" width="200"></td>
                    </tr>
                </tbody>
            </table>

            <h2 id="bluecoats">Bluecoats 2019 Performance</h2>
            <table>
                <tbody>
                    <tr>
                        <td><img src="images/bluecoats/bluecoats1.PNG" alt="An illustration of a Bluecoats performer, Blackbird" width="200"></td>
                        <td><img src="images/bluecoats/bluecoats2.PNG" alt="An illustration of a Bluecoats performer, Within You Without You" width="200"></td>
                        <td><img src="images/bluecoats/bluecoats3.PNG" alt="An illustration of a Bluecoats performer, Sgt. Pepper" width="200"></td>
                    </tr>

                    <tr>
                        <td><img src="images/bluecoats/bluecoats4.PNG" alt="An illustration of a Bluecoats performer, I Want to Hold Your Hand" width="200"></td>
                        <td><img src="images/bluecoats/bluecoats5.PNG" alt="An illustration of a Bluecoats performer, Eleanore Rigby" width="200"></td>
                        <td><img src="images/bluecoats/bluecoats6.PNG" alt="An illustration of a Bluecoats performer, Come Together" width="200"></td>
                    </tr>
                </tbody>
            </table>
            <hr>
            <h2 id="your_turn">Your Turn!</h2>
            <input type="button" onclick="clearCanvas()" value="Clear Canvas">
            <input type="button" onclick="newCanvas()" value="Submit Canvas">
            <input type="button" onclick="loadImage()" value="Restore Canvas">
            <br>
            <label for="red">Red</label>
            <input type="range" id="red" min="0" max="255" value="0" step="1" oninput="updateColors()">
            <label for="green">Green</label>
            <input type="range" id="green" min="0" max="255" value="0" step="1" oninput="updateColors()">
            <label for="blue">Blue</label>
            <input type="range" id="blue" min="0" max="255" value="0" step="1" oninput="updateColors()">
            
            <br>
            <div id="drawing_area"><canvas></canvas></div>
            <br>
            <div id="past_drawings"></div>

            <form method="post" action="<?php echo $_SERVER['PHP_SELF']; ?>" style="display: none;">
                <input type="text" name="canvas" id="toPHP_text">
                <input type="submit" id="toPHP_submit">
            </form>

            <p style="display: none;" id="communication"> 
                <?php
                    $canvases = file_get_contents('saved_canvases.txt');
                    echo "$canvases";
                ?>
            </p>

            <?php
                if(isset($_POST['canvas'])) {
                    $queue_dir = __DIR__ . "/queue";
                    
                    // this echos "..." -- there are two default files in every directory on a Linux
                    //    system, . and .., pointers to the current and parent directory, respectively
                    // echo implode(scandir($queue_dir));

                    // array_diff returns the difference between supplied arrays -- the elements not common
                    //    between them
                    $files = array_diff(scandir($queue_dir), array('..', '.'));
                    $currnum = count($files);

                    $new_filename = $queue_dir . "/drawing" . $currnum . ".txt";
                    
                    $file = fopen($new_filename, 'w');
                    $local = $_POST['canvas'];
                    fwrite($file, $local);
                    fclose($file);
                }
            ?>
        </main>
    </body>
</html>