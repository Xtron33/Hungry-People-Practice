<?php

declare(strict_types=1);


require 'Connection.php';
require 'createTables.php';
require 'FileUploader.php';
require './controller/BookingController.php';
require './controller/ContactController.php';
require './controller/EventController.php';
require './controller/SpecController.php';
require './controller/MenuController.php';
require './controller/StaticController.php';
require './controller/ImageController.php';
require './controller/UserController.php';
require './controller/AuthController.php';
require './controller/CategoryController.php';

$q = $_GET['q'];
$params = explode('/',$q);

$route = $params[0];
$id = $params[1] ?? null;
$name = $params[2] ?? null;

try {
    $db = Connection::get()->connect();

    $tableCreator = new createTables($db);
    
    // create tables and query the table from the
    // database
    $tables = $tableCreator->createTables()->getTables();

    $upl = new FileUploader();

    $bookingController = new BookingController($db);
    $contactController = new ContactController($db);
    $eventController = new EventController($db, $upl);
    $specController = new SpecController($db, $upl);
    $menuController = new MenuController($db);
    $staticController = new StaticController($db, $upl);
    $imageController = new ImageController($db, $upl);
    $userController = new UserController($db);
    $authController = new AuthController($db,"very_secret_key");
    $categoryController = new CategoryController($db);
    
    switch($route){
        case "booking":
            $bookingController->processRequest($_SERVER["REQUEST_METHOD"], $id, $name);
            break;
        case "contact":
            $contactController->processRequest($_SERVER["REQUEST_METHOD"], $id, $name);
            break;
        case "events":
            $eventController->processRequest($_SERVER["REQUEST_METHOD"], $id);
            break;
        case "image":
            $imageController->processRequest($_SERVER["REQUEST_METHOD"], $id);
            break;
        case "menu":
            $menuController->processRequest($_SERVER["REQUEST_METHOD"], $id);
            break;
        case "category":
            $categoryController->processRequest($_SERVER["REQUEST_METHOD"], $id);
            break;
        case "spec":
            $specController->processRequest($_SERVER["REQUEST_METHOD"], $id);
            break;
        case "static":
            $staticController->processRequest($_SERVER["REQUEST_METHOD"], $id);
            break;
        case "user":
            $userController->processRequest($_SERVER["REQUEST_METHOD"],$id,$name);
            break;    
        case "files":
            $upl->getImage($name);
            break;
        case "auth":
            $authController->processRequest($id);
            break;
        default:
            http_response_code(404);
    }

} catch (PDOException $e) {
    echo $e->getMessage();
}