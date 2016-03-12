<?php

require('docheck.php');

//调用conn.php文件进行数据库操作   
require('Conn.php');

$link = mysql_connect($db_host, $db_user, $db_passw);
mysql_select_db($db_name, $link);

$tName = @$_REQUEST['tname'];
$tField = @$_REQUEST['tfield'];
$fieldArr = explode(",",$tField);

$str = '';
$str2 = '';

foreach ($fieldArr as $value)
{
	$str .= "'".$_REQUEST[$value]."',";
	$str2 .= "`".$value."`,";
}
$str = substr($str, 0, strlen($str) - 1);
$str2 = substr($str2, 0, strlen($str2) - 1); 

if ($tName === null) {
    exit();
}

// INSERT INTO `user` (`u_name`, `u_phone`, `u_card`) VALUES ('啊啊', '15999999999', '333333')
$exec = "INSERT INTO `".$tName."` (".$str2.") VALUES (".$str.")";
mysql_query("SET NAMES utf8");

//调用conn.php文件进行数据库操作
if($link)
{
	mysql_query($exec, $link);
	mysql_close($link);
}

?>