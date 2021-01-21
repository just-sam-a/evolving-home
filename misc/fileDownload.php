#!/usr/local/bin/php
<?php
    if(isset($_POST['user_input'])) {
        $file = "your_text.txt";
        $text_file = fopen($file, "w");
        fwrite($text_file, $_POST['user_input']);
        fclose($text_file);

        header('Content-Disposition: attachment; filename="your_text.txt"');
        readfile($file);
        exit;
    }
?>
<!DOCTYPE html>

<html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Submission Queue</title>
        
    </head>

    <body>
        <header>
            <h1>Text Demo</h1>
        </header>
    
        <main>
            <p>Type some text, and we'll download it for you</p>
            <form method="post" action="<?php echo $_SERVER['PHP_SELF']; ?>">
                <input type="text" name="user_input">
                <input type="submit">
            </form>
        </main>
    </body>
</html>