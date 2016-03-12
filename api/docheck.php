<?php
session_start();
if(@$_SESSION['docheck'] != 'true'){
	echo "<script>location.href='login.html';</script>";
	exit();
}
?>
