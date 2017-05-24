<?php

$uploads_dir = 'img';
$tmp_name = $_FILES["file"]["tmp_name"];
$extension = end(explode(".", $_FILES["file"]["name"]));
$md5 = md5_file($_FILES["file"]["tmp_name"]);
$name = "image" . $md5 . "." . $extension;
move_uploaded_file($tmp_name, "$uploads_dir/$name");
echo "$name";