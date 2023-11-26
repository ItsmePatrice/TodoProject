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
   * get a todo based on it's id
   */
  getTodoById(id) {
    const todo = this.getTodos().find((todo) => todo.id === id);
    return todo !== undefined ? todo : undefined;
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

    // create the pencil square element
    let bibiPencilSquareElt = document.createElement("i");
    bibiPencilSquareElt.className = "bi bi-pencil-square";

    // create trash Icon element
    let trashIcon = document.createElement("i");
    trashIcon.className = "bi bi-trash";

    newTodo.id = todo.id;

    newTodo.appendChild(pElt);
    newTodo.appendChild(bibiCircleElt);
    newTodo.appendChild(bibiPencilSquareElt);
    newTodo.appendChild(checkedbibiCircleElt);
    newTodo.appendChild(trashIcon);

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
