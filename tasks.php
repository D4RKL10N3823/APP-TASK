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
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
    <link rel="stylesheet" href="css/task.css">
    <title>Tasks</title>
</head>
<body>
    <header class="header">
        <nav class="nav">
            <ul class="nav-list">
                <li><a href="create.php">Create</a></li>
                <li><select id="filter">
                    <option value="all" selected>All</option>
                    <option value="to_do">To Do</option>
                    <option value="in_progress">In Progress</option>
                    <option value="completed">Completed</option>
                </select></li>
                <li><form method="post"><button type="submit" name="logout">Logout</button></form></li>
            </ul>
        </nav>
    </header>

    <main id="tasks">

    </main>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>

    <script src="js/toastr.js"></script>
    <script src="js/toastr.min.js"></script>
    <script src="js/show.js"></script>
    
</body>
</html>