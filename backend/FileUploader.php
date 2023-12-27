<?php

class FileUploader {

    public function upload($image){

        if(isset($image))
        
        $img_name = $image['name'];
        $img_size = $image['size'];
        $tmp_name = $image['tmp_name'];
        $error = $image['error'];

        if($error === 0){

            $img_ex = pathinfo($img_name, PATHINFO_EXTENSION);
            $img_ex_lc = strtolower($img_ex);

            $allowed_exs = array("jpg", "jpeg", "png");

            if(in_array($img_ex_lc, $allowed_exs)){
                $new_img_name = uniqid("IMG-", true).'.'.$img_ex_lc;
                $img_upload_path = 'static/'.$new_img_name;
                move_uploaded_file($tmp_name, $img_upload_path);

                return $img_upload_path;
            }
            else{
                $em = "You cant upload this file";
                header("Location: index.php?error=$em");
            }
        }
    }

    public function getImage($name){
        $pic = './static/'.$name;

        $params = explode('.',$name);

        $type = $params[1];

        $size = getimagesize($pic);

        header('Content-type: image/',$type);

        return readfile($pic);

    }

    public function __construct(){

    }
}