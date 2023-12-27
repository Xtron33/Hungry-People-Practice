<?php

require './models/EventModel.php';

class EventController
{
    private PDO $conn;
    private EventModel $model;
    private FileUploader $uploader;

    public function __construct($db, $fu)
    {
        $this->conn = $db;
        $this->model = new EventModel($this->conn);
        $this->uploader = $fu;
    }

    public function processRequest(string $method, ?string $id): void
    {
        switch($method){
            case "GET":
                if($id){
                    $res = $this->getEventById($id);
                    if($res != "false"){
                        echo $res;
                    }
                    else{
                        http_response_code(404);
                        echo json_encode([
                            "message" => "Event not found"
                        ]);
                    }
                }
                else{
                    $res = $this->getAllEvent();

                    echo $res;
                }
                break;
            case "POST":
                $id = $this->createEvent();
                http_response_code(201);
                echo json_encode([
                    "message" => "Event created",
                    "id" => $id
                ]);
                break;
            case "PATCH":
                $check = $res = $this->getEventById($id);
                if($check != "false"){
                    $res = $this->updateEvent($id);
                    echo json_encode([
                        "message" => "Event $id updated",
                        "rows" => $res
                    ]);
                }
                else{
                    http_response_code(404);
                    echo json_encode([
                        "message" => "Event not found"
                    ]);
                }
                break;
                case "DELETE":
                    $check = $res = $this->getEventById($id);
                    if($check != "false"){
                        $res = $this->deleteEvent($id);
                        echo json_encode([
                            "message" => "Event $id deleted",
                            "rows" => $res
                        ]);
                    }
                    else{
                        http_response_code(404);
                        echo json_encode([
                            "message" => "Event not found"
                        ]);
                    }
            }


                
    }

    private function getAllEvent()
    {
        return $this->model->getAll();
    }
    private function getEventById($id)
    {
        return $this->model->getById($id);
    }
    private function createEvent()
    {
        $data = $_POST;
        $data_f = $_FILES;


        $url = $this->uploader->upload($data_f["image"]);

        $data['image'] = $url;
        $id = $this->model->create($data);
        return $id;
    }
    private function updateEvent($id)
    {
        $data = (array) json_decode(file_get_contents("php://input"),true);
        $res = $this->model->update($data, $id);
        return $res;
    }
    private function deleteEvent($id)
    {
        $res = $this->model->delete($id);
        return $res;
    }
}