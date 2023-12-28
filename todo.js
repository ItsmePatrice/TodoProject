import StorageManager from "./StorageManager.js";
import DisplayManager from "./DisplayManager.js";

//const nameForm = document.getElementsByClassName("nameForm");
const toDoForm = document.getElementById("todoform");

let storageManager = new StorageManager();
let displayManager = new DisplayManager();

let uncheckedCircleIcon = document.getElementsByClassName("bi bi-circle");
let checkedCircleIcon = document.getElementsByClassName(
  "bi bi-check-circle-fill"
);

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

function updateClock() {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();

  const hourRotation = (360 / 12) * (hours % 12) + (360 / 12) * (minutes / 60);
  const minuteRotation = (360 / 60) * minutes + (360 / 60) * (seconds / 60);
  const secondRotation = (360 / 60) * seconds;

  document.querySelector(
    ".hour-hand"
  ).style.transform = `rotate(${hourRotation}deg)`;
  document.querySelector(
    ".minute-hand"
  ).style.transform = `rotate(${minuteRotation}deg)`;
  document.querySelector(
    ".second-hand"
  ).style.transform = `rotate(${secondRotation}deg)`;
}

// Update the clock every second
setInterval(updateClock, 1000);

// Initial clock update
updateClock();
