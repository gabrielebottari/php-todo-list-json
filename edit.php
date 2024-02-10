<?php
    header("Access-Control-Allow-Origin: *");

    //Carica l'attuale lista di todo
    $todos = json_decode(file_get_contents('todos.json'), true);

    //Prende l'indice e il nuovo testo dal POST
    $index = $_POST['index'];
    $newText = $_POST['text'];

    //Aggiorna il testo del todo specificato
    $todos[$index]['text'] = $newText;

    //Salva la lista aggiornata di todo nel file
    file_put_contents('todos.json', json_encode($todos));

    echo json_encode(['success' => true, 'message' => 'Todo updated successfully']);
?>