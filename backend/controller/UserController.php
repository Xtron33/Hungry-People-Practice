<?php

require './models/UserModel.php';

class UserController
{
    private PDO $conn;
    private UserModel $model;

    public function __construct($db)
    {
        $this->conn = $db;
        $this->model = new UserModel($this->conn);
    }

    public function processRequest(string $method, ?string $id, ?string $email): void
    {
        switch($method){
            case "GET":
                if($id){
                    if($id === "email"){
                        $res= $this->getUserByEmail($email);
                        if($res != "false"){
                            echo $res;
                        }
                        else{
                            http_response_code(404);
                            echo json_encode([
                                "message" => "User not found"
                            ]);
                        }
                    }
                    else{
                        $res = $this->getUserById($id);
                        if($res != "false"){
                            echo $res;
                        }
                        else{
                            http_response_code(404);
                            echo json_encode([
                                "message" => "User not found"
                            ]);
                        }
                    }

                }
                else{
                    $res = $this->getAllUser();

                    echo $res;
                }
                break;
            case "POST":
                $id = $this->createUser();
                if($id != -1){
                    http_response_code(201);
                    echo json_encode([
                        "message" => "User created",
                        "id" => $id
                    ]);
                }
                else{
                    http_response_code(406);
                    echo json_encode([
                        "message" => "User with this email already exist",
                        "id" => $id
                    ]);
                }

                break;
            case "PATCH":
                $check = $res = $this->getUserById($id);
                if($check != "false"){
                    $res = $this->updateUser($id);
                    echo json_encode([
                        "message" => "User $id updated",
                        "rows" => $res
                    ]);
                }
                else{
                    http_response_code(404);
                    echo json_encode([
                        "message" => "User not found"
                    ]);
                }
                break;
                case "DELETE":
                    $check = $res = $this->getUserById($id);
                    if($check != "false"){
                        $res = $this->deleteUser($id);
                        echo json_encode([
                            "message" => "User $id deleted",
                            "rows" => $res
                        ]);
                    }
                    else{
                        http_response_code(404);
                        echo json_encode([
                            "message" => "User not found"
                        ]);
                    }
            }


                
    }

    private function getAllUser()
    {
        return $this->model->getAll();
    }
    private function getUserById($id)
    {
        return $this->model->getById($id);
    }
    private function getUserByEmail($email){
        return $this->model->getByEmail($email);
    }
    private function createUser()
    {
        $data = (array) json_decode(file_get_contents("php://input"),true);
        $id = $this->model->create($data);
        return $id;
    }
    private function updateUser($id)
    {
        $data = (array) json_decode(file_get_contents("php://input"),true);
        $res = $this->model->update($data, $id);
        return $res;
    }
    private function deleteUser($id)
    {
        $res = $this->model->delete($id);
        return $res;
    }
}