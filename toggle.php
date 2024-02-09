<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: POST, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type");

    $data = json_decode(file_get_contents('php://input'), true);

    if (isset($data['index'], $data['done'])) {
        $todos = json_decode(file_get_contents('todos.json'), true);
        
        // Controlla se l'indice esiste
        if (isset($todos[$data['index']])) {
            // Aggiorna lo stato 'done' del todo
            $todos[$data['index']]['done'] = $data['done'];
            file_put_contents('todos.json', json_encode($todos));
            
        } else {
            echo json_encode(['error' => 'Todo not found']);
        }
    } else {
        echo json_encode(['error' => 'Invalid request']);
    }
?>