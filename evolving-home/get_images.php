#!/usr/local/bin/php
<?php 
header('Content-Type: text/plain; charset=utf-8'); 
$saved_dir = __DIR__ . "/saved";
$files = array_diff(scandir($saved_dir), array('..', '.'));
$files_string = implode(",", $files);
echo "$files_string"; 
?>