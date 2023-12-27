<?php

class SpecModel{

    private PDO $conn;

    public function __construct($db)
    {
        $this->conn = $db;
    }

    public function getAll(){
        $sql = 'SELECT * FROM spec';
        $specs = [];

        $res = $this->conn->query($sql);

        while($row = $res->fetch(PDO::FETCH_ASSOC)){

            $specs[] = $row;
        }

        return json_encode($specs);
    }
    public function getById($id){
        $sql = 'SELECT * FROM spec WHERE id = :id';
        $stmt = $this->conn->prepare($sql);

        $stmt->bindValue(":id",$id,PDO::PARAM_INT);

        $stmt->execute();

        return json_encode($stmt->fetch(PDO::FETCH_ASSOC));
    }
    public function create(array $data){
        $sql = "INSERT INTO spec (image)
        VALUES (:image)";
        
        $stmt = $this->conn->prepare($sql);

        $stmt->bindValue(":image", $data["image"], PDO::PARAM_STR);

        $stmt->execute();

        return $this->conn->lastInsertId();
    }
    public function update(array $data, $id){
        $sql = "UPDATE spec
                SET image = :image
                WHERE id = :id";
                
        $stmt = $this->conn->prepare($sql);

        $stmt->bindValue(":image", $data["image"], PDO::PARAM_STR);
        
        $stmt->bindValue(":id", $id, PDO::PARAM_INT);
        
        $stmt->execute();
        
        return $stmt->rowCount();
    }
    public function delete($id)
    {
        $sql = "DELETE FROM spec
                WHERE id = :id";
                
        $stmt = $this->conn->prepare($sql);
        
        $stmt->bindValue(":id", $id, PDO::PARAM_INT);
        
        $stmt->execute();
        
        return $stmt->rowCount();
    }
}