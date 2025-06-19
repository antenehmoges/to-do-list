// Store all folders and their tasks
let folders = {};
let currentFolder = null;

// Create a new folder
function createFolder() {
  const folderInput = document.getElementById('folderInput');
  const folderName = folderInput.value.trim();

  if (folderName === '' || folders[folderName]) {
    alert('Enter a unique folder name.');
    return;
  }

  // Add folder
  folders[folderName] = [];
  folderInput.value = '';
  renderFolders();
}

// Render folder list
function renderFolders() {
  const folderList = document.getElementById('folderList');
  folderList.innerHTML = '';

  Object.keys(folders).forEach(folderName => {
    const li = document.createElement('li');
    li.textContent = folderName;

    // Highlight current folder
    if (folderName === currentFolder) {
      li.classList.add('active');
    }

    // Click to select folder
    li.onclick = () => {
      currentFolder = folderName;
      renderFolders();
      renderTasks();
      document.getElementById('currentFolderTitle').textContent = `📂 ${folderName}`;
    };

    // Delete folder button
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.onclick = (e) => {
      e.stopPropagation(); // Prevent triggering folder selection
      delete folders[folderName];

      // Reset if deleted folder was selected
      if (currentFolder === folderName) {
        currentFolder = null;
        document.getElementById('currentFolderTitle').textContent = 'Select a folder';
        document.getElementById('taskList').innerHTML = '';
      }

      renderFolders();
    };

    li.appendChild(deleteBtn);
    folderList.appendChild(li);
  });
}

// Add a task to selected folder
function addTask() {
  if (!currentFolder) {
    alert('Please select a folder first.');
    return;
  }

  const taskInput = document.getElementById('taskInput');
  const taskText = taskInput.value.trim();
  if (taskText === '') {
    alert('Please enter a task.');
    return;
  }

  folders[currentFolder].push({ text: taskText, completed: false });
  taskInput.value = '';
  renderTasks();
}

// Render tasks for selected folder
function renderTasks() {
  const taskList = document.getElementById('taskList');
  taskList.innerHTML = '';

  const tasks = folders[currentFolder] || [];
  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.textContent = task.text;
    if (task.completed) li.classList.add('completed');

    // Complete Button
    const completeBtn = document.createElement('button');
    completeBtn.textContent = 'Complete';
    completeBtn.className = 'complete';
    completeBtn.onclick = () => {
      task.completed = !task.completed;
      renderTasks();
    };

    // Delete Button
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.onclick = () => {
      folders[currentFolder].splice(index, 1);
      renderTasks();
    };

    li.appendChild(completeBtn);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
  });
}

// Add task on "Enter" keypress
document.getElementById('taskInput').addEventListener('keypress', function (event) {
  if (event.key === 'Enter') {
    addTask();
  }
});

// Optional: Add folder on Enter in folder input
document.getElementById('folderInput').addEventListener('keypress', function (event) {
  if (event.key === 'Enter') {
    createFolder();
  }
});
