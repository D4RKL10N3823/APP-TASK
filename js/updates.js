document.addEventListener('DOMContentLoaded', () => {
    // Extract ID from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    fetch(`http://d4rkl10n3823.pythonanywhere.com/tasks/${id}`)
    .then(response => response.json())
    .then(data => {
        // Add the values in the inputs
        document.getElementById('title').value = data.title;
        document.getElementById('desc').value = data.description;
        document.getElementById('due_date').value = data.due_date;
        document.getElementById('status').value = data.status;
    })
    .catch(error => {
        console.error('Error:', error);
    });

    const form = document.getElementById('form');
    form.addEventListener('submit', function(event) {
        event.preventDefault(); 
        // Validate the date and proceed to update the task
        if (validateDate()) {
            updateTask(id);
        } 
    });
});

function updateTask(id) {
    // Get values from input fields
    const title = document.getElementById('title').value;
    const description = document.getElementById('desc').value;
    const due_date = document.getElementById('due_date').value;
    const status = document.getElementById('status').value;

    // Create updated task object
    const updatedTask = {
        title: title,
        description: description,
        due_date: due_date,
        status: status
    };

    fetch(`http://d4rkl10n3823.pythonanywhere.com/tasks/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedTask) 
    })
    .then(response => response.json())
    .then(data => {
        console.log('Task Updated:', data);
        toastr.success('Task updated!',"Updated!");
        // Redirect to tasks page after update
        setTimeout(() => {
            window.location.href = "tasks.php"; 
        }, 1000);
    })
    .catch(error => {
        toastr.error("Error", error);
    });
}

function validateDate() {
    // Get the value of the due date
    var dueDateInput = document.getElementById("due_date").value;
    const currentDate = new Date(); 
    // Get today's date and format it
    const today = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());

    // Compare due date with today's date
    if (new Date(dueDateInput) < today) {
        toastr.error('Please enter a valid date.', 'Error!');
        return false;
    }

    return true;
}