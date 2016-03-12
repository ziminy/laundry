<?php
session_start();

$captcha = @$_REQUEST['captcha'];

if($captcha == strtolower($_SESSION['captcha'])){
	echo 1;
}else{
	echo 0;
}
?>