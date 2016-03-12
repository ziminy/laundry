/**
 * Copyright (c) 2013 - 2014, Sohu Inc. All rights reserved.
 * @fileoverview Sohu 
 * @author  pangzimin | pangzimin@cyou-inc.com
 * @version 14-10-20
 * @param
 * @example
 * @init
 * @handle
 */
define(function(require, exports, module) {

    require('../common/ado');

    var ADO = new ado();
    var $panelbody = $('.js-panel-body');
    var aid = $('.js-aid').val();

    require('../common/numberOperation');
	require('../tpl/userList');
	require('../tpl/addUser');
	require('../tpl/addActProduct');
	require('../tpl/billList');
	require('../tpl/clothesList');
	require('../tpl/cardList');

	var userList = new userListobj();
	var addUser = new addUserobj();
	var addActProduct = new addActProductObj();
	var billList = new billListobj();
	var clothesList = new clothesListobj();
	var cardList = new cardListobj();

    getUsers();
    function getUsers(){
        ADO.select({
          tname:'user',
          conditions: ['user.a_id='+ aid]}, function (data){
            $panelbody.html('会员数：' + data.dataList.length + '人');
        });
    }

// 删除会员加限制
    $('[data-type="adduser"]').click(function(event) {
    	addUser.init();
    });

    $('[data-type="showuserlist"]').click(function(event) {
    	userList.init();
    });

    $('[data-type="addactproduct"]').click(function(event) {
    	addActProduct.init();
    });

    $('[data-type="showbilllist"]').click(function(event) {
    	billList.init();
    });

    $('[data-type="clothescontrol"]').click(function(event) {
    	clothesList.init();
    });

    $('[data-type="cardcontrol"]').click(function(event) {
    	cardList.init();
    });

    $panelbody.on('dblclick', '.js-userlist tr', function(){

    	var that = $(this);
    	var $operationpanel = $('.bs-operationpanel');
    	var aid = that.find('.js-aid').val();
        var $totalc = $('.js-totalc');  // 总消费
        var $balance = $('.js-balance');  // 余额
    	$panelbody.find('.js-operationbtn').trigger('click');
        var totalc = 0;
        var balance = 0;

    	$operationpanel.find('h4').html('会员：' + that.find('.js-uname').val());

        $totalc.add($balance).html('');
        // 查询总消费和余额
        ADO.select({tname:'bill,user', conditions: ['user.u_id=' + aid, 'user.u_id=bill.u_id']}, function (data){

            if(data.dataList.length){
                for (var i = 0; i < data.dataList.length; i++) {
                    totalc = parseFloat(totalc).add(data.dataList[i].bill_paid);
                };
                balance = data.dataList[0].u_balance;
                $totalc.html(totalc + ' 元');
                $balance.html(balance + ' 元');
            }

        });

    	$operationpanel.find('.js-deleteuser').click(function() {
            if(confirm("确定要删除该会员吗？")){
        		ADO.remove({
                   tname: 'user',
                   idname: 'u_id',
                   ids: aid}, function (data){
    	                // console.log(data);
    	                $operationpanel.find('.close').trigger('click');
    	                $('.modal-backdrop').removeClass('in').addClass('out').hide();
    	                userList.init();
                });
            }
    	});

    });

    $panelbody.on('click', '.js-deletebill', function (){

    	var thisTr = $(this).parent().parent();
    	var billId = thisTr.find('.js-billid').val();
        var uid = thisTr.find('.js-userid').val();
        var paid = 0;

    	if(confirm("删除后该金额会返回到会员余额，确定要删除吗？")){

            ADO.select({tname:'bill,user', conditions: ['bill_id=' + billId, 'user.u_id=bill.u_id']}, function (data){

                var billpaid = data.dataList[0].bill_paid;
                var ubalance = data.dataList[0].u_balance;

                ADO.update({
                  tname: 'user',
                  idname: 'u_id',
                  delid: uid,
                  tfield: 'u_balance',
                  u_balance: Number(ubalance).add(billpaid)}, function (data){
                    
                    ADO.remove({
                       tname: 'bill',
                       idname: 'bill_id',
                       ids: billId}, function (data){
                            ADO.remove({
                               tname: 'actproduct',
                               idname: 'bill_id',
                               ids: billId}, function (data){
                                    billList.init();
                            });
                    });

                });
                

            });

		}

    });

    // 查看销售单详情
    $panelbody.on('click', '.js-billlist .js-showinfo', function (){

    	var thisTr = $(this).parent().parent();
    	var billId = thisTr.find('.js-billid').val();
    	var $listWrap = $('.js-actproductlist tbody');

    	$('.js-operationbtn').trigger('click');
    	ADO.select({
          tname:'actproduct',
          conditions: ['bill_id='+ billId]}, function (data){

          	var len = data.dataList.length;
          	$listWrap.html('');
          	if(len > 0){
	          	for(var i = 0; i < len; i++){
	              	$listWrap.append('<tr><input class="js-apid" value="'+ data.dataList[i].ap_id +'" type="hidden" /><td>'+ data.dataList[i].ap_name +'</td><td>'+ data.dataList[i].ap_price +'</td><td>'+ data.dataList[i].ap_color +'</td><td>'+ data.dataList[i].ap_brand +'</td><td>'+ data.dataList[i].ap_st +'</td><td>'+ data.dataList[i].ap_defect +'</td><td>'+ data.dataList[i].ap_washingef +'</td><td>'+ data.dataList[i].ap_remarks +'</td></tr>');
	          	}
          	}

        });

    });

    // 销售单结账
    $panelbody.on('click', '.js-billlist .js-checkout', function (){

    	var thisTr = $(this).parent().parent();
    	var billId = thisTr.find('.js-billid').val();
        var uid = thisTr.find('.js-userid').val();
    	var $listWrap = $('.js-actproductlist tbody');
        var closingdate = thisTr.find('.js-closingdate').html();
        var ubalance = thisTr.find('.js-ubalance').val();
        
        var billpaid = thisTr.find('.js-billpaid').html();
        
    	var now = new Date().Format("yyyy-MM-dd hh:mm:ss");

        if(closingdate != '未结账'){
            alert('本销售单已经结过账了！');
            return;
        }

    	if(confirm("确定要结账吗？")){
	    	ADO.update({
		      	tname: 'bill',
		      	idname: 'bill_id',
		      	delid: billId,
		      	tfield: 'bill_closingdate',
		      	bill_closingdate: now}, function (data){
                    ADO.update({
                      tname: 'user',
                      idname: 'u_id',
                      delid: uid,
                      tfield: 'u_balance',
                      u_balance: Number(ubalance).sub(billpaid)}, function (data){
                        billList.init();
                    });
	        });
    	}

    });

    // 更改销售单状态
    $panelbody.on('click', '.js-billlist .js-billstate', function (){

    	var thisTr = $(this).parent().parent();
    	var billId = thisTr.find('.js-billid').val();
    	var $listWrap = $('.js-actproductlist tbody');
    	var that = $(this);
    	var nowstate = $(this).html();
    	var checkoutstr = thisTr.find('td').eq(2).html();

    	nowstate = (nowstate === '未取衣') ? '已取衣'+ new Date().Format("yyyy-MM-dd hh:mm:ss") : '未取衣';

    	if(checkoutstr === '未结账'){
    		alert('请结账后再更改状态！');
    		return;
    	}

    	if(confirm("确定要更改状态吗？")){
	    	ADO.update({
		      	tname: 'bill',
		      	idname: 'bill_id',
		      	delid: billId,
		      	tfield: 'bill_state',
		      	bill_state: nowstate}, function (data){
		        	that.html(nowstate);
	        });
    	}

    });

    $panelbody.on('click', 'a', function (event){
    	
    	var that = $(this);
    	var fname = that.data('fname');
    	
    	switch(fname){
    		case 'addUserBtn':
    			adduserHandler();
    			break;
    		case 'addCardType':
    			addCardTypeHandler();
    			break;
    		case 'selectUser':
    			selectUserHandler();
    			break;
    		case 'selectBill':
    			selectBillHandler();
    			break;
    	}

    	// selectUser
    	function selectUserHandler(){

    		var selectValue = $panelbody.find('#search').val();
    		var $userlist = $('.js-userlist tbody');
            var whereStr = '';

    		if(selectValue === ''){
                $panelbody.find('#search').focus().parent().addClass('has-error');
                return;
            }else{
                $panelbody.find('#search').parent().removeClass('has-error');
            }

            if(/^\d{4,11}$/.test(selectValue)){
                // whereStr = selectValue.length === 11 ? ('user.u_phone=' + selectValue) : ("user.u_name=" + "'" + selectValue + "'");
                if(selectValue.length === 6){
                    whereStr = 'user.u_card=' + selectValue;
                }else if(selectValue.length === 11){
                    whereStr = 'user.u_phone=' + selectValue;
                }else{
                    whereStr = "user.u_name=" + "'" + selectValue + "'";
                }
                // whereStr = 'user.u_phone=' + selectValue;
            }else{
                whereStr = "user.u_name=" + "'" + selectValue + "'";
            }

            var cardtypeList = {};

            ADO.select({tname:'cardtype', conditions: ['a_id=' + $('.js-aid').val()]}, function (data){
                
                cardtypeList = data.dataList;
                
                ADO.select({
                  tname:'user,cardtype',
                  conditions: ['user.a_id='+ aid, 'cardtype.cardtype_id=user.cardtype_id', whereStr]}, function (data){

                    var len = data.dataList.length;
                    if(len > 0){
                        $userlist.html('');
                        $('.js-loadmore').hide();
                        for(var i = 0; i < data.dataList.length; i++){
                            var cardtype_id = data.dataList[i].cardtype_id;
                            $userlist.append('<tr><input class="js-aid" value="'+ data.dataList[i].u_id +'" type="hidden" />' +
                                        '<td><input class="js-ucard" value="'+ data.dataList[i].u_card +'" type="text" /></td>' +
                                        '<td><input class="js-uname" value="'+ data.dataList[i].u_name +'" type="text" /></td>' +
                                        '<td><input class="js-uphone" value="'+ data.dataList[i].u_phone +'" type="text" /></td>' +
                                        '<td><select class="cardtype" class="form-control"></select>'+ data.dataList[i].cardtype_name +'（折扣率：'+ data.dataList[i].cardtype_discount +'）</td>' +
                                        '<td class="js-ubalance">'+ data.dataList[i].u_balance +'</td>' +
                                        '<td>'+ data.dataList[i].u_signdate +'</td>' +
                                        '<td><input class="js-uremarks" value="'+ (data.dataList[i].u_remarks ? data.dataList[i].u_remarks : '') +'" type="text" /></td>'+
                                        '<td><a class="btn btn-info js-recharge">充值</a> <a class="btn btn-danger js-doupdate">修改</a></td></tr>');

                            for (var j = 0; j < cardtypeList.length; j++) {
                                $userlist.find('.cardtype').eq(i).append('<option value="'+ cardtypeList[j].cardtype_id +'">'+ cardtypeList[j].cardtype_name +'</option>');
                              };
                              $userlist.find('.cardtype').eq(i).val(cardtype_id);
                        }
                    }

                });

            });

			

    	}

    	// selectBill
    	function selectBillHandler(){

    		var selectValue = $panelbody.find('#search').val();
    		var $billlist = $('.js-billlist tbody');
            var whereStr = '';

    		if(selectValue === ''){
				$panelbody.find('#search').focus().parent().addClass('has-error');
				return;
			}else{
				$panelbody.find('#search').parent().removeClass('has-error');
			}

            if(/^\d{4,11}$/.test(selectValue)){
                whereStr = selectValue.length === 11 ? ('user.u_phone=' + selectValue) : ("bill.bill_name=" + "'" + selectValue + "'");
                // whereStr = 'user.u_phone=' + selectValue;
            }else{
                whereStr = "user.u_name=" + "'" + selectValue + "'";
            }

			ADO.select({
              tname:'user,bill',
              conditions: ['user.a_id='+ aid, 'bill.u_id=user.u_id', whereStr]}, function (data){

              	var len = data.dataList.length;
              	if(len > 0){
              		$billlist.html('');
              		$('.js-loadmore').hide();
		          	for(var i = 0; i < data.dataList.length; i++){
		              	$billlist.append('<tr><input class="js-billid" value="'+ data.dataList[i].bill_id +'" type="hidden" /><td>'+ data.dataList[i].bill_name +'</td><td>'+ data.dataList[i].bill_createdate +'</td><td>'+ data.dataList[i].bill_closingdate +'</td><td>'+ data.dataList[i].bill_paid +'</td><td>'+ data.dataList[i].u_name +'</td><td><a class="btn btn-default js-billstate">'+ data.dataList[i].bill_state +'</a></td><td><a class="btn btn-warning js-checkout">结账</a> <a class="btn btn-info js-showinfo">详情</a> <a class="btn btn-danger js-deletebill">删除</a></td></tr>');
		          	}
	          	}else{
                    alert('没有搜到结果');
                }

	        });

    	}

    	// addCardType
    	function addCardTypeHandler(){

    		var cardTypename = $panelbody.find('#cardTypeName').val();
    		var cardTypeDiscount = $panelbody.find('#cardTypeDiscount').val();

    		if(cardTypename === ''){
				$panelbody.find('#cardTypeName').focus().parent().addClass('has-error');
				return;
			}else{
				$panelbody.find('#cardTypeName').parent().removeClass('has-error');
			}

			cardTypeDiscount = (cardTypeDiscount == '') ? 1 : cardTypeDiscount;

    		ADO.insert({
	            tname: 'cardtype',
	            tfield: 'cardtype_name,cardtype_discount,a_id',
	            cardtype_name: cardTypename,
	            a_id: aid,
	            cardtype_discount: cardTypeDiscount}, function (){
	            	$panelbody.find('.bs-cardtype').modal('hide');
	            	
	            	ADO.select({
              			tname:'cardtype',
              			conditions: ['a_id='+ aid]}, function (data){
	            		$panelbody.find('#cardtype').html('');
					    for(var i = 0; i < data.dataList.length; i++){
					        $panelbody.find('#cardtype').append('<option value="'+ data.dataList[i].cardtype_id +'">'+ data.dataList[i].cardtype_name +'</option>');
					    }
					});
	        });
    		
    	}

    	// addUser
    	function adduserHandler(){

    		var username = $panelbody.find('#username').val();
    		var uphone = $panelbody.find('#uphone').val();
    		var cardtype = $panelbody.find('#cardtype').val();
    		var ubalance = $panelbody.find('#ubalance').val();
    		var sex = $panelbody.find('#sex').val();
    		var ubirth = $panelbody.find('#ubirth').val();
    		var ucard = $panelbody.find('#ucard').val();
    		var usigndate = $panelbody.find('#usigndate').val();

    		if(username === ''){
				$panelbody.find('#username').focus().parent().addClass('has-error');
				return;
			}else{
				$panelbody.find('#username').parent().removeClass('has-error');
			}
			if(uphone === ''){
				$panelbody.find('#uphone').focus().parent().addClass('has-error');
				return;
			}else{
				if(!RegExp.isPhone(uphone)){
					$panelbody.find('#uphone').focus().parent().addClass('has-error');
					return;
				}else{
					$panelbody.find('#uphone').parent().removeClass('has-error');
				}
			}
		ubalance = ubalance =='' ? 0 : ubalance;
    		ADO.insert({
	            tname: 'user',
	            tfield: 'u_name,u_phone,u_card,u_sex,u_birth,u_signdate,u_balance,cardtype_id,a_id',
	            u_name: username,
	            u_card: ucard,
	            cardtype_id: cardtype,
	            u_balance: ubalance,
	            u_signdate: usigndate,
	            u_sex: sex,
	            a_id:aid,
	            u_birth: ubirth,
	            u_phone: uphone}, function (){
	            	$panelbody.find('.js-alertbtn').trigger('click');
	        });

    	}

    });

	/**
	 * 手机验证
	 * @tel：需要验证的字符
	 * // example
	 * RegExp.isPhone(tel)
	 */
	RegExp.isPhone = function(tel)
	{
	   var mobile = /^1[3|4|5|7|8]\d{9}$/;
	   return mobile.test(tel);
	}

});