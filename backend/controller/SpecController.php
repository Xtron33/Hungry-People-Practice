<?php

require './models/SpecModel.php';

class SpecController
{
    private PDO $conn;
    private SpecModel $model;
    private FileUploader $uploader;

    public function __construct($db, $fu)
    {
        $this->conn = $db;
        $this->model = new SpecModel($this->conn);
        $this->uploader = $fu;
    }

    public function processRequest(string $method, ?string $id): void
    {
        switch($method){
            case "GET":
                if($id){
                    $res = $this->getSpecById($id);
                    if($res != "false"){
                        echo $res;
                    }
                    else{
                        http_response_code(404);
                        echo json_encode([
                            "message" => "Spec not found"
                        ]);
                    }
                }
                else{
                    $res = $this->getAllSpec();

                    echo $res;
                }
                break;
            case "POST":
                $id = $this->createSpec();
                http_response_code(201);
                echo json_encode([
                    "message" => "Spec created",
                    "id" => $id
                ]);
                break;
            case "PATCH":
                $check = $res = $this->getSpecById($id);
                if($check != "false"){
                    $res = $this->updateSpec($id);
                    echo json_encode([
                        "message" => "Spec $id updated",
                        "rows" => $res
                    ]);
                }
                else{
                    http_response_code(404);
                    echo json_encode([
                        "message" => "Spec not found"
                    ]);
                }
                break;
                case "DELETE":
                    $check = $res = $this->getSpecById($id);
                    if($check != "false"){
                        $res = $this->deleteSpec($id);
                        echo json_encode([
                            "message" => "Spec $id deleted",
                            "rows" => $res
                        ]);
                    }
                    else{
                        http_response_code(404);
                        echo json_encode([
                            "message" => "Spec not found"
                        ]);
                    }
            }


                
    }

    private function getAllSpec()
    {
        return $this->model->getAll();
    }
    private function getSpecById($id)
    {
        return $this->model->getById($id);
    }
    private function createSpec()
    {
        $data = $_POST;
        $data_f = $_FILES;


        $url = $this->uploader->upload($data_f["image"]);

        $data['image'] = $url;
        $id = $this->model->create($data);
        return $id;
    }
    private function updateSpec($id)
    {
        $data = (array) json_decode(file_get_contents("php://input"),true);
        $res = $this->model->update($data, $id);
        return $res;
    }
    private function deleteSpec($id)
    {
        $res = $this->model->delete($id);
        return $res;
    }
}