<?php
    header("content-type:text/html;charset=utf8");
    $conn=new Mysqli("localhost","root","root","db_bailian");
    Mysqli_set_charset($conn,'utf8');
    $comId=$_GET["comId"];
    if($conn->connect_errno){
        die("数据库连接失败！");
    }
    $sql="select * from t_commodity where id={$comId}";
    // $sql="select * from t_commodity where id=5";
    $res=$conn->query($sql);
    while($row=Mysqli_fetch_assoc($res)){
        $arr[]=$row;
    }
    
    $result=json_encode($arr);
    echo $result;
?>
