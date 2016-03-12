<?php
require_once 'captcha.class.php';
 
$captcha = new Captcha(80,34,4);
 
$captcha->showImg();

session_start();
$_SESSION['captcha'] = $captcha->getCaptcha();
?>