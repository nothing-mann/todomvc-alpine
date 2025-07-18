window.todoStore = {
	todos: JSON.parse(localStorage.getItem("todo-store") || "[]"),
	save() {
		localStorage.setItem("todo-store", JSON.stringify(this.todos));
	},
};

window.todos = function () {
	return {
		...todoStore,
		// todos: [],
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
		get allComplete() {
			return this.todos.length === this.completed.length;
		},
		addTodo() {
			if (this.message.trim() === "") {
				return;
			}
			this.todos.push({
				id: Date.now(),
				body: this.message,
				completed: false,
			});
			this.save();
			this.message = "";
		},
		deleteTodo(todo) {
			let position = this.todos.indexOf(todo);
			this.todos.splice(position, 1);
			this.save();
		},
		updateTodo(todo) {
			todo.editing = false;
			delete todo.cachedBody;
			this.save();
		},
		cancelUpdate(todo) {
			todo.body = todo.cachedBody;
			todo.editing = false;
		},
		toggleCompleteTodo(todo) {
			todo.completed = !todo.completed;
			this.save();
		},

		toggleAllTodos() {
			if (this.allComplete) {
				this.todos.forEach((todo) => (todo.completed = false));
			} else {
				this.todos.forEach((todo) => (todo.completed = true));
			}
			this.save();
		},
		clearCompleted() {
			this.todos = this.active;
			this.save();
		},
	};
};
