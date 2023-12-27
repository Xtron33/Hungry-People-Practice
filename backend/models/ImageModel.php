<?php

class ImageModel{

    private PDO $conn;

    public function __construct($db)
    {
        $this->conn = $db;
    }

    public function getAll(){
        $sql = 'SELECT * FROM image';
        $image = [];

        $res = $this->conn->query($sql);

        while($row = $res->fetch(PDO::FETCH_ASSOC)){

            $image[] = $row;
        }

        return json_encode($image);
    }
    public function getById($id){
        $sql = 'SELECT * FROM image WHERE id = :id';
        $stmt = $this->conn->prepare($sql);

        $stmt->bindValue(":id",$id,PDO::PARAM_INT);

        $stmt->execute();

        return json_encode($stmt->fetch(PDO::FETCH_ASSOC));
    }
    public function create(array $data){
        $sql = "INSERT INTO image (image)
        VALUES (:image)";
        
        $stmt = $this->conn->prepare($sql);

        $stmt->bindValue(":image", $data["image"], PDO::PARAM_STR);

        $stmt->execute();

        return $this->conn->lastInsertId();
    }
    public function update(array $data, $id){
        $sql = "UPDATE image
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
        $sql = "DELETE FROM image
                WHERE id = :id";
                
        $stmt = $this->conn->prepare($sql);
        
        $stmt->bindValue(":id", $id, PDO::PARAM_INT);
        
        $stmt->execute();
        
        return $stmt->rowCount();
    }
}