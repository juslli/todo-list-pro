const input = document.getElementById("taskInput")
const button = document.getElementById("addBtn")
const list = document.getElementById("taskList")

let tasks = JSON.parse(localStorage.getItem("tasks")) || []

function saveTasks(){
localStorage.setItem("tasks", JSON.stringify(tasks))
}

function renderTasks(){

list.innerHTML=""

tasks.forEach((task,index)=>{

const li = document.createElement("li")

li.innerHTML = `
<span onclick="toggleTask(${index})">${task.text}</span>
<button onclick="deleteTask(${index})">X</button>
`

if(task.done){

li.classList.add("done")

}

list.appendChild(li)

})

}

function addTask(){

const text = input.value.trim()

if(text==="") return

tasks.push({

text:text,
done:false

})

input.value=""

saveTasks()

renderTasks()

}

function toggleTask(index){

tasks[index].done=!tasks[index].done

saveTasks()

renderTasks()

}

function deleteTask(index){

tasks.splice(index,1)

saveTasks()

renderTasks()

}

button.addEventListener("click",addTask)

renderTasks()