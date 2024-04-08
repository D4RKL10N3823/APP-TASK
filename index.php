<?php
session_start();
require_once 'db_connection.php';
?>


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/styles.css">
    <title>Log In</title>
</head>
<body>
    <form class="form" id="form" method="post">
        <h2>Log In</h2>
        <label>Email</label>
        <br>
        <input id="email" type="email" name="email">
        <br>
        <label>Password</label>
        <br>
        <input id="password" type="password" name="password">
        <br>
        <button type="submit" name="login">Log In</button>
       
        <p class="signup-link">
            No account?
            <a href="signup.php">Sign Up</a>
        </p>

        <?php
            if (isset($_POST['login'])) {
	            // Login credentials provided by the user (email and password) are captured.
                $email = $_POST['email'];
                $password = $_POST['password'];
            	  
                // A query is made to the database to check if a user exists with the same email.
                $query = $cnnPDO->prepare('SELECT * from user WHERE email = :email');
                $query->bindParam(':email', $email);
                $query->execute();
                $campo = $query->fetch();
            	
                // If the credentials are correct, the user is logged in and redirected to the tasks page. Otherwise, an error message is displayed."
                if ($campo && password_verify($password, $campo['password'])) {
                    $_SESSION['name'] = $campo['name'];
                    $_SESSION['email'] = $campo['email'];
                    header("Location: tasks.php");
                    exit();
                } else {
                    echo "<div class='alert' style='color:red;text-align:center;'>
                            <b>Email or password incorrect</b>
                        </div>";
                }
            }
        ?>

    </form>
</body>
</html>