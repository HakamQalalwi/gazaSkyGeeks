let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function renderTasks(filteredTasks = tasks) {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";

  filteredTasks.forEach((task, index) => {
    const taskItem = document.createElement("div");
    taskItem.className = `task-item ${task.completed ? "completed" : ""}`;
    taskItem.innerHTML = `
          <span class="priority">${
            task.priority.charAt(0).toUpperCase() + task.priority.slice(1)
          } | Due: ${new Date(task.dueDate).toLocaleDateString()}</span>
          <span>${task.description}</span>
          <div class="task-actions">
              <button onclick="toggleCompletion(${index})">${
      task.completed ? "Undo" : "Complete"
    }</button>
              <button onclick="editTask(${index})" title="Edit Task">Edit<i class="fas fa-edit"></i></button>
              <button onclick="deleteTask(${index})" title="Delete Task">Delete<i class="fas fa-trash"></i></button>
          </div>
      `;
    taskList.appendChild(taskItem);
  });
}

function addTask() {
  const taskInput = document.getElementById("taskInput");
  const dueDate = document.getElementById("dueDate").value;
  const priority = document.getElementById("priority").value;
  const description = taskInput.value.trim();

  if (description && dueDate) {
    tasks.push({ description, dueDate, priority, completed: false });
    taskInput.value = "";
    document.getElementById("dueDate").value = "";
    saveTasks();
    renderTasks();
    showNotification("Task added successfully!", "success");
  } else {
    showNotification("Please fill in all fields.", "error");
  }
}

function toggleCompletion(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  renderTasks();
  showNotification("Task completion status toggled.", "success");
}

function editTask(index) {
  const newDescription = prompt(
    "Edit task description:",
    tasks[index].description
  );
  const newDueDate = prompt(
    "Edit due date (YYYY-MM-DD):",
    tasks[index].dueDate
  );
  const newPriority = prompt(
    "Edit task priority (low, medium, high):",
    tasks[index].priority
  );

  if (newDescription && newDueDate) {
    tasks[index].description = newDescription.trim();
    tasks[index].dueDate = newDueDate;
    tasks[index].priority = newPriority;
    saveTasks();
    renderTasks();
    showNotification("Task updated successfully!", "success");
  }
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
  showNotification("Task deleted successfully!", "success");
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Notification function
function showNotification(message, type) {
  const notification = document.getElementById("notification");
  notification.innerText = message;
  notification.className = `notification ${type} show`;
  setTimeout(() => {
    notification.classList.remove("show");
  }, 3000);
}

// Filter function
function filterTasks() {
  const filterInput = document
    .getElementById("filterInput")
    .value.toLowerCase();
  const filteredTasks = tasks.filter((task) =>
    task.description.toLowerCase().includes(filterInput)
  );
  renderTasks(filteredTasks);
}

document.getElementById("addTaskButton").addEventListener("click", addTask);

renderTasks();
