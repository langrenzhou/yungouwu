<?php
$idNum = $_GET[num];
header("content-type:text/html;charset=utf-8");
$mysqli = new mysqli("localhost", "root", "root", "db_bl");
$mysqli->query("set names utf8");
if ($mysqli->connect_errno) {
    die();
};
$sql = "select img_url,title,price,intro,logo_url,discounts_url,header from t_newgoods where type_id = {$idNum}";

$res = $mysqli->query($sql);
while ($row = $res->fetch_assoc()) {
    $result[] = $row;
};
echo json_encode($result);