<?php

require './models/CategoryModel.php';

class CategoryController
{
    private PDO $conn;
    private CategoryModel $model;

    public function __construct($db)
    {
        $this->conn = $db;
        $this->model = new CategoryModel($this->conn);
    }

    public function processRequest(string $method, ?string $id): void
    {
        switch($method){
            case "GET":
                if($id){
                    $res = $this->getCategoryById($id);
                    if($res != "false"){
                        echo $res;
                    }
                    else{
                        http_response_code(404);
                        echo json_encode([
                            "message" => "Category not found"
                        ]);
                    }
                }
                else{
                    $res = $this->getAllCategory();

                    echo $res;
                }
                break;
            case "POST":
                $id = $this->createCategory();
                http_response_code(201);
                echo json_encode([
                    "message" => "Category created",
                    "id" => $id
                ]);
                break;
            case "PATCH":
                $check = $res = $this->getCategoryById($id);
                if($check != "false"){
                    $res = $this->updateCategory($id);
                    echo json_encode([
                        "message" => "Category $id updated",
                        "rows" => $res
                    ]);
                }
                else{
                    http_response_code(404);
                    echo json_encode([
                        "message" => "Category not found"
                    ]);
                }
                break;
            case "DELETE":
                    $check = $res = $this->getCategoryById($id);
                    if($check != "false"){
                        $res = $this->deleteCategory($id);
                        echo json_encode([
                            "message" => "Category $id deleted",
                            "rows" => $res
                        ]);
                    }
                    else{
                        http_response_code(404);
                        echo json_encode([
                            "message" => "Category not found"
                        ]);
                    }
            }


                
    }

    private function getAllCategory()
    {
        return $this->model->getAll();
    }
    private function getCategoryById($id)
    {
        return $this->model->getById($id);
    }
    private function createCategory()
    {
        $data = (array) json_decode(file_get_contents("php://input"),true);
        $id = $this->model->create($data);
        return $id;
    }
    private function updateCategory($id)
    {
        $data = (array) json_decode(file_get_contents("php://input"),true);
        $res = $this->model->update($data, $id);
        return $res;
    }
    private function deleteCategory($id)
    {
        $res = $this->model->delete($id);
        return $res;
    }
}