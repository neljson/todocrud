//fetch data for the front end
fetch('/todos')
  .then((response) => response.json())
  .then((data) => {
    data.forEach((todo) => {
      appendTodo(todo);
    });
  });

const appendTodo = (todo) => {
  const list = document.getElementById('todo-list');
  list.innerHTML += `<li id=todo-${todo.id}> ${todo.title} - ${todo.description} <button onclick=deleteTodo(${todo.id})> X </button></li>`;
};

const deleteTodo = (id) => {
  let el = document.getElementById(`todo-${id}`);
  el.remove();
  fetch(`/todo/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

const addTodo = () => {
  const list = document.getElementById('todo-list');
  const title = document.getElementById('name').value;
  const description = document.getElementById('description').value;
  list.innerHTML += `<li id=todo${todo.id}>${todo.title} - ${todo.description}</li>`;
  fetch(`/todo`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: {
      title: title,
      description: description,
    },
  });
};
