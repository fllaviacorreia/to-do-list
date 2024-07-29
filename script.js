document.addEventListener('DOMContentLoaded', loadTasks);
document.getElementById('taskForm').addEventListener('submit', function(e) {
    e.preventDefault();  // Evita o comportamento padrão do form de recarregar a página
    addTask();
});

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
        renderTask(task.text, task.completed);
    });
}

function saveTasks() {
    const tasks = [];
    document.querySelectorAll('#taskList li').forEach(listItem => {
        const text = listItem.querySelector('label').textContent;
        const completed = listItem.classList.contains('completed');
        tasks.push({ text, completed });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderTask(taskText, completed) {
    const taskList = document.getElementById('taskList');
    const listItem = document.createElement('li');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = completed;
    checkbox.addEventListener('change', function() {
        listItem.classList.toggle('completed');
        saveTasks();
    });

    const label = document.createElement('label');
    label.textContent = taskText;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Apagar';
    deleteButton.addEventListener('click', function() {
        taskList.removeChild(listItem);
        saveTasks();
    });

    listItem.appendChild(checkbox);
    listItem.appendChild(label);
    listItem.appendChild(deleteButton);

    if (completed) {
        listItem.classList.add('completed');
    }

    taskList.appendChild(listItem);
}

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();

    if (taskText === '') {
        return;
    }

    renderTask(taskText, false);
    taskInput.value = '';
    saveTasks();
}