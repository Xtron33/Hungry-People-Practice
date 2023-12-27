<?php


final class Connection
{
    private static ?Connection $conn = null;

    public function connect()
    {
        $dbname = 'php2';
        $username = 'postgres';
        $password = 'secret_pass';
        $host = 'host.docker.internal';
        $port = 5433;
        $options = [];

        $dsn = "pgsql:host=".$host.";port=".$port.";dbname=".$dbname;
        $db = new PDO($dsn,$username,$password, $options);
        $db->setAttribute(\PDO::ATTR_ERRMODE, \PDO::ERRMODE_EXCEPTION);

        return $db;
    }
    public static function get()
    {
        if (null === static::$conn) {
            static::$conn = new self();
        }

        return static::$conn;
    }

    protected function __construct()
    {

    }
}