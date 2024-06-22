// THIS THE JAVSCRIPT CODE BEFORE USING API
document.addEventListener('DOMContentLoaded', () => {
    // Get references to the form and the task list table body
    const taskForm = document.getElementById('task-form');
    const taskList = document.querySelector('#task-list tbody');
    let taskNumber = 1; // Initializing the task number counter

    // Add event listener for the form submission to prevent default behavior
    taskForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Prevent the default form submission behavior
        addTask(); // Call the function to add a new task
    });

    // Function to add a new task
    function addTask() {
        // Get the values from the input fields
        const taskName = document.getElementById('task-name').value;
        const taskDesc = document.getElementById('task-desc').value;
        const taskDeadline = document.getElementById('task-deadline').value;

        // Create a new table row for the task
        const taskRow = document.createElement('tr');

        // Set the inner HTML of the task row
        taskRow.innerHTML = `
            <td>${taskNumber}</td>
            <td>${taskName}</td>
            <td>${taskDesc}</td>
            <td>${taskDeadline}</td>
            <td>
                <button class="edit-btn" style=" color: #008080; border: none; padding: 5px 10px; border-radius: 5px;cursor: pointer; display: flex; align-items: center; gap: 5px;"><i class="fas fa-edit"></i></button>
            </td>
            <td>
                <button class="delete-btn" style="color:  #f44336; border: none; padding: 5px 10px; border-radius: 5px;cursor: pointer; display: flex; align-items: center; gap: 5px;" ><i class="fas fa-trash-alt"></i></button>
            </td>
        `;

        // Append the task row to the task list
        taskList.appendChild(taskRow);
        taskNumber++; // Increment the task number

        // Reset the form fields
        document.getElementById('task-form').reset();

        // Add event listener for the delete button
        const deleteBtn = taskRow.querySelector('.delete-btn');
        deleteBtn.addEventListener('click', () => {
            taskRow.remove(); // Remove the task row
            taskNumber--; // Decrement the task number
            updateTaskNumbers(); // Update the task numbers
        });

        // Add event listener for the edit button
        const editBtn = taskRow.querySelector('.edit-btn');
        editBtn.addEventListener('click', () => {
            editTask(taskRow); // Call the function to edit the task
        });
    }

    // Function to update the task numbers
    function updateTaskNumbers() {
        const rows = taskList.querySelectorAll('tr'); // Get all task rows
        rows.forEach((row, index) => {
            row.cells[0].textContent = index + 1; // Update the task number
        });
    }

    // Function to edit a task
    function editTask(taskRow) {
        // Get the current values from the task row
        const taskName = taskRow.cells[1].textContent;
        const taskDesc = taskRow.cells[2].textContent;
        const taskDeadline = taskRow.cells[3].textContent;

        // Set the form fields with the current values
        document.getElementById('task-name').value = taskName;
        document.getElementById('task-desc').value = taskDesc;
        document.getElementById('task-deadline').value = taskDeadline;

        // Remove the task row from the table
        taskRow.remove();
        taskNumber--; // Decrement the task number
        updateTaskNumbers(); // Update the task numbers
    }
});
