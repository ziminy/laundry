<?php

require('docheck.php');

//调用conn.php文件进行数据库操作   
require('Conn.php');

$link =mysql_connect($db_host, $db_user, $db_passw);
mysql_select_db($db_name, $link);

$tName = @$_REQUEST['tname'];
$tField = @$_REQUEST['tfield'];
$idName = @$_REQUEST['idname'];
$delid = @$_REQUEST['delid'];
$fieldArr = explode(",",$tField);

$str = '';
$str2 = '';

foreach ($fieldArr as $value)
{
	$str .= $value."='".$_REQUEST[$value]."',";
}
$str = substr($str, 0, strlen($str) - 1);

if ($tName === null) {
    exit();
}
// $exec="INSERT INTO `".$tName."` (".$str2.") VALUES (".$str.")";
// UPDATE `user` SET u_name='失败',u_phone=5555 WHERE u_id=16
$exec = "UPDATE `".$tName."` SET ".$str." WHERE ".$idName."=".$delid;
mysql_query("SET NAMES utf8");

//调用conn.php文件进行数据库操作
if($link)
{
	mysql_query($exec, $link);
	mysql_close($link);
}

?>