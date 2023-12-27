<?php

class StaticModel{

    private PDO $conn;

    public function __construct($db)
    {
        $this->conn = $db;
    }

    public function getAll(){
        $sql = 'SELECT * FROM static';
        $statics = [];

        $res = $this->conn->query($sql);

        while($row = $res->fetch(PDO::FETCH_ASSOC)){

            $statics[] = $row;
        }

        return json_encode($statics);
    }
    public function getById($id){
        $sql = 'SELECT * FROM static WHERE id = :id';
        $stmt = $this->conn->prepare($sql);
        $stmt->bindValue(":id",$id,PDO::PARAM_INT);

        $stmt->execute();

        return json_encode($stmt->fetch(PDO::FETCH_ASSOC));
    }
    public function create(array $data){
        $sql = "INSERT INTO static (title, subtitle, image)
        VALUES (:title, :subtitle, :image)";
        
        $stmt = $this->conn->prepare($sql);

        $stmt->bindValue(":title", $data["title"], PDO::PARAM_STR);
        $stmt->bindValue(":subtitle", $data["subtitle"], PDO::PARAM_STR);
        $stmt->bindValue(":image", $data["image"], PDO::PARAM_STR);

        $stmt->execute();

        return $this->conn->lastInsertId();
    }
    public function update(array $data, $id){
        $sql = "UPDATE static
                SET title = :title, subtitle = :subtitle, image = :image
                WHERE id = :id";
                
        $stmt = $this->conn->prepare($sql);

        $stmt->bindValue(":title", $data["title"], PDO::PARAM_STR);
        $stmt->bindValue(":subtitle", $data["subtitle"], PDO::PARAM_STR);
        $stmt->bindValue(":image", $data["image"], PDO::PARAM_STR);
        
        $stmt->bindValue(":id", intval($id), PDO::PARAM_INT);
        
        $stmt->execute();
        
        return $stmt->rowCount();
    }
    public function delete($id)
    {
        $sql = "DELETE FROM static
                WHERE id = :id";
                
        $stmt = $this->conn->prepare($sql);
        
        $stmt->bindValue(":id", $id, PDO::PARAM_INT);
        
        $stmt->execute();
        
        return $stmt->rowCount();
    }
}