#!/usr/local/bin/php
<?php 
    header('Content-Type: text/plain; charset=utf-8'); 

    if(isset($_FILES['image'])) {
        $queue_dir = __DIR__ . "/queue";
        $new_filename = $queue_dir . "/" . strval(time()) . ".png";
    
        $success = move_uploaded_file($_FILES['image']['tmp_name'], $new_filename);

        if ($success) { ?>
            File was uploaded sucessfully.
        <?php } else { ?>
            File upload failed.
        <?php }
    }
?>