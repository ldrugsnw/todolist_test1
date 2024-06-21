document.addEventListener('DOMContentLoaded', () => {
    const todoForm = document.getElementById('todo-form');
    const todoInput = document.getElementById('todo-input');
    const todoList = document.getElementById('todo-list');

    let todos = JSON.parse(localStorage.getItem('todos')) || [];

    const saveTodos = () => {
        localStorage.setItem('todos', JSON.stringify(todos));
    };

    const renderTodos = () => {
        todoList.innerHTML = '';
        todos.forEach((todo, index) => {
            const li = document.createElement('li');
            li.className = todo.completed ? 'completed' : '';
            li.innerHTML = `
                <span>${todo.text}</span>
                <div>
                    <button class="complete-btn">${todo.completed ? '취소' : '완료'}</button>
                    <button class="delete-btn">삭제</button>
                </div>
            `;
            li.querySelector('.complete-btn').addEventListener('click', () => {
                todos[index].completed = !todos[index].completed;
                saveTodos();
                renderTodos();
            });
            li.querySelector('.delete-btn').addEventListener('click', () => {
                todos.splice(index, 1);
                saveTodos();
                renderTodos();
            });
            todoList.appendChild(li);
        });
    };

    todoForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const newTodo = { text: todoInput.value, completed: false };
        todos.push(newTodo);
        saveTodos();
        renderTodos();
        todoInput.value = '';
    });

    renderTodos();
});
