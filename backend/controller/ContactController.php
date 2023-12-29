<?php

require './models/ContactModel.php';

class ContactController
{
    private PDO $conn;
    private ContactModel $model;

    public function __construct($db)
    {
        $this->conn = $db;
        $this->model = new ContactModel($this->conn);
    }

    public function processRequest(string $method, ?string $id, ?string $user_id): void
    {
        switch($method){
            case "GET":
                if($id === "user"){
                    $res = $this->getContactByUserId($user_id);
                    if($res!==false){
                        http_response_code(200);
                        echo json_encode([
                            $res
                        ]
                        );
                    }
                    else{
                        http_response_code(200);
                        echo json_encode([
                        ]);
                    }
                }
                elseif($id){
                    $res = $this->getContactById($id);
                    if($res != "false"){
                        echo $res;
                    }
                    else{
                        http_response_code(404);
                        echo json_encode([
                            "message" => "Contact not found"
                        ]);
                    }
                }
                else{
                    $res = $this->getAllContact();

                    echo $res;
                }
                break;
            case "POST":
                $id = $this->createContact();
                http_response_code(201);
                echo json_encode([
                    "message" => "Contact created",
                    "id" => $id
                ]);
                break;
            case "PATCH":
                $check = $res = $this->getContactById($id);
                if($check != "false"){
                    $res = $this->updateContact($id);
                    echo json_encode([
                        "message" => "Contact $id updated",
                        "rows" => $res
                    ]);
                }
                else{
                    http_response_code(404);
                    echo json_encode([
                        "message" => "Contact not found"
                    ]);
                }
                break;
            case "DELETE":
                    $check = $res = $this->getContactById($id);
                    if($check != "false"){
                        $res = $this->deleteContact($id);
                        echo json_encode([
                            "message" => "Contact $id deleted",
                            "rows" => $res
                        ]);
                    }
                    else{
                        http_response_code(404);
                        echo json_encode([
                            "message" => "Contact not found"
                        ]);
                    }
            }


                
    }

    private function getAllContact()
    {
        return $this->model->getAll();
    }
    private function getContactById($id)
    {
        return $this->model->getById($id);
    }
    private function createContact()
    {
        $data = (array) json_decode(file_get_contents("php://input"),true);
        $id = $this->model->create($data);
        return $id;
    }
    private function updateContact($id)
    {
        $data = (array) json_decode(file_get_contents("php://input"),true);
        $res = $this->model->update($data, $id);
        return $res;
    }
    private function deleteContact($id)
    {
        $res = $this->model->delete($id);
        return $res;
    }
    private function getContactByUserId($user_id){
        $res = $this->model->getByUserId($user_id);
        return $res;
    }
}