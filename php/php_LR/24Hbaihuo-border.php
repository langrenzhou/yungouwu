<?php
header("Content-type:text/html;charset=utf-8");
 $mysqli=new mysqli('localhost','root','root','lr');
 $mysqli->query("set names utf8");
if($mysqli->connect_errno){
    die();
}
$sql='select * from lrztl';
$result=$mysqli->query($sql);
while($row=mysqli_fetch_assoc($result)){
    $data[] = $row;
}
$res=json_encode($data);
print_r($res)
?>