<!DOCTYPE html>
<html>
<head>
	<title></title>
</head>
<body>
<?php


for($i=0; $i<count($_FILES); $i++){
    $target_path = "./data/";
    $ext = explode('.', basename($_FILES['file'.$i]['name']));
    $target_path = $target_path . md5(uniqid()) . "." . $ext[count($ext)-1]; 

    if(move_uploaded_file($_FILES['file'.$i]['tmp_name'], $target_path)) {
        echo "The file has been uploaded successfully <br />";
    } else{
        echo "There was an error uploading the file, please try again! <br />";
    }
}




?>
</body>
</html>
