<?php
    header("Access-Control-Allow-Origin: *");
    header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type');

    //Decodifica i dati JSON inviati da Vue.js
    $allTodoJson = file_get_contents('todos.json');
    $allTodos = json_decode($allTodoJson, true);

    //Aggiungo il nuovo task all'array di tutti i task
    $newTodo = [
        'text' => $_POST['text'],
        'done' => false
    ];
    $allTodos[] = $newTodo;

    //Codifica l'array aggiornato e scrive nel file JSON
    $updatedTodosJson = json_encode($allTodos);
    file_put_contents('todos.json', $updatedTodosJson);

    echo json_encode(['todo' => $newTodo]);
?>