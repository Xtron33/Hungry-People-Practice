<?php

require './models/AuthModel.php';

class AuthController{

    private PDO $conn;
    private AuthModel $model; 
    private string $seckey;
    
    
    public function __construct($db,$sc)
    {
        $this->conn = $db;
        $this->model = new AuthModel($db, $sc);
        $this->seckey = $sc;
    }

    public function processRequest(string $type): void
    {
        $date = new DateTimeImmutable();

        switch($type){
            case "login":{
                $res = $this->login();
                if(isset($res)){
                    http_response_code(201);
                    setcookie(
                        "token",
                        $res[1],
                        $date->modify('+12 hours')->getTimestamp(),
                        "/",
                        "localhost",
                        false,
                        true
                    );
                    echo json_encode(
                        $res[0]
                    );
                }
                else{
                    http_response_code(401);
                    setcookie(
                        "token",
                        "",
                        $date->modify('-12 hours')->getTimestamp(),
                        "/",
                        "localhost",
                        false,
                        true
                    );
                    echo json_encode([
                        "message" => "Denied"
                    ]);
                }
                break;
            }
            case "auth":{
                $res = $this->auth();

                if($res != null){
                    http_response_code(200);
                    $res = json_decode(json_encode($res), true);
                    $res = $res["data"];
                    echo json_encode(
                        $res
                    );
                }
                else{
                    http_response_code(401);
                    setcookie(
                        "token",
                        "",
                        $date->modify('-12 hours')->getTimestamp(),
                        "/",
                        "localhost",
                        false,
                        true
                    );
                    echo json_encode([
                        "message" => "Denied"
                    ]);
                }
                break;
            }
            case "logout":{
                http_response_code(200);
                setcookie(
                    "token",
                    "",
                    $date->modify('-12 hours')->getTimestamp(),
                    "/",
                    "localhost",
                    false,
                    true
                );
                echo json_encode(
                    [
                        "message" => "logout"
                    ]
                    );
                break;
            }
        }

    }

    private function login(){

        $data = (array) json_decode(file_get_contents("php://input"),true);

        return $this->model->login($data);

    }

    private function auth(){
        return $this->model->auth();
    }
}