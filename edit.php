<?php 
session_start();

if (!isset($_SESSION['email']) || $_SESSION['email'] == "") {
    header('Location: index.php');
    exit;
}

if(isset($_POST['logout'])){
    session_destroy();
    header("location: index.php");
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/toastr.min.css">
    <link rel="stylesheet" href="css/styles.css">
    <title>Edit Task</title>
</head>
<body>
    <header class="header">
        <nav class="nav">
            <ul class="nav-list">
                <li><a href="tasks.php">Tasks</a></li>
                <li><form method="post"><button type="submit" name="logout">Logout</button></form></li>
            </ul>
        </nav>
    </header>

    <form id="form">
        <h2>Edit Task</h2>
        <label>Title</label>
        <br>
        <input id="title" readonly>
        <br>
        <label>Description</label>
        <br>
        <textarea id="desc" maxlength="100"></textarea>
        <br>
        <label>Due Date</label>
        <br>
        <input id="due_date" type="date">
        <br>
        <label>Status</label>
        <br>
        <select id="status">
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
        </select>
        <br>
        <button type="submit">Edit</button>
    </form>

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>

    <script src="js/toastr.js"></script>
    <script src="js/toastr.min.js"></script>

    <script src="js/updates.js"></script>
</body>
</html>
