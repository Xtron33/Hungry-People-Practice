<?php

require './models/BookingModel.php';

class BookingController
{
    private PDO $conn;
    private BookingModel $model;

    public function __construct($db)
    {
        $this->conn = $db;
        $this->model = new BookingModel($this->conn);
    }

    public function processRequest(string $method, ?string $id, ?string $user_id): void
    {
        switch($method){
            case "GET":
                if($id === "user"){
                    $res = $this->getBookingByUserId($user_id);
                    if($res!==false){
                        http_response_code(200);
                        echo json_encode([
                            $res
                        ]);
                    }
                    else{
                        http_response_code(401);
                        echo json_encode([
                            "message" => "not found"
                        ]);
                    }
                }
                elseif($id){
                    $res = $this->getBookingById($id);
                    if($res != "false"){
                        echo $res;
                    }
                    else{
                        http_response_code(404);
                        echo json_encode([
                            "message" => "Booking not found"
                        ]);
                    }
                }
                else{
                    $res = $this->getAllBooking();

                    echo $res;
                }
                break;
            case "POST":
                $id = $this->createBooking();
                http_response_code(201);
                echo json_encode([
                    "message" => "Booking created",
                    "id" => $id
                ]);
                break;
            case "PATCH":
                $check = $res = $this->getBookingById($id);
                if($check != "false"){
                    $res = $this->updateBooking($id);
                    echo json_encode([
                        "message" => "Booking $id updated",
                        "rows" => $res
                    ]);
                }
                else{
                    http_response_code(404);
                    echo json_encode([
                        "message" => "Booking not found"
                    ]);
                }
                break;
            case "DELETE":
                    $check = $res = $this->getBookingById($id);
                    if($check != "false"){
                        $res = $this->deleteBooking($id);
                        echo json_encode([
                            "message" => "Booking $id deleted",
                            "rows" => $res
                        ]);
                    }
                    else{
                        http_response_code(404);
                        echo json_encode([
                            "message" => "Booking not found"
                        ]);
                    }
            }


                
    }

    private function getAllBooking()
    {
        return $this->model->getAll();
    }
    private function getBookingById($id)
    {
        return $this->model->getById($id);
    }
    private function createBooking()
    {
        $data = (array) json_decode(file_get_contents("php://input"),true);
        $id = $this->model->create($data);
        return $id;
    }
    private function updateBooking($id)
    {
        $data = (array) json_decode(file_get_contents("php://input"),true);
        $res = $this->model->update($data, $id);
        return $res;
    }
    private function deleteBooking($id)
    {
        $res = $this->model->delete($id);
        return $res;
    }
    private function getBookingByUserId($user_id){
        $res = $this->model->getByUserId($user_id);
        return $res;
    }
}