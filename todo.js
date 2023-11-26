import StorageManager from "../TodoProject/StorageManager";
import DisplayManager from "./DisplayManager";

const form = document.getElementById("todoform");

let storageManager = new StorageManager();
let displayManager = new DisplayManager();

// FORM SUBMIT
form.addEventListener("submit", function (event) {
  event.preventDefault(); // prevent the page from reloading
  const todoInput = document.getElementById("newtodo").value;
  addTodo(todoInput);
  document.getElementById("newtodo").value = "";
});

function addTodo(todoInput) {
  const todo = { description: todoInput, id: generateRandomId() };
  storageManager.addTodo(todo);
  displayManager.addTodo(todo);
}

function deleteTodo(id) {
  storageManager.deleteTodoById(id);
  displayManager.deleteTodoById(id);
}

function deleteAllTodos() {
  storageManager.deleteAllTodos();
  displayManager.deleteAllTodos();
}

function generateRandomId() {
  return uuidv4();
}
