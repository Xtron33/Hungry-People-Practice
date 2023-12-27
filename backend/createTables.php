<?php

class createTables {
    private $db;

    public function __construct($db) {
        $this->db = $db;
    }

    public function createTables(){
        $sqlList = ["CREATE TABLE IF NOT EXISTS static (
            id serial PRIMARY KEY,
            title TEXT,
            subtitle TEXT,
            image TEXT);",
        "CREATE TABLE IF NOT EXISTS booking (
            id serial PRIMARY KEY,
            name TEXT,
            email TEXT,
            phone TEXT,
            people INTEGER,
            date DATE,
            time TIME,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
            user_id INTEGER references users(id) ON DELETE CASCADE);",
        "CREATE TABLE IF NOT EXISTS spec (
                id serial PRIMARY KEY,
                image TEXT);",
        "CREATE TABLE IF NOT EXISTS category (
            id serial PRIMARY KEY,
            name TEXT NOT NULL UNIQUE);",
        "CREATE TABLE IF NOT EXISTS menu (
            id serial PRIMARY KEY,
            title TEXT,
            subtitle TEXT,
            price TEXT,
            is_Main BOOLEAN,
            category_id INTEGER references category(id) ON DELETE CASCADE);",
        "CREATE TABLE IF NOT EXISTS events (
            id serial PRIMARY KEY,
            title TEXT,
            subtitle TEXT,
            image TEXT);",
        "CREATE TABLE IF NOT EXISTS contact (
            id serial PRIMARY KEY,
            name TEXT,
            email TEXT,
            phone TEXT,
            message TEXT,
            status TEXT,
            answer TEXT,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
            user_id INTEGER references users(id) ON DELETE CASCADE);",
        "CREATE TABLE IF NOT EXISTS users (
            id serial PRIMARY KEY,
            email TEXT NOT NULL UNIQUE,
            password TEXT NOT NULL,
            role TEXT NOT NULL
        );",  
        ];

        foreach ($sqlList as $sql) {
            $this->db->exec($sql);
        }

        return $this;
    }
    public function getTables() {
        $stmt = $this->db->query("SELECT table_name 
                                   FROM information_schema.tables 
                                   WHERE table_schema= 'public' 
                                        AND table_type='BASE TABLE'
                                   ORDER BY table_name");
        $tableList = [];
        while ($row = $stmt->fetch(\PDO::FETCH_ASSOC)) {
            $tableList[] = $row['table_name'];
        }

        return $tableList;
    }
}

# created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP