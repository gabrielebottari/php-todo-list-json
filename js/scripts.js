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
                    //Aggiungo il nuovo todo all'array todos per aggiornare l'interfaccia utente
                    this.todos.push(response.data.todo);
                    this.newTodo = '';
                })
                .catch(error => {
                    console.error('Error saving todos', error);
                });
        }
    },

}).mount('#app')