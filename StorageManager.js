export default class StorageManager {
  constructor() {
    this.todos = [];
    this.STORAGE_KEY_NOTES = "todos";
  }

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
   * Replace storage items by the array of todos
   */
  setTodos(todosArray) {
    localStorage.setItem(this.STORAGE_KEY_NOTES, JSON.stringify(todosArray));
  }

  /**
   * Add a todo to the storage
   */
  addTodo(todo) {
    const todos = this.getTodos() || [];
    todos.push(todo);
    localStorage.setItem(this.STORAGE_KEY_NOTES, JSON.stringify(todos));
  }

  /**
   * Delete a todo based on it's ID
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
   * Delete all the todos in storage
   */
  deleteAllTodos() {
    localStorage.clear();
  }
}
