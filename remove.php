<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: POST, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization");

    $todos = json_decode(file_get_contents('todos.json'), true);
    // Legge i dati grezzi inviati nel corpo della richiesta POST e li decodifica da JSON in un array PHP.
    $data = json_decode(file_get_contents('php://input'), true);

    // Controlla se nel corpo della richiesta è stato fornito l'indice del todo da rimuovere.
    if (isset($data['index'])) {
        
        array_splice($todos, $data['index'], 1);
        
        file_put_contents('todos.json', json_encode($todos));
    } else {
        
        echo json_encode(['error' => 'Index not provided']);
    }
?>