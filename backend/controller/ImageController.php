<?php

require './models/ImageModel.php';

class ImageController
{
    private PDO $conn;
    private ImageModel $model;
    private FileUploader $uploader;

    public function __construct($db,$fu)
    {
        $this->conn = $db;
        $this->model = new ImageModel($this->conn);
        $this->uploader = $fu;
    }

    public function processRequest(string $method, ?string $id): void
    {
        switch($method){
            case "GET":
                if($id){
                    $res = $this->getImageById($id);
                    if($res != "false"){
                        echo $res;
                    }
                    else{
                        http_response_code(404);
                        echo json_encode([
                            "message" => "Image not found"
                        ]);
                    }
                }
                else{
                    $res = $this->getAllImage();

                    echo $res;
                }
                break;
            case "POST":
                $id = $this->createImage();
                http_response_code(201);
                echo json_encode([
                    "message" => "Image created",
                    "id" => $id
                ]);
                break;
            case "PATCH":
                $check = $res = $this->getImageById($id);
                if($check != "false"){
                    $res = $this->updateImage($id);
                    echo json_encode([
                        "message" => "Image $id updated",
                        "rows" => $res
                    ]);
                }
                else{
                    http_response_code(404);
                    echo json_encode([
                        "message" => "Image not found"
                    ]);
                }
                break;
                case "DELETE":
                    $check = $res = $this->getImageById($id);
                    if($check != "false"){
                        $res = $this->deleteImage($id);
                        echo json_encode([
                            "message" => "Image $id deleted",
                            "rows" => $res
                        ]);
                    }
                    else{
                        http_response_code(404);
                        echo json_encode([
                            "message" => "Image not found"
                        ]);
                    }
            }


                
    }

    private function getAllImage()
    {
        return $this->model->getAll();
    }
    private function getImageById($id)
    {
        return $this->model->getById($id);
    }
    private function createImage()
    {
        $data = $_POST;
        $data_f = $_FILES;


        $url = $this->uploader->upload($data_f["image"]);

        $data['image'] = $url;
        $id = $this->model->create($data);
        return $id;
    }
    private function updateImage($id)
    {
        $data = (array) json_decode(file_get_contents("php://input"),true);
        $res = $this->model->update($data, $id);
        return $res;
    }
    private function deleteImage($id)
    {
        $res = $this->model->delete($id);
        return $res;
    }
}