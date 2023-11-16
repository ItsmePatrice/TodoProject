// find error with file and link the file to the html properly

// SELECT ELEMENTS
const form = document.getElementById("todoform");
const todoInput = document.getElementById("newtodo");

let todos = [];

// FORM SUBMIST
form.addEventListener("submit", function (event) {
  event.preventDefault(); // prevent the page from reloading

  saveTodo();
});

// SAVE TODO
function saveTodo() {
  const todoValue = todoInput.value;

  // Check if the todo is empty
  const isEmpty = todoValue === " ";

  //check for duplicate todos
  const isDuplicate = todos.some((todo) => todo.value.toUpperCase() === todoValue.toUpperCase());


  if (isEmpty) {
    alert("Todo is empty");
  } else if(isDuplicate) {
    alert("Todo already exists.");
  } else {
    todos.push({
    value: todoValue,
    checked: false,
    color: "#" + Math.floor(Math.random()*16777215).toString(16);
  });
    todoInput.value = " ";
  }

}
