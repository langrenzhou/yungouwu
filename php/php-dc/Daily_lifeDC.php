<?php
$idNum = $_GET[num];
header("content-type:text/html;charset=utf-8");
$mysqli = new mysqli("localhost", "root", "root", "db_bl");
$mysqli->query("set names utf8");
if ($mysqli->connect_errno) {
    die();
};
// $sql = "select img_url,position,show_img,content,hot_Pro from t_show where type_id = {$idNum} ";

$sql = "SELECT a.leng_img_url,a.position,a.show_img,a.content,a.hot_Pro,b.img_url,b.title,b.price FROM  t_show AS a, t_lifeshop AS b WHERE a.type_id=b.type_id and b.type_id={$idNum} LIMIT 0,6";
$res = $mysqli->query($sql);
while ($row = $res->fetch_assoc()) {
    $result[] = $row;
};
echo json_encode($result);