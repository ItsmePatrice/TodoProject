export default class DisplayManager {
  constructor() {}

  /**
   * get the array of todos
   */
  getTodos() {
    const todos = JSON.parse(localStorage.getItem(this.STORAGE_KEY_NOTES));
    return todos ? todos : [];
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
    const todos = this.getTodos() || [];
    todos.push(todo);
    localStorage.setItem(this.STORAGE_KEY_NOTES, JSON.stringify(todos));
  }

  /**
   * Delete a todo from the page based on it's id
   */
  deleteTodoById(id) {
    const todos = this.getTodos() || [];
    const updatedTodos = todos.filter((todo) => todo.id !== id);

    if (updatedTodos.length !== todos.length) {
      localStorage.setItem(
        this.STORAGE_KEY_NOTES,
        JSON.stringify(updatedTodos)
      );
    }
  }

  /**
   * Delete all the todos from the page
   */
  deleteAllTodos() {
    localStorage.clear();
  }
}
