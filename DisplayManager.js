export default class DisplayManager {
  constructor() {}

  /**
   * get the array of todos
   */
  getTodos() {
    const todosList = document.getElementById("todos-list");
    return todosList;
  }

  /**
   * Add a todo to the page
   */
  addTodo(todo) {
    const todosList = this.getTodos();
    let newTodo = document.createElement("div");

    const todoMessage = todo.description;

    // create paragraph element containing todo description
    let pElt = document.createElement("p");
    pElt.textContent = todoMessage;

    // create bibiCircleElt
    let bibiCircleElt = document.createElement("i");
    bibiCircleElt.className = "bi bi-circle";
    bibiCircleElt.addEventListener("click", () =>
      this.toggleTodoState(bibiCircleElt)
    );

    // create checked bibiCircleElt
    let checkedbibiCircleElt = document.createElement("i");
    checkedbibiCircleElt.className = "bi bi-check-circle-fill";
    checkedbibiCircleElt.style.display = "none";

    newTodo.id = todo.id;

    newTodo.appendChild(bibiCircleElt);
    newTodo.appendChild(checkedbibiCircleElt);
    newTodo.appendChild(pElt);

    todosList.appendChild(newTodo);
  }

  /**
   * Toggle the state of a todo when the unchecked icon is clicked
   */
  toggleTodoState(bibiCircleElt) {
    const checkedbibiCircleElt = bibiCircleElt.nextElementSibling;
    bibiCircleElt.style.display = "none";
    checkedbibiCircleElt.style.display = "block";

    setTimeout(() => {
      const todoElement = bibiCircleElt.parentElement;
      todoElement.classList.add("fall-animation");

      // Wait for the animation to complete before removing the todo
      setTimeout(() => {
        this.deleteTodoById(todoElement.id);
      }, 500);
    }, 100);
  }

  /**
   * Remove a todo from the page *based on it's id
   */
  deleteTodoById(id) {
    const todosList = this.getTodos();
    const childElements = todosList.children;

    for (const child of childElements) {
      if (child.id === id) {
        child.remove();
      }
    }
  }

  /**
   * Remove all the todos from the page
   */
  deleteAllTodos() {
    const todosList = this.getTodos();
    const childElements = todosList.children;

    for (const child of childElements) {
      child.remove();
    }
  }
}
