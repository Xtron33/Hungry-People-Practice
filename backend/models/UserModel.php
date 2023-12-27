<?php

class UserModel{

    private PDO $conn;

    public function __construct($db)
    {
        $this->conn = $db;
    }

    public function getAll(){
        $sql = 'SELECT * FROM users';
        $users = [];

        $res = $this->conn->query($sql);

        while($row = $res->fetch(PDO::FETCH_ASSOC)){
            unset($row["password"]);
            $users[] = $row;
        }

        return json_encode($users);
    }
    public function getById($id){
        $sql = 'SELECT * FROM users WHERE id = :id';
        $stmt = $this->conn->prepare($sql);

        $stmt->bindValue(":id",$id,PDO::PARAM_INT);

        $stmt->execute();
        $res = $stmt->fetch(PDO::FETCH_ASSOC);
        unset($res["password"]);

        return json_encode($res);
    }
    public function getByEmail($email){
        $sql = 'SELECT * FROM users WHERE email = :email';
        $stmt = $this->conn->prepare($sql);
        $stmt->bindValue(":email",$email,PDO::PARAM_STR);
        
        $stmt->execute();

        $res = $stmt->fetch(PDO::FETCH_ASSOC);
        if($res != false){
            unset($res["password"]);
        }
        

        return json_encode($res);
    }
    public function create(array $data){
        $sql = "INSERT INTO users (email, password, role)
        VALUES (:email, :password, :role)";

        $options = [
            'cost' => 13
        ];

        $passwordHash = password_hash($data["password"], PASSWORD_BCRYPT, $options);
        
        $stmt = $this->conn->prepare($sql);

        $stmt->bindValue(":email", $data["email"], PDO::PARAM_STR);
        $stmt->bindValue(":password", $passwordHash, PDO::PARAM_STR);
        $stmt->bindValue(":role", $data["role"], PDO::PARAM_STR);
        try{
            $stmt->execute();
            return $this->conn->lastInsertId();
        }
        catch(PDOException $e) {
            return -1;
        }
        

        
    }
    public function update(array $data, $id){
        $sql = "UPDATE users
                SET name = :name, email = :email, phone = :phone, people = :people, date = :date, time = :time
                WHERE id = :id";
                
        $stmt = $this->conn->prepare($sql);

        $passwordHash = password_hash($data["password"], PASSWORD_BCRYPT, $options);
        
        $stmt->bindValue(":email", $data["email"], PDO::PARAM_STR);
        $stmt->bindValue(":password", $passwordHash, PDO::PARAM_STR);
        $stmt->bindValue(":role", $data["role"], PDO::PARAM_STR);
        
        $stmt->bindValue(":id", $id, PDO::PARAM_INT);
        
        $stmt->execute();
        
        return $stmt->rowCount();
    }
    public function delete($id)
    {
        $sql = "DELETE FROM users
                WHERE id = :id";
                
        $stmt = $this->conn->prepare($sql);
        
        $stmt->bindValue(":id", $id, PDO::PARAM_INT);
        
        $stmt->execute();
        
        return $stmt->rowCount();
    }
}