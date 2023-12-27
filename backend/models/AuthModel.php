<?php

require 'vendor/autoload.php';
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class AuthModel{

    

    private PDO $conn;
    private string $seckey;

    public function __construct($db,$seckey)
    {
        $this->conn = $db;
        $this->seckey = $seckey;
    }

    public function login($data){

        $sql = 'SELECT * FROM users WHERE email = :email';

        $stmt = $this->conn->prepare($sql);

        $stmt->bindValue(":email",$data["email"],PDO::PARAM_INT);

        $stmt->execute();

        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if(isset($user) && password_verify($data["password"], $user["password"] ?? "")){
            $date = new DateTimeImmutable();

            $payload = [
                'iat' => $date->getTimestamp(),
                'iss' => "localhost",
                'nbf' => $date->getTimestamp(),
                'exp' => $date->modify('+24 hours')->getTimestamp(),
                'data'=>[
                    'id' => $user["id"],
                    'email' => $user["email"],
                    'role' => $user["role"]
                ]

            ];

            $token = JWT::encode($payload, $this->seckey, 'HS256');
            unset($user["password"]);

            return [$user,$token];
        }

        
    }

    public function auth(){
        $token = $_COOKIE["token"] ?? "";

        try {
            $decode = JWT::decode($token, new Key($this->seckey, 'HS256'));
        } catch (Exception $e) {
            $decode = null;
        }
        return $decode;
    }
}