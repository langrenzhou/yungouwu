<?php
header("Content-type:text/html;charset=utf-8");
$mysqli=new mysqli('localhost','root','root','lr');
if($mysqli->connect_errno){
    die();
}
$sj=$_GET["t_acoods"];
$sql="select * FROM bh where t_acoods=${sj}";
 $mysqli->query("set names utf8");
 $result=$mysqli->query($sql);
 while($row=mysqli_fetch_assoc($result)){
    $data[] = $row;
}
$res=json_encode($data);
print_r($res)
?>