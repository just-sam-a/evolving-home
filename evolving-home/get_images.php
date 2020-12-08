#!/usr/local/bin/php
<?php 
    header('Content-Type: text/plain; charset=utf-8'); 
    if($_SERVER['REQUEST_METHOD'] === 'GET') {
        if(isset($_GET['submissions'])) {
            $saved_dir = __DIR__ . "/saved";
            $files = array_diff(scandir($saved_dir), array('..', '.'));
            $files_string = implode(",", $files);
            echo "$files_string"; 
        } else if (isset($_GET['drawings'])) {
            // We expect the images folder to contain only folders of images
            $img_folders = array_diff(scandir(__DIR__ . "/images"), array('..', '.'));
            foreach($img_folders as $folder) {
                $folder_dir = __DIR__ . "/images/" . $folder;
                $folder_files = array_diff(scandir($folder_dir), array('..', '.'));
                $folder_string = implode(',', $folder_files);
                echo "$folder_string" . "\n";
            }
        } else if (isset($_GET['captions'])) {
            try {
                $drawingsdb = new SQLite3('drawings.db');

                $statement = "CREATE TABLE IF NOT EXISTS drawings (filename TEXT, caption TEXT, artist TEXT);";
                $run = $drawingsdb->query($statement);

                $captions_path = __DIR__ . "/captions.txt";
                $captions_content = file_get_contents($captions_path);
                $captions_arr = explode('-', $captions_content);

                foreach($captions_arr as $caption) {
                    $current_line = explode(',', $caption);

                    $filename = $current_line[0];
                    $caption_text = $current_line[1];
                    $artist = $current_line[2];

                    $statement = "INSERT INTO drawings (filename, caption, artist) VALUES ('$filename', '$caption_text', '$artist');";
                    $run = $drawingsdb->query($statement);
                }

                echo "Success!";
            } catch (Exception $ex) {
                echo $ex->getMessage();
            }
        }
    }
?>