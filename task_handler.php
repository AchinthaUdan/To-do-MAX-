<?php
// task_handler.php

// Include the database connection file
include('db_con.php');

// Function to add a task
function addTask($taskName, $taskDate, $taskTime, $taskStatus, $taskType, $recurringDays = 0) {
    global $conn;  // Access the global $conn object

    // Prepare SQL query to insert a new task into the database
    $sql = "INSERT INTO tasks (task_name, task_date, task_time, task_status, task_type, recurring_days) 
            VALUES ('$taskName', '$taskDate', '$taskTime', '$taskStatus', '$taskType', '$recurringDays')";

    // Execute the query and check if the task was added successfully
    if ($conn->query($sql) === TRUE) {
        echo "New task added successfully.";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
}

// Function to get all tasks
function getAllTasks() {
    global $conn;  // Access the global $conn object

    // Prepare SQL query to fetch all tasks from the database
    $sql = "SELECT * FROM tasks";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        // Loop through all tasks and display them
        while ($row = $result->fetch_assoc()) {
            echo "Task: " . $row["task_name"] . " - Status: " . $row["task_status"] . "<br>";
        }
    } else {
        echo "No tasks found.";
    }
}

// Example usage of addTask function
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Retrieve data from POST request
    $taskName = $_POST['taskName'];
    $taskDate = $_POST['taskDate'];
    $taskTime = $_POST['taskTime'];
    $taskStatus = $_POST['taskStatus'];
    $taskType = $_POST['taskType'];
    $recurringDays = isset($_POST['recurringDays']) ? $_POST['recurringDays'] : 0;

    // Call the addTask function
    addTask($taskName, $taskDate, $taskTime, $taskStatus, $taskType, $recurringDays);
}

// Example usage of getAllTasks function
getAllTasks();

// Close the database connection
$conn->close();
?>
