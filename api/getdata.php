<?php

require('docheck.php');

$tName = @$_REQUEST['tname'];
$conditions = @$_REQUEST['conditions'];
$limit = @$_REQUEST['limit'];

//需要执行的SQL语句
$sql = "select * from ";

if ($tName === null) {
    exit();
}else{
	$sql .= $tName;
}
if ($conditions != null) {
	$where = ' where ';
	foreach ($conditions as $condition){
		$where .= $condition.' and ';
	}
    $sql .= substr($where, 0, strlen($where) - 5);
}
if ($limit != null) {
    $sql .= ' limit '.$limit;
}

//调用conn.php文件进行数据库操作   
require('Conn.php');

//连接数据库
$conn = mysql_connect($db_host, $db_user, $db_passw) or die ('数据库连接失败！</br>错误原因：'.mysql_error());

//设置字符集，如utf8和gbk等，根据数据库的字符集而定
mysql_query("set names 'utf8'");

//选定数据库
mysql_select_db($db_name, $conn) or die('数据库选定失败！</br>错误原因：'.mysql_error());

//执行SQL语句(查询)
$result = mysql_query($sql) or die('数据库查询失败！</br>错误原因：'.mysql_error());

//提示操作成功信息，注意：$result存在于conn.php文件中，被调用出来   
if($result)
{

    //数据集 
    $users = array();
    $i = 0;

    while($row = mysql_fetch_array($result, MYSQL_ASSOC)){

            $users[$i] = $row;
            $i++; 

    }
    
    echo json_encode(array('dataList'=>$users)); 

}

mysql_free_result($result);
//释放结果
mysql_close();
//关闭连接

?>