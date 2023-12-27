<?php

class MenuModel{

    private PDO $conn;

    public function __construct($db)
    {
        $this->conn = $db;
    }

    public function getAll(){
        $sql = 'SELECT *, menu.id FROM menu INNER JOIN category ON category.id = menu.category_id';
        $menu = [];

        $res = $this->conn->query($sql);

        while($row = $res->fetch(PDO::FETCH_ASSOC)){

            $menu[] = $row;
        }

        return json_encode($menu);
    }
    public function getById($id){
        $sql = 'SELECT *, menu.id FROM menu INNER JOIN category ON category.id = menu.category_id WHERE menu.id = :id';
        $stmt = $this->conn->prepare($sql);

        $stmt->bindValue(":id",$id,PDO::PARAM_INT);

        $stmt->execute();

        return json_encode($stmt->fetch(PDO::FETCH_ASSOC));
    }
    public function create(array $data){
        $sql = "INSERT INTO menu (title, subtitle, price, is_main, category_id)
        VALUES (:title, :subtitle, :price, :is_main, :category_id)";
        
        $stmt = $this->conn->prepare($sql);

        $stmt->bindValue(":title", $data["title"], PDO::PARAM_STR);
        $stmt->bindValue(":subtitle", $data["subtitle"], PDO::PARAM_STR);
        $stmt->bindValue(":price", $data["price"], PDO::PARAM_INT);
        $stmt->bindValue(":category_id", $data["category_id"], PDO::PARAM_STR);
        $stmt->bindValue(":is_main", $data["is_main"], PDO::PARAM_BOOL);

        $stmt->execute();

        return $this->conn->lastInsertId();
    }
    public function update(array $data, $id){
        $sql = "UPDATE menu
                SET title = :title, subtitle = :subtitle, price = :price, is_main = :is_main, category_id = :category_id
                WHERE id = :id";
                
        $stmt = $this->conn->prepare($sql);
        
        $stmt->bindValue(":title", $data["title"], PDO::PARAM_STR);
        $stmt->bindValue(":subtitle", $data["subtitle"], PDO::PARAM_STR);
        $stmt->bindValue(":price", $data["price"], PDO::PARAM_INT);
        $stmt->bindValue(":category_id", $data["category_id"], PDO::PARAM_STR);
        $stmt->bindValue(":is_main", $data["is_main"], PDO::PARAM_BOOL);
        
        $stmt->bindValue(":id", $id, PDO::PARAM_INT);
        
        $stmt->execute();
        
        return $stmt->rowCount();
    }
    public function delete($id)
    {
        $sql = "DELETE FROM menu
                WHERE id = :id";
                
        $stmt = $this->conn->prepare($sql);
        
        $stmt->bindValue(":id", $id, PDO::PARAM_INT);
        
        $stmt->execute();
        
        return $stmt->rowCount();
    }
}