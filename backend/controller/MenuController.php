<?php

require './models/MenuModel.php';

class MenuController
{
    private PDO $conn;
    private MenuModel $model;

    public function __construct($db)
    {
        $this->conn = $db;
        $this->model = new MenuModel($this->conn);
    }

    public function processRequest(string $method, ?string $id): void
    {
        switch($method){
            case "GET":
                if($id){
                    $res = $this->getMenuById($id);
                    if($res != "false"){
                        echo $res;
                    }
                    else{
                        http_response_code(404);
                        echo json_encode([
                            "message" => "Menu not found"
                        ]);
                    }
                }
                else{
                    $res = $this->getAllMenu();

                    echo $res;
                }
                break;
            case "POST":
                $id = $this->createMenu();
                http_response_code(201);
                echo json_encode([
                    "message" => "Menu created",
                    "id" => $id
                ]);
                break;
            case "PATCH":
                $check = $res = $this->getMenuById($id);
                if($check != "false"){
                    $res = $this->updateMenu($id);
                    echo json_encode([
                        "message" => "Menu $id updated",
                        "rows" => $res
                    ]);
                }
                else{
                    http_response_code(404);
                    echo json_encode([
                        "message" => "Menu not found"
                    ]);
                }
                break;
                case "DELETE":
                    $check = $res = $this->getMenuById($id);
                    if($check != "false"){
                        $res = $this->deleteMenu($id);
                        echo json_encode([
                            "message" => "Menu $id deleted",
                            "rows" => $res
                        ]);
                    }
                    else{
                        http_response_code(404);
                        echo json_encode([
                            "message" => "Menu not found"
                        ]);
                    }
            }


                
    }

    private function getAllMenu()
    {
        return $this->model->getAll();
    }
    private function getMenuById($id)
    {
        return $this->model->getById($id);
    }
    private function createMenu()
    {
        $data = (array) json_decode(file_get_contents("php://input"),true);
        $id = $this->model->create($data);
        return $id;
    }
    private function updateMenu($id)
    {
        $data = (array) json_decode(file_get_contents("php://input"),true);
        $res = $this->model->update($data, $id);
        return $res;
    }
    private function deleteMenu($id)
    {
        $res = $this->model->delete($id);
        return $res;
    }
}