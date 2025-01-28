document.addEventListener('DOMContentLoaded', () => {
    const submit = document.querySelector('#submit');
    const list = document.querySelector('ul');
    const input = document.querySelector('#task');

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    function renderTasks() {
        list.innerHTML = '';
        tasks.forEach((task, index) => {
            list.innerHTML += `<li>
                                <span>${task}</span>
                                <button class="delete" data-index="${index}">delete</button>
                            </li>`;
        });
    }

    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    renderTasks();

    submit.addEventListener('click', (e) => {
        e.preventDefault();
        const takeTask = input.value.trim();
        if (takeTask === '') {
            return;
        } else {
            tasks.push(takeTask);
            input.value = '';
            saveTasks();
            renderTasks();
        }
    });

    list.addEventListener('click', (e) => {
        if (e.target.classList.contains('delete')) {
            const index = e.target.getAttribute('data-index');
            tasks.splice(index, 1);
            saveTasks();
            renderTasks();
        }
    });
});