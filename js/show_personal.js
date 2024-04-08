document.addEventListener('DOMContentLoaded', () => {
    // Get the id of the filter
    const filterSelect = document.getElementById('filter');
    // Filter tasks when the filter selection changes
    filterSelect.addEventListener('change', getTasks);
    getTasks(); 
});

function getTasks() {
    const filterValue = document.getElementById('filter').value;
    fetch('https://d4rkl10n3823.pythonanywhere.com/tasks')
    .then(response => response.json())
    .then(data => {
        const tasksContainer = document.getElementById('tasks');
        tasksContainer.innerHTML = '';

        data.forEach(task => {
            // Filter tasks based on the selected filter
            var name = document.getElementById('name').value;
            if(task.member_team === name){ 
                if (filterValue === 'all' || task.status.toLowerCase().replaceAll(" ", "_") === filterValue) {
                    // Create a div element for each task
                    const taskDiv = document.createElement('div');
                    taskDiv.classList.add('div')
                    taskDiv.classList.add('task');

                    // Const of the difference of the due date and the current date
                    const dueDateDiff = new Date(task.due_date) - new Date();
                    // Add priority based on the current date and the due date
                    var priority = dueDateDiff <= 2 * 24 * 60 * 60 * 1000 ? 'High ' : dueDateDiff <= 5 * 24 * 60 * 60 * 1000 ? 'Medium' : 'Low';

                    const taskPriority = document.createElement('p');
                    taskPriority.textContent = priority;
                    taskPriority.style.textAlign = 'end';
                    taskPriority.style.color = '#4f46e5';
                    taskDiv.appendChild(taskPriority);

                    // Create an h3 element for the task title
                    const title = document.createElement('h3');
                    title.textContent = `${task.title}`;
                    taskDiv.appendChild(title);

                    // Create a p element for the task description
                    const description = document.createElement('p');
                    description.textContent = `${task.description}`;
                    taskDiv.appendChild(description);

                    // Create an p element for the due date
                    const dueDate = document.createElement('p');
                    dueDate.textContent = `${task.due_date}`;
                    taskDiv.appendChild(dueDate);

                    // Create an p element for the task status
                    const status = document.createElement('p');
                    const strong = document.createElement('b')
                    status.appendChild(strong)
                    strong.textContent = `${task.status}`;
                    // Assign a color based on the status
                    strong.style.color = task.status === 'Completed' ? 'green' : task.status === 'In Progress' ? 'orange' : 'red';
                    taskDiv.appendChild(status);

                    // Create a container for the edit and delete buttons
                    const divButton = document.createElement('div');
                    divButton.classList.add('button-container');
                    taskDiv.appendChild(divButton); 

                    // Create a link to edit each task based on its id
                    const editLink = document.createElement('a');
                    editLink.classList.add('edit');
                    editLink.href = `edit.php?id=${task.id}`;
                    editLink.textContent = 'Edit';
                    divButton.appendChild(editLink); 

                    // Create a link to delete each task based on its id
                    const deleteLink = document.createElement('a');
                    deleteLink.classList.add('delete');
                    deleteLink.textContent = 'Delete';
                    deleteLink.addEventListener('click', () => deleteTask(task.id));
                    divButton.appendChild(deleteLink);

                    // Add the task div to the tasks container
                    tasksContainer.appendChild(taskDiv);
                }
            }
        });
    })
    .catch(error => {
        console.error('Error:', error);
    });
}


function deleteTask(id) {
    fetch(`https://d4rkl10n3823.pythonanywhere.com/tasks/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        console.log('Task Deleted:', data);
        toastr.error('Task deleted successfully!',"Deleted!");
        // Reload the page after deleting the task
        setTimeout(() => {
            window.location.reload(); 
        }, 1000);
    })
    .catch(error => {
        console.error('Error:', error);
    });
}