#!/usr/local/bin/php
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Sam's Discussion</title>
        <script src="https://code.jquery.com/jquery-3.5.0.js"></script>
    </head>

    <body>
        <header>
            <h1>PIC 40A Discussion</h1>
        </header>

        <main>
            <?php
                echo '<p>Hello world!</p>';
            ?>
            <input type="button" value="hello" id="namespace">
            <input type="button" value="goodbye" id="remove_namespace">

            <?php if(strpos($_SERVER['HTTP_USER_AGENT'], 'MSIE') == FALSE) { 
                echo "<p>You've made a good choice of browser!</p>";
            } else { 
                echo "<p>Why are you using IE??</p>";
            } ?>

            <!-- PHP allows you to break statements into several PHP code tags, 
                    while still selectively compiling the HTML found between different
                    bits of PHP based on the PHP -->
            <?php if(strpos($_SERVER['HTTP_USER_AGENT'], 'MSIE') == FALSE) { ?>
                <p>You've made a good choice of browser!</p>
            <?php } else { ?>
                <p>Why are you using IE??</p>
            <?php } ?>

            <form method="post" action="test.php">
                <input type="text" name="name">
                <input type="submit">
            </form>

            <form action="test.php" method="post">
                <input type="submit" name="on" value="on">
                <input type="submit" name="off" value="off">
            </form>
        </main>
    </body>
</html>
<script>
// how to remove a specific event listener
//    jQuery allows us to assign namespaces to events when we attach a listener using .on()
$('body').on("click.for_future_ref", "#namespace", function() {
    console.log("we have an event listener attached to our button!");
});
$('body').on("click", "#namespace", function() {
    console.log("we have another event listener attached to our button!");
});

// then, when using .off(), we can specify a namespace to remove its associated listeners
$('body').on("click", "#remove_namespace", function() {
    $('body').off(".for_future_ref", "#namespace");
    console.log("listener removed!");
});

// this gives us some amount of control over removing specific listeners
//    while still allowing us to use anonymous functions when creating event listeners!

// convert a Windows file into Unix line-endings:
//    dos2unix filename.php
</script>

<?php
    if($_SERVER['REQUEST_METHOD'] == 'POST') {
        echo '<p>We accessed this page as the result of a POST request</p>';

        if($_POST['name'] == "Sam") {
            echo "<p>Hey, it's Sam!</p>";
        } else if($_POST['name'] != "") {
            $test = $_POST["name"];
            echo "<p>Hello, stranger $test!</p>";
        }
    }

    if(isset($_POST['on'])) {
        on_clicked();
    }

    if(isset($_POST['off'])) {
        off_clicked();
    }

    function on_clicked() {
        echo "You clicked the button labeled 'on'";
    }

    function off_clicked() {
        echo "You clicked the button labeled 'off'";
    }
?>