<?php

require './models/StaticModel.php';

class StaticController
{
    private PDO $conn;
    private StaticModel $model;
    private FileUploader $uploader;

    public function __construct($db, $fu)
    {
        $this->conn = $db;
        $this->model = new StaticModel($this->conn);
        $this->uploader = $fu;
    }

    public function processRequest(string $method, ?string $id): void
    {

        switch($method){
            case "GET":
                if($id){
                    $res = $this->getStaticById($id);
                    if($res != "false"){
                        echo $res;
                    }
                    else{
                        http_response_code(404);
                        echo json_encode([
                            "message" => "Static not found"
                        ]);
                    }
                }
                else{
                    $res = $this->getAllStatic();

                    echo $res;
                }
                break;
            case "POST":
                if($id){
                    $check = $res = $this->getStaticById(intval($id));
                    if($check != "false"){
                        $res = $this->updateStatic($id);
                        echo json_encode([
                            "message" => "Static $id updated",
                            "rows" => $res
                        ]);
                    }
                    else{
                        http_response_code(404);
                        echo json_encode([
                            "message" => "Static not found"
                        ]);
                    }
                }
                else{
                    $id = $this->createStatic();
                    http_response_code(201);
                    echo json_encode([
                        "message" => "Static created",
                        "id" => $id
                    ]);
                }

                break;
                

            case "DELETE":
                    $check = $res = $this->getStaticById($id);
                    if($check != "false"){
                        $res = $this->deleteStatic($id);
                        echo json_encode([
                            "message" => "Static $id deleted",
                            "rows" => $res
                        ]);
                    }
                    else{
                        http_response_code(404);
                        echo json_encode([
                            "message" => "Static not found"
                        ]);
                    }
            }


                
    }

    private function getAllStatic()
    {
        return $this->model->getAll();
    }
    private function getStaticById($id)
    {
        return $this->model->getById($id);
    }
    private function createStatic()
    {
        $data = $_POST;
        $data_f = $_FILES;


        $url = $this->uploader->upload($data_f["image"]);

        $data['image'] = $url;
        $id = $this->model->create($data);
        return $id;
    }
    private function updateStatic($id)
    {
        $data = $_POST;
        $data_f = $_FILES;

        $url = $this->uploader->upload($data_f["image"]);

        $data['image'] = $url;
        $res = $this->model->update($data, $id);
        return $res;
    }
    private function deleteStatic($id)
    {
        $res = $this->model->delete($id);
        return $res;
    }
}