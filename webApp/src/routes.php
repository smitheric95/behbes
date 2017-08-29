<?php
// Routes

$app->get('/Home[/{name}]', function ($request, $response, $args) {
    // Sample log message
    $this->logger->info("Slim-Skeleton '/' route");

    // Render index view
    return $this->renderer->render($response, 'index.html', $args);
});

$app->get('/getData', function ($request, $response, $args) {
    // Sample log message
    $arr = array ('a'=>"eseghrrnehreh",'b'=>2,'c'=>3,'d'=>4,'e'=>5);

    return json_encode($arr);
});