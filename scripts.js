const todoForm = document.querySelector('.todo-form');
const todoInput = document.querySelector('.task');
const todoItemsList = document.querySelector('.list-container');

let tasks = [];

todoForm.addEventListener('submit', event => {
    event.preventDefault();
    addTodo(todoInput.value);
});

function addTodo(item) {
    if (item !== '') {
        const task = {
            id: Date.now(),
            name: item,
            completed: false
        };
        tasks.push(task);
        addToLocalStorage(tasks);

        todoInput.value = '';
    }
}

function renderTodos(todos) {
    todoItemsList.innerHTML = '';

    todos.forEach(item => {
        const checked = item.completed ? 'checked' : '';
        const li = document.createElement('li');

        li.setAttribute('class', 'item');
        li.setAttribute('data-key', item.id);

        if (item.completed == true) {
            li.classList.add('checked');
        }

        li.innerHTML = `
        <input type="checkbox" class="checkbox" ${checked}>
        ${item.name}
        <ion-icon class = "delete-btn-img" name="trash-outline"></ion-icon>
        `

        todoItemsList.appendChild(li);
    });
}

function addToLocalStorage(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTodos(tasks);
}

function getFromLocalStorage() {
    const reference = localStorage.getItem('tasks');

    if (reference) {
        tasks = JSON.parse(reference);
        renderTodos(tasks);
    }
}

function toggle(id) {
    tasks.forEach(item => {
        if (item.id == id) {
            item.completed = !item.completed;
        }
    });
    addToLocalStorage(tasks);
}

function deleteTodo(id) {
    tasks = tasks.filter(item => {
        return item.id != id;
    });
    addToLocalStorage(tasks);
}

getFromLocalStorage();

todoItemsList.addEventListener('click', event => {
    if (event.target.type === 'checkbox') {
        toggle(event.target.parentElement.getAttribute('data-key'));
    }
    if (event.target.classList.contains('delete-btn-img')) {
        deleteTodo(event.target.parentElement.getAttribute('data-key'));
    }
});
