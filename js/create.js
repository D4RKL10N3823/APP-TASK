const form = document.getElementById('form');
form.addEventListener('submit', function(event) {
    event.preventDefault();
    // Validate the date and proceed to update the task
    if (validateDate()) {
        createTask();
    }
});

function createTask() {
    // Get values from input fields
    const title = document.getElementById('title').value;
    const description = document.getElementById('desc').value;
    const due_date = document.getElementById('due_date').value;

    // Check if all fields are filled
    if(title !== '' && description !== '' && due_date !== ''){
        // Create updated task object
        const newTask = {
            title: title,
            description: description,
            due_date: due_date,
        };
    
        fetch('http://d4rkl10n3823.pythonanywhere.com/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newTask)
        })
    
        .then(response => response.json())
        .then(data => {
            toastr.success('Task Created', 'Created!');
            // Clear input fields
            document.getElementById('title').value = '';
            document.getElementById('desc').value = '';
            document.getElementById('due_date').value = '';
        })
    
        .catch(error => {
            toastr.error("Error", error);
        });
    } else {
        toastr.error('Please fill out all fields before submitting.', 'Error!');
    }
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


