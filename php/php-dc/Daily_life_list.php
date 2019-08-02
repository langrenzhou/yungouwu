<?php
$num = $_GET[num];
header("content-type:text/html;charset=utf-8");
$mysqli = new mysqli("localhost", "root", "root", "db_bl");
$mysqli->query("set names utf8");
if ($mysqli->connect_errno) {
    die();
};
// $sql = "select img_url,position,show_img,content,hot_Pro from t_show where type_id = {$idNum} ";

$sql = "SELECT title,content_list from t_show where type_id={$num}";
$res = $mysqli->query($sql);
while ($row = $res->fetch_assoc()) {
    $result[] = $row;
};
echo json_encode($result);
