let todos;
const savedTodos = JSON.parse(localStorage.getItem('todos'));

if (Array.isArray(savedTodos)) {
  todos = savedTodos;
} else {
  todos = [{
    dueDate: '2023-01-01',
    title: 'Create first ToDo',
    id: 'id0'
  }];
}

function createTodo(title, dueDate) {
  const id = '' + new Date().getTime();
  todos.push({
    dueDate: dueDate,
    title: title,
    id: id
  });
  saveTodos();
}

function removeTodo(idToDelete) {
  todos = todos.filter(function (todo) {
    if (todo.id === idToDelete) {
      return false;
    } else {
      return true;
    }
  });
  saveTodos();
}

function setEditing(todoId) {
  todos.forEach(function (todo) {
    if (todo.id === todoId) {
      todo.isEditing = true;
    }
  });
  saveTodos();
}

function updateTodo(todoId, newTitle, newDate) {
  todos.forEach(function (todo) {
    if (todo.id === todoId) {
      todo.dueDate = newDate;
      todo.title = newTitle;
      todo.isEditing = false;
    }
  });
  saveTodos();
}

function saveTodos() {
  localStorage.setItem('todos', JSON.stringify(todos));
}


function addTodo() {
  const textbox = document.getElementById('todo-title');
  const title = textbox.value;
  const datePicker = document.getElementById('date-picker');
  const dueDate = datePicker.value;
  createTodo(title, dueDate);
  render();
}

function deleteTodo(event) {
  const deleteButton = event.target;
  const idToDelete = deleteButton.id;
  removeTodo(idToDelete);
  render();
}

function onEdit(event) {
  const editButton = event.target;
  const todoId = editButton.dataset.todoId;
  setEditing(todoId);
  render();
}

function onUpdate(event) {
  const updateButton = event.target;
  const todoId = updateButton.dataset.todoId;
  const textbox = document.getElementById('edit-title-' + todoId);
  const newTitle = textbox.value;
  const datePicker = document.getElementById('edit-date-' + todoId);
  const newDate = datePicker.value;
  updateTodo(todoId, newTitle, newDate);
  render();
}


function render() {
  document.getElementById('todo-list').innerHTML = '';
  todos.forEach(function (todo) {
    let element = document.createElement('div');
    if (todo.isEditing === true) {
      const textbox = document.createElement('input');
      textbox.maxLength = "18";
      textbox.type = 'text';
      textbox.id = 'edit-title-' + todo.id;
      element.appendChild(textbox);
      const datePicker = document.createElement('input');
      datePicker.type = 'date';
      datePicker.id = 'edit-date-' + todo.id;
      element.appendChild(datePicker);
      const updateButton = document.createElement('button');
      updateButton.innerText = 'Update';
      updateButton.dataset.todoId = todo.id;
      updateButton.onclick = onUpdate;
      element.appendChild(updateButton);
    } else {
      const editButton = document.createElement('button');
      editButton.classList.add("edit");
      element.innerText = todo.dueDate + '   ' + todo.title;
      editButton.innerText = 'Edit';
      editButton.onclick = onEdit;
      editButton.dataset.todoId = todo.id;
      element.appendChild(editButton);
      const deleteButton = document.createElement('button');
      deleteButton.classList.add("delete");
      deleteButton.innerText = 'Delete';
      deleteButton.onclick = deleteTodo;
      deleteButton.id = todo.id;
      element.appendChild(deleteButton);
    }
    const todoList = document.getElementById('todo-list');
    todoList.appendChild(element);
  });
}
render();