const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');
const pendingCounter = document.getElementById('pending-counter');
const clearCompletedBtn = document.getElementById('clear-completed-btn');

function updatePendingCounter() {
    const pendingTasks = taskList.querySelectorAll('li.task-item:not(.completed)');
    pendingCounter.textContent = `Tareas pendientes: ${pendingTasks.length}`;
}

function createTaskElement(taskText) {
    const li = document.createElement('li');
    li.classList.add('task-item');

    const span = document.createElement('span');
    span.textContent = taskText;

    const buttonsDiv = document.createElement('div');
    buttonsDiv.classList.add('task-buttons');

    const completeBtn = document.createElement('button');
    completeBtn.textContent = 'Completar';
    completeBtn.classList.add('complete-btn');

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Eliminar';
    deleteBtn.classList.add('delete-btn');

    buttonsDiv.appendChild(completeBtn);
    buttonsDiv.appendChild(deleteBtn);
    li.appendChild(span);
    li.appendChild(buttonsDiv);

    function toggleCompleted() {
        li.classList.toggle('completed');
        updatePendingCounter();
    }
    span.addEventListener('click', toggleCompleted);
    completeBtn.addEventListener('click', toggleCompleted);

    deleteBtn.addEventListener('click', () => {
        li.remove();
        updatePendingCounter();
    });

    return li;
}

taskForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const taskText = taskInput.value.trim();

    if (taskText === '') {
        return;
    }

    const newTask = createTaskElement(taskText);
    taskList.appendChild(newTask);

    taskInput.value = '';
    taskInput.focus();

    updatePendingCounter();
});

clearCompletedBtn.addEventListener('click', function () {
    const completedTasks = taskList.querySelectorAll('li.completed');
    completedTasks.forEach(task => task.remove());
    updatePendingCounter();
});