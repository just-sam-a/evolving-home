#!/usr/local/bin/php
<?php
    session_save_path(__DIR__ . "/sessions");
    session_name('queue_login');
    session_start();

    $_SESSION['loggedin'] = false;

    function validate($password, $username, &$error) {
        $username_path = __DIR__ . "/passwords/" . $username . ".txt";
        $pass = file_get_contents($username_path);
        if($pass === false) {
            $error = true;
            return;
        }
        $pass = trim($pass);
        $password = hash('md5', $password);

        if($password === $pass) {
            $_SESSION['loggedin'] = true;
            $_SESSION['username'] = $username;
            header('Location: queue.php');
        } else {
            $error = true;
        }
    }

    $error = false;
    if(isset($_POST['password']) and isset($_POST['username'])) {
        validate($_POST['password'], $_POST['username'], $error);
    }
?>
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Submission Queue Login</title>
        <link rel="stylesheet" href="gallery.css">
    </head>

    <body>
        <header>
            <h1>Submission Queue Login</h1>
        </header>
    
        <main>
            <hr>
            <p>Welcome. Please enter a username and password to view the queue.</p>
            <p>To view submissions as a guest, please use username 'guest' and password 'guest_login'.</p>
            <form method="post" action="<?php echo $_SERVER['PHP_SELF']; ?>">
                <input type="text" name="username">
                <input type="password" name="password">
                <input type="submit" value="Log In">
            </form>
            <?php if($error) { ?>
                <p>Invalid password or username.</p>
            <?php } ?>
        </main>
    </body>
</html>