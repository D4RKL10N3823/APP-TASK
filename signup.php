<?php
require_once 'db_connection.php';

if (isset($_POST["signup"])) {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $password = $_POST['password'];

    if (!empty($name) && !empty($email) && !empty($password)) {
        $hashed_password = password_hash($password, PASSWORD_DEFAULT);
        $sql = $cnnPDO->prepare("INSERT INTO user (name, email, password) VALUES (:name ,:email, :password)");

        $sql->bindParam(':name', $name);
        $sql->bindParam(':email', $email);
        $sql->bindParam(':password', $hashed_password);

        $sql->execute();
        unset($sql);
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/styles.css">
    <title>Sign Up</title>
</head>
<body>
    <form id="form" method="post">
        <h2>Sign Up</h2>
        <label>Name</label>
        <br>
        <input name="name" type="text" >
        <br>
        <label>Email</label>
        <br>
        <input name="email" type="email">
        <br>
        <label>Password</label>
        <br>
        <input name="password" type="password">
        <br>
        <button type="submit" name="signup">Sign Up</button>
        <p class="signup-link">
            Already have an account?
            <a href="index.php">Log In</a>
        </p>
    </form>
</body>
</html>