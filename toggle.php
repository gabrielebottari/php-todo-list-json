<?php
    header("Access-Control-Allow-Origin: *");
    header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type');

    //Carica l'array esistente dei todos
    $todos = json_decode(file_get_contents('todos.json'), true);

    //Ottiene l'indice e il nuovo stato 'done' dal POST
    $index = $_POST['index'];
    $done = $_POST['done'];

    if ($done === 'true') {
        $done = true;
    } else {
        $done = false;
    }

    $todos[$index]['done'] = $done;

    file_put_contents('todos.json', json_encode($todos));

    echo json_encode(['success' => true]);
?>