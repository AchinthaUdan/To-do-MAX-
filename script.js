
        const taskForm = document.getElementById('taskForm');
        const taskList = document.getElementById('taskList');
        const progressBar = document.getElementById('progressBar');
        const recurringOptions = document.getElementById('recurringOptions');
        const searchInput = document.getElementById('searchInput');
        const tasks = [];

        function toggleDarkMode() {
            document.body.classList.toggle('dark-mode');
        }

        function showSection(section) {
            const sections = document.querySelectorAll('.section');
            sections.forEach(sec => sec.classList.remove('active'));
            document.getElementById(section).classList.add('active');
        }

        taskForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const taskName = document.getElementById('taskName').value;
            const taskDate = document.getElementById('taskDate').value;
            const taskStatus = document.getElementById('taskStatus').value;
            const taskType = document.getElementById('taskType').value;
            const task = { taskName, taskDate, taskStatus, taskType };
            tasks.push(task);
            renderTasks();
            taskForm.reset();
        });

        function renderTasks() {
            taskList.innerHTML = '';
            tasks.forEach(task => {
                const taskCard = document.createElement('div');
                taskCard.classList.add('task-card');
                taskCard.innerHTML = `
                    <div>
                        <h4>${task.taskName}</h4>
                        <p>${task.taskDate}</p>
                        <p class="task-status ${task.taskStatus.toLowerCase().replace(' ', '-')}" >${task.taskStatus}</p>
                    </div>
                    <div class="task-actions">
                        <button class="complete" onclick="markComplete('${task.taskName}')">Complete</button>
                        <button onclick="deleteTask('${task.taskName}')">Delete</button>
                    </div>
                `;
                taskList.appendChild(taskCard);
            });
        }

        function markComplete(taskName) {
            const task = tasks.find(t => t.taskName === taskName);
            if (task) {
                task.taskStatus = 'Completed';
                renderTasks();
            }
        }

        function deleteTask(taskName) {
            const taskIndex = tasks.findIndex(t => t.taskName === taskName);
            if (taskIndex !== -1) {
                tasks.splice(taskIndex, 1);
                renderTasks();
            }
        }

        function filterTasks() {
            const query = searchInput.value.toLowerCase();
            const filteredTasks = tasks.filter(task => task.taskName.toLowerCase().includes(query));
            renderFilteredTasks(filteredTasks);
        }

        function renderFilteredTasks(filteredTasks) {
            taskList.innerHTML = '';
            filteredTasks.forEach(task => {
                const taskCard = document.createElement('div');
                taskCard.classList.add('task-card');
                taskCard.innerHTML = `
                    <div>
                        <h4>${task.taskName}</h4>
                        <p>${task.taskDate}</p>
                        <p class="task-status ${task.taskStatus.toLowerCase().replace(' ', '-')}" >${task.taskStatus}</p>
                    </div>
                    <div class="task-actions">
                        <button class="complete" onclick="markComplete('${task.taskName}')">Complete</button>
                        <button onclick="deleteTask('${task.taskName}')">Delete</button>
                    </div>
                `;
                taskList.appendChild(taskCard);
            });
        }

        function handleRecurringChange() {
            if (taskType.value === 'Recurring') {
                recurringOptions.style.display = 'block';
            } else {
                recurringOptions.style.display = 'none';
            }
        }

        document.getElementById('taskType').addEventListener('change', handleRecurringChange);

        renderTasks();
        
        // Add validation before submitting the form
document.getElementById('taskForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const taskName = document.getElementById('taskName').value;
    const taskDate = document.getElementById('taskDate').value;
    const taskStatus = document.getElementById('taskStatus').value;
    const taskTime = document.getElementById('taskTime').value;

    if (!taskName || !taskDate || !taskTime) {
        alert("Please fill all required fields.");
        return;
    }

    // Proceed with task addition
    const task = {
        name: taskName,
        date: taskDate,
        status: taskStatus,
        time: taskTime,
        type: document.getElementById('taskType').value,
        recurring: document.getElementById('recurringDays').value ? true : false,
        recurringDays: document.getElementById('recurringDays').value || 0,
    };

    tasks.push(task);
    renderTasks();
    resetForm();
});