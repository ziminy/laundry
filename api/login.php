<?php

$uname = $_REQUEST['username'];
$pw = $_REQUEST['password'];

session_start();

//调用conn.php文件进行数据库操作   
require('Conn.php');

$result = mysql_connect($db_host, $db_user, $db_passw);
mysql_select_db($db_name, $result);

$exec = "SELECT * FROM admin WHERE a_name='".$uname."' AND password='".$pw."' limit 1";

mysql_query("SET NAMES utf8");

//执行SQL语句(查询)
$check_query = mysql_query($exec);

//调用conn.php文件进行数据库操作
if($result = mysql_fetch_array($check_query))
{
    $_SESSION['docheck']='true';
    $_SESSION['username'] = $uname;
    $_SESSION['shopname'] = $result['shopname'];
    $_SESSION['adminid'] = $result['a_id'];
    $_SESSION['expirationtime'] = $result['expirationtime'];
    echo '1';
}else{
	echo '0';
}

mysql_free_result($check_query);
//释放结果
mysql_close();
//关闭连接

?>