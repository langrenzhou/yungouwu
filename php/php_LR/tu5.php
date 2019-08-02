<?php
header("Content-type:text/html;charset=utf-8");
$mysqli=new mysqli('localhost','root','root','lr');
$get=$_GET['page'];
if($mysqli->connect_errno){
    die();
}
$sql="select * FROM tu5 limit {$get},10";
 $mysqli->query("set names utf8");
 $result=$mysqli->query($sql);
 while($row=mysqli_fetch_assoc($result)){
    $data[] = $row;
}
$res=json_encode($data);
print_r($res)
?>