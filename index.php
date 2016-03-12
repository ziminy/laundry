<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>洗衣店管理系统</title>
<?php
	require('api/docheck.php');
?>
<link rel="stylesheet" href="css/bootstrap.min.css">

<style>
	*{font-family:"Helvetica Neue",Helvetica,Microsoft Yahei,Hiragino Sans GB,WenQuanYi Micro Hei,sans-serif;}
	.help-block{ color: #333}
	.glyphicon{ top: 0; right: -16px; color: #d9534f;}
</style>
</head>
<body>

<div class="panel panel-primary">
        <div class="panel-heading">
            <div class="panel-title text-center"><?php echo $_SESSION['shopname'] ?></div>
            <span class="help-block">
				<?php
					$nowTime = date("Y-m-d");
					$date = floor((strtotime($_SESSION['expirationtime'])-strtotime($nowTime))/86400);
					if($date < 30){
						echo '欢迎管理员，'.$_SESSION['username'].'，  剩余使用天数：'.$date.'天';
					}else{
						echo '欢迎管理员，'.$_SESSION['username'];
					}

					echo '<input class="js-aid" type="hidden" value="'.$_SESSION['adminid'].'">';

					if ($date <= 0) {
						die();
					}
				?>
            </span>
        </div>
        <div class="nav">
			<nav class="navbar navbar-default" role="navigation">
			   <div class="navbar-header">
			      <button type="button" class="navbar-toggle" data-toggle="collapse" 
			         data-target="#example-navbar-collapse">
			         <span class="sr-only">切换导航</span>
			         <span class="icon-bar"></span>
			         <span class="icon-bar"></span>
			         <span class="icon-bar"></span>
			      </button>
			      <a class="navbar-brand" href="javascript:;">导航菜单</a>
			   </div>
			   <div class="collapse navbar-collapse" id="example-navbar-collapse">
			      <ul class="nav navbar-nav">
			         <li class="active"><a href="/">系统首页</a></li>
			         <li class="dropdown">
			            <a href="javascript:;" class="dropdown-toggle" data-toggle="dropdown">
			               销售管理 <b class="caret"></b>
			            </a>
			            <ul class="dropdown-menu">
			               <li><a data-type="adduser" href="javascript:;">添加新会员</a></li>
			               <li><a data-type="showuserlist" href="javascript:;">会员列表</a></li>
			               <!-- <li><a data-type="showcardtype" href="javascript:;">管理卡类型</a></li> -->
			               <li><a data-type="addactproduct" href="javascript:;">添加销售单</a></li>
			               <li><a data-type="showbilllist" href="javascript:;">销售单列表</a></li>
			               <li><a data-type="clothescontrol" href="javascript:;">衣物管理</a></li>
			               <li><a data-type="cardcontrol" href="javascript:;">卡类型管理</a></li>
			            </ul>
			         </li>
			         <li><a href="javascript:;">库存管理</a></li>
			         <li><a href="javascript:;">店面设置</a></li>
			         <li class="dropdown">
			            <a href="javascript:;" class="dropdown-toggle" data-toggle="dropdown">
			               数据统计 <b class="caret"></b>
			            </a>
			            <ul class="dropdown-menu">
			               <li><a href="javascript:;">销售统计</a></li>
			               <li><a href="javascript:;">产品/服务统计</a></li>
			               <li><a href="javascript:;">费用收支</a></li>
			            </ul>
			         </li>
			      </ul>
			   </div>
			</nav>
		</div>
        <div class="panel-body js-panel-body"></div>
</div>

<script src="http://j.ziminy.com/js/jquery-1.10.2.min.js"></script>
<script src="http://j.ziminy.com/js/bootstrap.min.js"></script>
<script src="http://j.ziminy.com/js/sea.2.1.0.js"></script>
<script type="text/javascript"> seajs.use('xiyi/page/app'); </script>
</body>
</html>