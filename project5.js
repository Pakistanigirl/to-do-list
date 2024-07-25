// // script.js
// document.getElementById('add-task-btn').addEventListener('click', addTask);

// function addTask() {
//     let input = document.getElementById('new-task-input');
//     if (input.value.trim() !== '') {
//         let ul = document.getElementById('task-list');
//         let li = document.createElement('li');
//         li.textContent = input.value;
//         li.className = 'task-item';
        
//         // Add a delete button to each task
//         let deleteBtn = document.createElement('button');
//         deleteBtn.textContent = 'Remove';
//         deleteBtn.onclick = function() {
//             ul.removeChild(li);
//         };

//         // Add a complete button to each task
//         let completeBtn = document.createElement('button');
//         completeBtn.textContent = 'Complete';
//         completeBtn.onclick = function() {
//             li.classList.toggle('complete');
//         };

//         li.appendChild(deleteBtn);
//         li.appendChild(completeBtn);
//         ul.appendChild(li);

//         input.value = ''; // Clear input after adding
//     }
// }
// script.js

// Load tasks from local storage when the page loads
document.addEventListener('DOMContentLoaded', function() {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
        addTaskToDOM(task);
    });
});

// Add task button event listener
document.getElementById('add-task-btn').addEventListener('click', addTask);

function addTask() {
    let input = document.getElementById('new-task-input');
    if (input.value.trim() !== '') {
        let task = {
             id: Date.now(),
              content: input.value,
               completed: false };
        addTaskToDOM(task);
        saveTaskToLocalStorage(task);
        input.value = ''; // Clear input after adding
    }
}
////////////////////////////////////////////////////
function addTaskToDOM(task) {
    let ul = document.getElementById('task-list');
    let li = document.createElement('li');
    li.textContent = task.content;
    li.className = 'task-item';

    // Add a delete button to each task
    let deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Remove';
    deleteBtn.className='design_del_btn';
    deleteBtn.onclick = function() {
        ul.removeChild(li);
        deleteTaskFromLocalStorage(task.id);
    };

    // Add a complete button to each task
    let completeBtn = document.createElement('button');
    completeBtn.textContent = 'Complete';
    completeBtn.className='design_complete_btn';
    completeBtn.onclick = function() {
        li.classList.toggle('complete');
        task.completed = !task.completed;
        updateTaskInLocalStorage(task);
    };

    li.appendChild(deleteBtn);
    li.appendChild(completeBtn);
    ul.appendChild(li);
}

function saveTaskToLocalStorage(task) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function deleteTaskFromLocalStorage(id) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    let updatedTasks = tasks.filter(task => task.id !== id);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
}

function updateTaskInLocalStorage(task) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    let index = tasks.findIndex(t => t.id === task.id);
    tasks[index] = task;
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
