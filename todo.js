import StorageManager from "../TodoProject/StorageManager";

const form = document.getElementById("todoform");

const storageManager = new StorageManager();

let todos = []; // each todoObject must have an id when created

// FORM SUBMIT
form.addEventListener("submit", function (event) {
  event.preventDefault(); // prevent the page from reloading
  const todoInput = document.getElementById("newtodo").value;
  addTodo(todoInput);
  document.getElementById("newtodo").value = "";
});

function addTodo(todoInput) {
  const todo = { description: todoInput, id: generateRandomId() };
  todos.push(todo);
  // allow storageManager to manage all memory stuff including todos list so you don't need push
}

function generateRandomId() {
  return uuidv4();
}
