// THIS THE JAVSCRIPT CODE AFTER USING API
document.addEventListener('DOMContentLoaded', () => {
    // Get references to the form and the task list table body
    const taskForm = document.getElementById('task-form');
    const taskList = document.querySelector('#task-list tbody');
    let taskNumber = 1; // Initializing the task number counter

    // Function to fetch tasks from the API and adding to the list
    function fetchTasks() {
        fetch('https://jsonplaceholder.typicode.com/todos')
            .then(response => response.json())
            .then(data => {
                data.forEach(task => {
                    addTaskFromAPI(task); // Add each task to the task list
                });
            })
            .catch(error => console.error('Error fetching tasks:', error)); // display error message if url not found
    }

    // Function to add tasks fetched from the API to the task list
    function addTaskFromAPI(task) {
        const taskRow = document.createElement('tr');
        taskRow.innerHTML = `
            <td>${taskNumber}</td>
            <td>${task.title}</td>
            <td>${task.completed ? 'Completed' : 'Incomplete'}</td>
            <td>
                <button class="edit-btn" style=" color: #008080; border: none; padding: 5px 10px; border-radius: 5px;cursor: pointer; display: flex; align-items: center; gap: 5px;"><i class="fas fa-edit"></i></button>
            </td>
            <td>
                <button class="delete-btn" style="color:  #f44336; border: none; padding: 5px 10px; border-radius: 5px;cursor: pointer; display: flex; align-items: center; gap: 5px;" ><i class="fas fa-trash-alt"></i></button>
            </td>
        `;
        taskList.appendChild(taskRow);
        taskNumber++;

        // Event listener for editing tasks
        const editBtn = taskRow.querySelector('.edit-btn');
        editBtn.addEventListener('click', () => {
            editTask(task, taskRow);
        });

        // Event listener for deleting tasks
        const deleteBtn = taskRow.querySelector('.delete-btn');
        deleteBtn.addEventListener('click', () => {
            deleteTaskFromAPI(task.id, taskRow);
        });
    }

    // Function to add a task via the API  using POST method => add task to the list
    function addTaskViaAPI(taskName) {
        fetch('https://jsonplaceholder.typicode.com/todos', {
            method: 'POST',
            body: JSON.stringify({
                title: taskName,
                completed: false
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
        .then(response => response.json())
        .then(data => {
            addTaskFromAPI(data); // Add the new task to the task list
        })
        .catch(error => console.error('Error adding task:', error));
    }

    // Function to delete a task via the API
    function deleteTaskFromAPI(taskId, taskRow) {
        fetch(`https://jsonplaceholder.typicode.com/todos/${taskId}`, {
            method: 'DELETE',
        })
        .then(response => {
            if (response.ok) {
                taskRow.remove(); // Remove the task from the task list
                taskNumber--; // Decrement the task number
                updateTaskNumbers(); // Update the task numbers
            } else {
                console.error('Failed to delete task:', response.status);
            }
        })
        .catch(error => console.error('Error deleting task:', error));
    }

    // Function to edit a task
    function editTask(task, taskRow) {
        const newTaskName = prompt('Enter new task name:', task.title);
        if (newTaskName) {
            fetch(`https://jsonplaceholder.typicode.com/todos/${task.id}`, {
                method: 'PUT',
                body: JSON.stringify({
                    title: newTaskName,
                    completed: task.completed
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            })
            .then(response => response.json())
            .then(data => {
                taskRow.cells[1].textContent = data.title; // Update the task name in the table
            })
            .catch(error => console.error('Error editing task:', error));
        }
    }

    // Event listener for form submission
    taskForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const taskName = document.getElementById('task-name').value;
        addTaskViaAPI(taskName); // Add task via the API
        document.getElementById('task-form').reset(); // Reset the form fields
    });

    // Function to update the task numbers
    function updateTaskNumbers() {
        const rows = taskList.querySelectorAll('tr');
        rows.forEach((row, index) => {
            row.cells[0].textContent = index + 1;
        });
    }

    // Fetch tasks from the API when the page loads
    fetchTasks();
});
