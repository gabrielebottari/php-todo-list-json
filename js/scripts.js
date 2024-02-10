Vue.createApp({
    data() {
      return {
        todos: [],
        newTodo: '',
        editingIndex: null,
      }
    },
    mounted() {
        this.Todos();
    },
    methods: {
        Todos() {
            axios.get('http://localhost/Classe114/php-todo-list-json/api.php', {
                })
                .then(response => {
                    this.todos = response.data;
                })
                .catch(error => {
                    console.error('Error todos', error);
            });
        },
        toggleTodo(index) {
            const todo = this.todos[index];
            axios.post('http://localhost/Classe114/php-todo-list-json/toggle.php', {
                index: index,
                done: !todo.done
            }, {
                headers: { 'Content-Type': 'multipart/form-data' }
            })
            .then(() => {
                // Aggiorna direttamente lo stato del todo nell'array todos
                this.todos[index].done = !this.todos[index].done;
            })
            .catch(error => {
                console.error('Error updating todo', error);
            });
        },
        saveTodos() {

            const emptyTodo = this.newTodo.trim();
          
            if (!emptyTodo) {
                return;
            }

            axios.post('http://localhost/Classe114/php-todo-list-json/save.php',
            {
                text: this.newTodo,
                done: false
            },
            {
                headers: { 'content-Type': 'multipart/form-data' }
            })
            .then(response => {
                console.log('Todos saved', response.data);
                    
                this.todos.push(response.data.todo);
                this.newTodo = '';
            })
                .catch(error => {
                    console.error('Error saving todos', error);
            });
        },
        removeTodo(index) {
            axios.post('http://localhost/Classe114/php-todo-list-json/remove.php', 
                {
                    index: index,
                },
                {
                    headers: { 'content-Type': 'application/json'}
                }
            )
            .then(response => {
                console.log('Todo removed', response.data);
                console.log('Tipo di this.todos:', typeof this.todos);
                console.log('Contenuto di this.todos:', this.todos);
                console.log(Array.isArray(this.todos), this.todos);
                this.todos.splice(index, 1);
                
            })
            .catch(error => {
                console.error('Error removing todo', error);
            });
        },
        editTodo(index) {
            this.editingIndex = index;
        },
    
        finishEditing(index) {
            this.editingIndex = null;
           
            this.updateTodoBackend(index, this.todos[index].text);
        },
        updateTodoBackend(index, newText) {
            axios.post('http://localhost/Classe114/php-todo-list-json/edit.php', {
                index: index,
                text: newText
            }, {
                headers: { 'Content-Type': 'multipart/form-data' }
            })
            .then(response => {
                console.log('Todo updated successfully', response.data);
                
            })
            .catch(error => {
                console.error('Error updating todo', error);
            
            });
        },
    },

}).mount('#app')