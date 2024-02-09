Vue.createApp({
    data() {
      return {
        todos: [],
        newTodo: ''
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
            this.todos[index].done = !this.todos[index].done;
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
                headers: { 'content-Type':  'multipart/form-data'}
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
                    headers: { 'content-Type':  'application/json'}
                }
            )
            .then(response => {
                console.log('Todo removed', response.data);
                this.todos.splice(index, 1);
                
            })
            .catch(error => {
                console.error('Error removing todo', error);
            });
        }
    },

}).mount('#app')