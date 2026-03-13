const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const taskCounter = document.getElementById("taskCounter");
const clearAllBtn = document.getElementById("clearAllBtn");
const filterButtons = document.querySelectorAll(".filter-btn");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentFilter = "all";

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

function getFilteredTasks() {
  if (currentFilter === "pending") {
    return tasks.filter(task => !task.completed);
  }

  if (currentFilter === "completed") {
    return tasks.filter(task => task.completed);
  }

  return tasks;
}

function renderTasks() {
  taskList.innerHTML = "";

  const filteredTasks = getFilteredTasks();

  if (filteredTasks.length === 0) {
    taskList.innerHTML = `<p class="empty-message">Nenhuma tarefa nessa categoria.</p>`;
    updateCounter();
    return;
  }

  filteredTasks.forEach(task => {
    const originalIndex = tasks.indexOf(task);

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
      tasks[originalIndex].completed = !tasks[originalIndex].completed;
      saveTasks();
      renderTasks();
    });

    deleteBtn.addEventListener("click", () => {
      tasks.splice(originalIndex, 1);
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

function setFilter(filter) {
  currentFilter = filter;

  filterButtons.forEach(button => {
    button.classList.remove("active");

    if (button.dataset.filter === filter) {
      button.classList.add("active");
    }
  });

  renderTasks();
}

addTaskBtn.addEventListener("click", addTask);

taskInput.addEventListener("keypress", event => {
  if (event.key === "Enter") {
    addTask();
  }
});

clearAllBtn.addEventListener("click", () => {
  if (tasks.length === 0) {
    alert("Não há tarefas para limpar.");
    return;
  }

  const confirmClear = confirm("Tem certeza que deseja apagar todas as tarefas?");

  if (confirmClear) {
    tasks = [];
    saveTasks();
    renderTasks();
  }
});

filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    setFilter(button.dataset.filter);
  });
});

renderTasks();
