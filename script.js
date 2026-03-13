const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const taskCounter = document.getElementById("taskCounter");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function updateCounter() {
  const pendingTasks = tasks.filter(task => !task.completed).length;

  if (pendingTasks === 0) {
    taskCounter.textContent = "Nenhuma tarefa pendente";
  } else if (pendingTasks === 1) {
    taskCounter.textContent = "1 tarefa pendente";
  } else {
    taskCounter.textContent = `${pendingTasks} tarefas pendentes`;
  }
}

function renderTasks() {
  taskList.innerHTML = "";

  if (tasks.length === 0) {
    taskList.innerHTML = `<p class="empty-message">Nenhuma tarefa adicionada ainda.</p>`;
    updateCounter();
    return;
  }

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.classList.add("task-item");

    if (task.completed) {
      li.classList.add("completed");
    }

    li.innerHTML = `
      <span class="task-text">${task.text}</span>
      <button class="delete-btn">X</button>
    `;

    const taskText = li.querySelector(".task-text");
    const deleteBtn = li.querySelector(".delete-btn");

    taskText.addEventListener("click", () => {
      tasks[index].completed = !tasks[index].completed;
      saveTasks();
      renderTasks();
    });

    deleteBtn.addEventListener("click", () => {
      tasks.splice(index, 1);
      saveTasks();
      renderTasks();
    });

    taskList.appendChild(li);
  });

  updateCounter();
}

function addTask() {
  const text = taskInput.value.trim();

  if (text === "") {
    alert("Digite uma tarefa antes de adicionar.");
    return;
  }

  tasks.push({
    text: text,
    completed: false
  });

  saveTasks();
  renderTasks();
  taskInput.value = "";
  taskInput.focus();
}

addTaskBtn.addEventListener("click", addTask);

taskInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    addTask();
  }
});

renderTasks();
