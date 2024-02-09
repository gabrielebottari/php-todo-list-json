<?php
// Decodifica i dati JSON inviati da Vue.js
$allTodoJson = file_get_contents('todos.json');
$allTodos = json_decode($allTodoJson, true);

// Aggiungi il nuovo task all'array di tutti i task
$newTodo = [
    'text' => $_POST['text'],
    'done' => false
];
$allTodos[] = $newTodo;

// Codifica l'array aggiornato e scrivi nel file JSON
$updatedTodosJson = json_encode($allTodos);
file_put_contents('todos.json', $updatedTodosJson);

header("Access-Control-Allow-Origin: *");

// Rispondi con il nuovo todo aggiunto
echo json_encode(['todo' => $newTodo]);
?>