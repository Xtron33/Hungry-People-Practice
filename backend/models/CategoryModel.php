<?php

class CategoryModel{

    private PDO $conn;

    public function __construct($db)
    {
        $this->conn = $db;
    }

    public function getAll(){
        $sql = 'SELECT * FROM category';
        $menu = [];

        $res = $this->conn->query($sql);

        while($row = $res->fetch(PDO::FETCH_ASSOC)){

            $menu[] = $row;
        }

        return json_encode($menu);
    }
    public function getById($id){
        $sql = 'SELECT * FROM category WHERE id = :id';
        $stmt = $this->conn->prepare($sql);

        $stmt->bindValue(":id",$id,PDO::PARAM_INT);

        $stmt->execute();

        return json_encode($stmt->fetch(PDO::FETCH_ASSOC));
    }
    public function create(array $data){
        $sql = "INSERT INTO category (name)
        VALUES (:name)";
        
        $stmt = $this->conn->prepare($sql);

        $stmt->bindValue(":name", $data["name"], PDO::PARAM_STR);

        $stmt->execute();

        return $this->conn->lastInsertId();
    }
    public function update(array $data, $id){
        $sql = "UPDATE category
                SET name = :name
                WHERE id = :id";
                
        $stmt = $this->conn->prepare($sql);
        
        $stmt->bindValue(":name", $data["name"], PDO::PARAM_STR);
        
        $stmt->bindValue(":id", $id, PDO::PARAM_INT);
        
        $stmt->execute();
        
        return $stmt->rowCount();
    }
    public function delete($id)
    {
        $sql = "DELETE FROM category
                WHERE id = :id";
                
        $stmt = $this->conn->prepare($sql);
        
        $stmt->bindValue(":id", $id, PDO::PARAM_INT);
        
        $stmt->execute();
        
        return $stmt->rowCount();
    }
}