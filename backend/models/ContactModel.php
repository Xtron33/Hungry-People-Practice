<?php

class ContactModel{

    private PDO $conn;

    public function __construct($db)
    {
        $this->conn = $db;
    }

    public function getAll(){
        $sql = 'SELECT * FROM contact';
        $contacts = [];

        $res = $this->conn->query($sql);

        while($row = $res->fetch(PDO::FETCH_ASSOC)){
            unset($row["password"]);
            $contacts[] = $row;
        }
        
        return json_encode($contacts);
    }
    public function getById($id){
        $sql = 'SELECT * FROM contact WHERE id = :id';
        $stmt = $this->conn->prepare($sql);

        $stmt->bindValue(":id",$id,PDO::PARAM_INT);

        $stmt->execute();

        return json_encode($stmt->fetch(PDO::FETCH_ASSOC));
    }

    public function getByUserId($user_id){
        $sql = 'SELECT * FROM contact WHERE user_id = :user_id';
        $stmt = $this->conn->prepare($sql);

        $stmt->bindValue(":user_id", $user_id, PDO::PARAM_INT);

        $stmt->execute();

        $res = $stmt->fetch(PDO::FETCH_ASSOC);
        unset($res["password"]);

        return $res;
    }

    public function create(array $data){
        $sql = "INSERT INTO contact (name, email, phone, message, answer, status, user_id)
        VALUES (:name, :email, :phone, :message, :answer, :status, :user_id)";
        
        $stmt = $this->conn->prepare($sql);

        $stmt->bindValue(":name", $data["name"], PDO::PARAM_STR);
        $stmt->bindValue(":email", $data["email"], PDO::PARAM_STR);
        $stmt->bindValue(":phone", $data["phone"], PDO::PARAM_STR);
        $stmt->bindValue(":message", $data["message"], PDO::PARAM_STR);
        $stmt->bindValue(":answer", $data["answer"], PDO::PARAM_STR);
        $stmt->bindValue(":status", $data["status"], PDO::PARAM_STR);
        $stmt->bindValue(":user_id", $data["user_id"], PDO::PARAM_STR);

        $stmt->execute();

        return $this->conn->lastInsertId();
    }
    public function update(array $data, $id){
        $sql = "UPDATE contact
                SET name = :name, email = :email, phone = :phone, message = :message, answer = :answer, status = :status
                WHERE id = :id";
                
        $stmt = $this->conn->prepare($sql);
        
        $stmt->bindValue(":name", $data["name"], PDO::PARAM_STR);
        $stmt->bindValue(":email", $data["email"], PDO::PARAM_STR);
        $stmt->bindValue(":phone", $data["phone"], PDO::PARAM_STR);
        $stmt->bindValue(":message", $data["message"], PDO::PARAM_STR);
        $stmt->bindValue(":answer", $data["answer"], PDO::PARAM_STR);
        $stmt->bindValue(":status", $data["status"], PDO::PARAM_STR);
        
        $stmt->bindValue(":id", $id, PDO::PARAM_INT);
        
        $stmt->execute();
        
        return $stmt->rowCount();
    }
    public function delete($id)
    {
        $sql = "DELETE FROM contact
                WHERE id = :id";
                
        $stmt = $this->conn->prepare($sql);
        
        $stmt->bindValue(":id", $id, PDO::PARAM_INT);
        
        $stmt->execute();
        
        return $stmt->rowCount();
    }
}