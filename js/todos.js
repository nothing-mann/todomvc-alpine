window.todos = function () {
	return {
		todos: [],
		filter: "all",
		message: "",
		get active() {
			return this.todos.filter((todo) => !todo.completed);
		},
		get completed() {
			return this.todos.filter((todo) => todo.completed);
		},
		get filteredTodos() {
			return {
				all: this.todos,
				active: this.active,
				completed: this.completed,
			}[this.filter];
		},
		addTodo() {
			this.todos.push({
				id: this.todos.length + 1,
				body: this.message,
				completed: false,
			});
			this.message = "";
		},
		deleteTodo(todo) {
			let position = this.todos.indexOf(todo);
			this.todos.splice(position, 1);
		},
		updateTodo(todo) {
			todo.editing = false;
			delete todo.cachedBody;
		},
		cancelUpdate(todo) {
			todo.body = todo.cachedBody;
			todo.editing = false;
		},
		toggleCompleteTodo(todo) {
			todo.completed = !todo.completed;
		},
	};
};
