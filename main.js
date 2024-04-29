document.addEventListener("DOMContentLoaded", function() {
    const taskInput = document.getElementById("taskInput");
    const addTaskBtn = document.getElementById("addTaskBtn");
    const taskList = document.getElementById("taskList");

    // Cargar tareas almacenadas al cargar la página
    loadTasks();

    addTaskBtn.addEventListener("click", function() {
        const taskText = taskInput.value.trim();
        if (taskText !== "") {
            addTask(taskText);
            saveTasks();
            taskInput.value = "";
        }
    });

    function addTask(taskText) {
        const li = document.createElement("li");
        li.innerHTML = `
            <input type="checkbox" class="taskCheckbox">
            <span>${taskText}</span>
            <button class="deleteBtn">Eliminar</button>
        `;
        taskList.appendChild(li);

        const deleteBtn = li.querySelector(".deleteBtn");
        deleteBtn.addEventListener("click", function() {
            li.remove();
            saveTasks();
        });

        const taskCheckbox = li.querySelector(".taskCheckbox");
        taskCheckbox.addEventListener("change", function() {
            li.classList.toggle("completed");
            saveTasks();
        });
    }

    function saveTasks() {
        const tasks = [];
        const taskElements = document.querySelectorAll("#taskList li");
        taskElements.forEach(taskElement => {
            const taskText = taskElement.querySelector("span").textContent;
            const isCompleted = taskElement.classList.contains("completed");
            tasks.push({ text: taskText, completed: isCompleted });
        });
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem("tasks"));
        if (tasks) {
            tasks.forEach(task => {
                addTask(task.text);
                const taskElement = taskList.lastElementChild;
                if (task.completed) {
                    taskElement.classList.add("completed");
                    taskElement.querySelector(".taskCheckbox").checked = true;
                }
            });
        }
    }
});