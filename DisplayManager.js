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

    // create checked bibiCircleElt
    let checkedbibiCircleElt = document.createElement("i");
    checkedbibiCircleElt.className = "bi bi-check-circle-fill";
    checkedbibiCircleElt.style.display = "none";

    newTodo.id = todo.id;

    newTodo.appendChild(pElt);
    newTodo.appendChild(bibiCircleElt);
    newTodo.appendChild(checkedbibiCircleElt);

    todosList.appendChild(newTodo);
  }

  /**
   * Remove a todo from the page based on it's id
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
  removeAllTodos() {
    const todosList = this.getTodos();
    const childElements = todosList.children;

    for (const child of childElements) {
      child.remove();
    }
  }
}
