<?php
    // Recupero il contenuto del file contenente i dati
    $file= file_get_contents('todos.json');

    // Trasformo la stringa in una struttura dati utilizzabile in PHP
    $todos = json_decode($file, true);

    // Dico al client che la risposta contiene un json
    header('Content-Type: application/json');

    // Rispondo con il json preso dal file
    echo json_encode($todos);
?>
