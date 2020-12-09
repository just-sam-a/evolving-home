#!/usr/local/bin/php
<?php 
    header('Content-Type: text/plain; charset=utf-8'); 
    if(isset($_FILES['image'])) {
        $queue_dir = __DIR__ . "/queue";
        $new_filename = $queue_dir . "/" . strval(time()) . ".png";
    
        $success = move_uploaded_file($_FILES['image']['tmp_name'], $new_filename);

        if ($success) { 
            echo "File was uploaded sucessfully.";
        } else {
            echo "File upload failed.";
        }
    } else if($_SERVER['REQUEST_METHOD'] === 'GET') {
        if(isset($_GET['submissions'])) {
            $saved_dir = __DIR__ . "/saved";
            $files = array_diff(scandir($saved_dir), array('..', '.'));
            $files_string = implode(",", $files);
            echo "$files_string"; 
        } else if (isset($_GET['drawings'])) {
            // We expect the images folder to contain only folders of images & captions.txt
            $img_folders = array_diff(scandir(__DIR__ . "/images"), array('..', '.', 'captions.txt'));
            foreach($img_folders as $folder) {
                $folder_dir = __DIR__ . "/images/" . $folder;
                $folder_files = array_diff(scandir($folder_dir), array('..', '.'));
                $folder_string = implode(',', $folder_files);
                echo "$folder_string" . "\n";
            }
        } else if (isset($_GET['captions'])) {
            try {
                $drawingsdb = new SQLite3('drawings.db');

                $statement = "CREATE TABLE IF NOT EXISTS drawings (filename TEXT UNIQUE, caption TEXT, artist TEXT);";
                $run = $drawingsdb->query($statement);

                $captions_path = __DIR__ . "/images/captions.txt";
                $captions_content = file_get_contents($captions_path);
                $captions_arr = preg_split('/\r\n|\r|\n/', $captions_content);

                foreach($captions_arr as $caption) {
                    $current_line = explode(',', $caption);

                    $filename = $current_line[0];
                    $caption_text = SQLite3::escapeString($current_line[1]);
                    $artist = $current_line[2];
                    
                    $statement = "INSERT OR IGNORE INTO drawings (filename, caption, artist) VALUES ('$filename', '$caption_text', '$artist');";
                    $run = $drawingsdb->query($statement);
                }
            } catch (Exception $ex) {
                echo $ex->getMessage();
            }
        } else if (isset($_GET['caption'])) {
            $filename = $_GET['caption'];
            try {
                $drawingsdb = new SQLite3('drawings.db');
                $statement = "SELECT caption FROM drawings WHERE filename='$filename'";
                $run = $drawingsdb->query($statement);

                if($run) {
                    $row = $run->fetchArray();
                    echo $row['caption'];
                }
            } catch (Exception $ex) {
                echo $ex->getMessage();
            }
        }
    }
?>