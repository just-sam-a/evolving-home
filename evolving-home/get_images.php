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
        }
    }
?>