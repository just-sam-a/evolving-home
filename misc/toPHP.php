#!/usr/local/bin/php
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Sam's Discussion</title>
    </head>

    <body>
        <header>
            <h1>PIC 40A Discussion</h1>
        </header>

        <main>
            <span>Hi! Welcome to this page!</span>
            <?php echo '<p>Hello world!</p>'; ?>

            <form method="post" action="<?php echo $_SERVER['PHP_SELF']; ?>" style="display: none;">
                <input type="text" name="greeting" id="toPHP_text">
                <input type="submit" id="toPHP_submit">
            </form>

            <?php
                if(isset($_POST['greeting'])) {
                    $greeting = $_POST['greeting'];
                    echo "$greeting";
                }
            ?>
        </main>
    </body>
</html>

<script>
    let tf = <?php if($_SERVER['REQUEST_METHOD'] == 'POST') { echo "false"; } else { echo "true"; } ?>;
    if(tf) {
        document.getElementById('toPHP_text').value = "Hello!";
        document.getElementById('toPHP_submit').click();
    }
</script>
