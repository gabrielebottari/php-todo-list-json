Vue.createApp({
    data() {
      return {
        todos: []
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
        }
    }
}).mount('#app')