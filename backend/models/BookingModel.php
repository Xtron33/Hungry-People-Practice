<?php

class BookingModel{

    private PDO $conn;

    public function __construct($db)
    {
        $this->conn = $db;
    }

    public function getAll(){
        $sql = 'SELECT *,booking.id FROM booking';
        $bookings = [];

        $res = $this->conn->query($sql);

        while($row = $res->fetch(PDO::FETCH_ASSOC)){
            unset($row["password"]);
            $bookings[] = $row;
        }
        return json_encode($bookings);
    }
    public function getById($id){
        $sql = 'SELECT * FROM booking WHERE id = :id';
        $stmt = $this->conn->prepare($sql);

        $stmt->bindValue(":id",$id,PDO::PARAM_INT);

        $stmt->execute();

        return json_encode($stmt->fetch(PDO::FETCH_ASSOC));
    }

    public function getByUserId($user_id){
        $sql = 'SELECT *,booking.id FROM booking WHERE user_id = :user_id';
        $stmt = $this->conn->prepare($sql);

        $stmt->bindValue(":user_id", $user_id, PDO::PARAM_INT);

        $stmt->execute();

        $res = $stmt->fetch(PDO::FETCH_ASSOC);
        
        if($res !== false){
            unset($res["password"]);
        }
        

        return $res;
    }
    public function create(array $data){
        $sql = "INSERT INTO booking (name, email, phone, people, date, time, user_id)
        VALUES (:name, :email, :phone, :people, :date, :time, :user_id)";
        
        $stmt = $this->conn->prepare($sql);

        $stmt->bindValue(":name", $data["name"], PDO::PARAM_STR);
        $stmt->bindValue(":email", $data["email"], PDO::PARAM_STR);
        $stmt->bindValue(":phone", $data["phone"], PDO::PARAM_STR);
        $stmt->bindValue(":people", $data["people"], PDO::PARAM_INT);
        $stmt->bindValue(":date", $data["date"], PDO::PARAM_STR);
        $stmt->bindValue(":time", $data["time"], PDO::PARAM_STR);
        $stmt->bindValue(":user_id", $data["user_id"], PDO::PARAM_STR);

        $message = 'Hello, ' .$data["name"] .'! Your booking on ' .$data["date"] .' ' .$data["time"] .'for' .$data["people"] .'people(s)';

        @mail($data["email"], "Booking in Hungry People", $message);

        $stmt->execute();

        return $this->conn->lastInsertId();
    }
    public function update(array $data, $id){
        $sql = "UPDATE booking
                SET name = :name, email = :email, phone = :phone, people = :people, date = :date, time = :time
                WHERE id = :id";
                
        $stmt = $this->conn->prepare($sql);
        
        $stmt->bindValue(":name", $data["name"], PDO::PARAM_STR);
        $stmt->bindValue(":email", $data["email"], PDO::PARAM_STR);
        $stmt->bindValue(":phone", $data["phone"], PDO::PARAM_STR);
        $stmt->bindValue(":people", $data["people"], PDO::PARAM_INT);
        $stmt->bindValue(":date", $data["date"], PDO::PARAM_STR);
        $stmt->bindValue(":time", $data["time"], PDO::PARAM_STR);
        
        $stmt->bindValue(":id", $id, PDO::PARAM_INT);
        
        $stmt->execute();
        
        return $stmt->rowCount();
    }
    public function delete($id)
    {
        $sql = "DELETE FROM booking
                WHERE id = :id";
                
        $stmt = $this->conn->prepare($sql);
        
        $stmt->bindValue(":id", $id, PDO::PARAM_INT);
        
        $stmt->execute();
        
        return $stmt->rowCount();
    }
}