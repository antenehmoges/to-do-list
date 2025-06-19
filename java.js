function addTask() {
  const taskInput = document.getElementById('taskInput');
  const taskText = taskInput.value.trim();

  if (taskText === '') {
    alert('Please enter a task.');
    return;
  }

  const taskList = document.getElementById('taskList');
  const li = document.createElement('li');
  li.textContent = taskText;

  // Buttons Container
  const buttonsDiv = document.createElement('div');

  // Complete Button
  const completeButton = document.createElement('button');
  completeButton.textContent = 'Complete';
  completeButton.classList.add('complete');
  completeButton.onclick = () => {
    li.classList.toggle('completed');
  };
  buttonsDiv.appendChild(completeButton);

  // Delete Button
  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';
  deleteButton.onclick = () => {
    taskList.removeChild(li);
  };
  buttonsDiv.appendChild(deleteButton);

  // Add Buttons to LI
  li.appendChild(buttonsDiv);
  taskList.appendChild(li);

  taskInput.value = '';
}

// Enable "Enter" key to add task
document.getElementById('taskInput').addEventListener('keypress', function (event) {
  if (event.key === 'Enter') {
    addTask();
  }
});
