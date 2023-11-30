import StorageManager from "./StorageManager.js";
import DisplayManager from "./DisplayManager.js";

const nameForm = document.getElementsByClassName("nameForm");
const toDoForm = document.getElementById("todoform");

let storageManager = new StorageManager();
let displayManager = new DisplayManager();

// Add an extra funtionality to take in the user's name

//userName = undefined;

/*nameForm.addEventListener("submit", function (event) {
  event.preventDefault(); // prevent the page from reloading
  userName = document.getElementById("userName").value;
});*/

// toDoForm SUBMIT
toDoForm.addEventListener("submit", function (event) {
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

function deleteTodoById(id) {
  storageManager.deleteTodoById(id);
  displayManager.deleteTodoById(id);
}

function deleteAllTodos() {
  storageManager.deleteAllTodos();
  displayManager.removeAllTodos();
}

function generateRandomId() {
  return uuidv4();
}
