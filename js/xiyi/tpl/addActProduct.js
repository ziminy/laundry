define(function(require, exports, module) {

  addActProductObj = function (){

    this.addActProductHtml = '<div class="addnewuser">\
                <form class="form-horizontal" role="form">\
                    <div class="form-group">\
                        <div class="col-sm-6">\
                            <label class="col-sm-2 control-label">销售单号：</label>\
                            <div class="col-sm-4">\
                              <input type="text" class="form-control" id="billname" placeholder="销售单号">\
                              <span class="glyphicon form-control-feedback hide">*</span>\
                            </div>\
                        </div>\
                        <div class="col-sm-6">\
                            <label class="col-sm-2 control-label">电话：</label>\
                            <div class="col-sm-3">\
                                <input type="text" class="form-control" id="uphone" placeholder="联系电话">\
                            </div>\
                            <div class="col-sm-1">\
                                <a class="btn btn-info js-getUser">提取</a>\
                            </div>\
                        </div>\
                    </div>\
                    <div class="form-group">\
                        <div class="col-sm-6">\
                            <label class="col-sm-2 control-label">会员姓名：</label>\
                            <div class="col-sm-4">\
                              <input type="text" disabled="" uid="0" class="form-control" id="username" placeholder="会员姓名">\
                              <span class="glyphicon form-control-feedback hide">*</span>\
                            </div>\
                        </div>\
                        <div class="col-sm-6">\
                            <label class="col-sm-2 control-label">备注：</label>\
                            <div class="col-sm-4">\
                              <input type="text" class="form-control" id="remarks" placeholder="备注">\
                            </div>\
                        </div>\
                    </div>\
                    <div class="form-group">\
                        <div class="col-sm-6">\
                            <label class="col-sm-2 control-label">活品：</label>\
                            <div class="col-sm-4">\
                                <a data-target=".bs-cardtype" data-toggle="modal" class="btn btn-warning">添加活品</a>\
                            </div>\
                        </div>\
                        <div class="col-sm-6">\
                            <label class="col-sm-2 control-label">创建日期：</label>\
                            <div class="col-sm-4">\
                              <input type="text" class="form-control" id="createdate" placeholder="创建日期">\
                            </div>\
                        </div>\
                    </div>\
                    <div class="form-group">\
                        <div class="col-sm-6">\
                            <label class="col-sm-2 control-label">费用：</label>\
                            <div class="col-sm-3">\
                              <input type="text" disabled="" class="form-control" id="paid" placeholder="总计费用">\
                            </div>\
                            <label class="col-sm-1 control-label">元</label>\
                        </div>\
                        <div class="col-sm-6">\
                            <label class="col-sm-2 control-label">结账日期：</label>\
                            <div class="col-sm-4">\
                              <input type="text" class="form-control" id="closingdate" placeholder="结账日期">\
                            </div>\
                        </div>\
                    </div>\
                    <div class="form-group">\
                        <div class="col-sm-6">\
                            <label class="col-sm-2 control-label">余额(元)：</label>\
                            <div class="col-sm-3">\
                              <span style="padding-top:7px;display:block;" id="balance" balance="0" balanceed="0"></span>\
                            </div>\
                            <label class="col-sm-2 control-label">折扣率：</label>\
                            <div class="col-sm-2">\
                              <span style="padding-top:7px;display:block;" id="discount"></span>\
                            </div>\
                        </div>\
                    </div>\
                    <table class="table table-striped table-hover js-ActProductlist">\
                    <thead>\
                      <tr>\
                        <th>衣物名称</th>\
                        <th>金额(元)</th>\
                        <th>颜色</th>\
                        <th>衣物品牌</th>\
                        <th>特殊处理</th>\
                        <th>瑕疵</th>\
                        <th>洗后效果</th>\
                        <th>备注</th>\
                        <th>操作</th>\
                      </tr>\
                    </thead>\
                    <tbody></tbody>\
                    </table>\
                    <div class="form-group text-center">\
                          <a data-fname="addBillBtn" class="btn btn-danger">提交销售单</a>\
                          <input class="js-alertbtn" data-target=".bs-alert" data-toggle="modal" type="hidden" />\
                    </div>\
                </form>\
                <div class="modal fade bs-alert" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">\
      <div class="modal-dialog modal-sm">\
        <div class="modal-content">\
            <div class="modal-header">\
              <button data-dismiss="modal" class="close" type="button"><span aria-hidden="true">×</span><span class="sr-only">Close</span></button>\
              <h4 id="mySmallModalLabel" class="modal-title">提示</h4>\
            </div>\
            <div class="modal-body js-alert">\
              提交成功！\
            </div>\
          </div>\
      </div>\
    </div>\
    <div class="modal fade bs-cardtype" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">\
      <div class="modal-dialog modal-lg">\
        <div class="modal-content">\
            <div class="modal-header">\
              <button data-dismiss="modal" class="close" type="button"><span aria-hidden="true">×</span><span class="sr-only">Close</span></button>\
              <h4 id="mySmallModalLabel" class="modal-title">添加活品</h4>\
            </div>\
            <div class="modal-body">\
                <table class="table-condensed js-actproductform" style="margin:0 auto">\
                  <tr>\
                    <td><select id="clotheslist" class="form-control">\
                      <option>请选择衣物</option>\
                    </select></td>\
                    <td><input type="text" class="form-control" id="apname" placeholder="衣物名称"></td>\
                    <td><input type="text" class="form-control" id="apprice" placeholder="金额"></td>\
                    <td><input type="text" class="form-control" id="apcolor" placeholder="颜色"></td>\
                    <td><input type="text" class="form-control" id="apremarks" placeholder="备注"></td>\
                  </tr>\
                  <tr>\
                    <td><input type="text" class="form-control" id="apbrand" placeholder="衣物品牌"></td>\
                    <td><input type="text" class="form-control" id="apst" placeholder="特殊处理"></td>\
                    <td><input type="text" class="form-control" id="apdefect" placeholder="瑕疵"></td>\
                    <td><input type="text" class="form-control" id="apwashingef" placeholder="洗后效果"></td>\
                    <td><a data-type="0" class="btn btn-default js-washingtype">湿洗</a></td>\
                  </tr>\
                  <tr>\
                    <td colspan="5"><a data-fname="addActProduct" class="btn btn-success col-sm-offset-5">提交</a></td>\
                  </tr>\
                </table>\
            </div>\
          </div>\
      </div>\
    </div>\
                </div>';

    this.$panelbody = $('.js-panel-body');
    
    this.ADO = new ado();

    // 对Date的扩展，将 Date 转化为指定格式的String   
    // 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，   
    // 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)   
    // 例子：   
    // (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423   
    // (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18   
    Date.prototype.Format = function(fmt)
    {
      var o = {
        "M+" : this.getMonth()+1,                 //月份
        "d+" : this.getDate(),                    //日
        "h+" : this.getHours(),                   //小时
        "m+" : this.getMinutes(),                 //分
        "s+" : this.getSeconds(),                 //秒
        "q+" : Math.floor((this.getMonth()+3)/3), //季度
        "S"  : this.getMilliseconds()             //毫秒
      };
      if(/(y+)/.test(fmt))
        fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
      for(var k in o)
        if(new RegExp("("+ k +")").test(fmt))
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
      return fmt;
    }

  }

  addActProductObj.prototype = {
      
      init: function (){

        var that = this;
        this.$panelbody.html(this.addActProductHtml);
        $('#closingdate').add('#createdate').val(new Date().Format("yyyy-MM-dd hh:mm:ss"));
        $('#billname').val(new Date().Format("yyyyMMddhhmmss"));
        if($('.js-aid').val() == '2'){
          $('#billname').val('');
        }

        var actProductObj = [];
        var ActProductlist = $('.js-ActProductlist');
        var paid = 0;

        $('#uphone').focus();
        // 提取会员
        $('.js-getUser').click(function(event) {
          
          try{
            that.ADO.select({tname:'user,cardtype', conditions: ['u_phone=' + $('#uphone').val(), 'user.cardtype_id=cardtype.cardtype_id', 'user.a_id=' + $('.js-aid').val()]}, function (data){

              if(data.dataList[0]){
                $('#username').val(data.dataList[0].u_name);
                $('#username').attr('uid', data.dataList[0].u_id);
                $('#balance').html(data.dataList[0].u_balance).attr('balance', data.dataList[0].u_balance);
                $('#discount').html(data.dataList[0].cardtype_discount);
                $('#uphone').parent().removeClass('has-error');
              }else{
                $('#uphone').parent().addClass('has-error');
              }

            });
          }catch(e){
            $('#uphone').parent().addClass('has-error');
          }

        });
        $('#uphone').keyup(function(event) {
          if(event.which == 13)
            $('.js-getUser').trigger('click');
        });

        $('#closingdate').focus(function(event) {
           $(this).select();
        });

        // 加载衣物分类
        this.ADO.select({tname:'clothes', conditions: ['a_id=' + $('.js-aid').val()]}, function (data){

            for(var i = 0; i < data.dataList.length; i++){
                $('#clotheslist').append('<option data-price="'+ data.dataList[i].clothes_price +'" data-dryprice="'+ data.dataList[i].clothes_dryprice +'">'+ data.dataList[i].clothes_name +'</option>');
            }
            $('#clotheslist').change(function(event) {
              $('#apname').val($(this).find('option:selected').html());
              $('#apprice').val($(this).find('option:selected').data('price'));
              $('.js-washingtype').data('type', '0');
              $('.js-washingtype').html('湿洗');
              $('#apprice').val($('#clotheslist').find('option:selected').data('price'));
              $('.js-washingtype').removeClass('btn-primary').addClass('btn-default');
            });

        });

        // 切换洗衣方式
        $('.js-washingtype').click(function(event) {
          if($(this).data('type') == '0'){
            $(this).data('type', '1');
            $(this).html('干洗');
            $('#apprice').val($('#clotheslist').find('option:selected').data('dryprice'));
            $(this).removeClass('btn-default').addClass('btn-primary');
          }else{
            $(this).data('type', '0');
            $(this).html('湿洗');
            $('#apprice').val($('#clotheslist').find('option:selected').data('price'));
            $(this).removeClass('btn-primary').addClass('btn-default');
          }
        });

        // 添加活品
        $('[data-fname="addActProduct"]').click(function(event) {
          
          var apname = $('#apname').val();
          var apprice = $('#apprice').val();
          var apcolor = $('#apcolor').val();
          var apremarks = $('#apremarks').val();
          var apbrand = $('#apbrand').val();
          var apst = $('#apst').val();
          var apdefect = $('#apdefect').val();
          var apwashingef = $('#apwashingef').val();

          if(apname === ''){
            $('#apname').parent().addClass('has-error');
            return;
          }else{
            $('#apname').parent().removeClass('has-error');
          }
          if(apprice === ''){
            $('#apprice').parent().addClass('has-error');
            return;
          }else{
            $('#apprice').parent().removeClass('has-error');
          }

          actProductObj.push({
            'apname': apname,
            'apprice': apprice,
            'apcolor': apcolor,
            'apremarks': apremarks,
            'apbrand': apbrand,
            'apst': apst,
            'apdefect': apdefect,
            'apwashingef': apwashingef
          });
          
          ActProductlist.find('tbody').append('<tr><td>'+ apname +'</td><td class="js-apprice">'+ apprice +'</td><td>'+ apcolor +'</td><td>'+ apbrand +'</td><td>'+ apst +'</td><td>'+ apdefect +'</td><td>'+ apwashingef +'</td><td>'+ apremarks +'</td><td><a class="btn btn-default js-deleteap">删除</a>\</td></tr>');
          
          paid = parseFloat(paid).add(apprice);
          // $('#paid').val(paid);
          $('#apname').add('#apprice').add('#apremarks').add('#apcolor').add('#apbrand').add('#apst').add('#apdefect').add('#apwashingef').val('');
          $('#apname').focus();
          $('#clotheslist').get(0).selectedIndex = 0;

          var balance = Number($('#balance').attr('balance'));
          var discount = Number($('#discount').html());
          
          $('#paid').val(paid.mul(discount));
          var balancenow = balance.sub(paid.mul(discount));
          if(balancenow < 0){
            $('#balance').css('color', 'red');
          }else{
            $('#balance').css('color', '#333');
          }
          $('#balance').html(balance + ' - ' + paid.mul(discount) + ' = ' + balancenow);
          // balancenow = balancenow < 0 ? 0 : balancenow;
          // console.log(balancenow);
          $('#balance').attr('balanceed', balancenow);

        });

        // 删除活品
        ActProductlist.on('click', '.js-deleteap', function (){

          var that = $(this).parent().parent();
          var index = that.index();
          var num = that.find('.js-apprice').html();
          that.remove();
          actProductObj.splice(index, 1);
          paid = parseFloat(paid).sub(num);
         
          var balance = Number($('#balance').attr('balance'));
          var discount = Number($('#discount').html());
          
          $('#paid').val(parseFloat(paid).mul(discount));
          var balancenow = balance.sub(parseFloat(paid).mul(discount));
          if(balancenow < 0){
            $('#balance').css('color', 'red');
          }else{
            $('#balance').css('color', '#333');
          }
          $('#balance').html(balance + ' - ' + parseFloat(paid).mul(discount) + ' = ' + balancenow);
          balancenow = balancenow < 0 ? 0 : balancenow;
          // console.log(balancenow);
          $('#balance').attr('balanceed', balancenow);

        });

        // 提交销售单
        $('[data-fname="addBillBtn"]').click(function(event) {
          
          var billname = $('#billname').val();
          var username = $('#username').val();
          var uid = $('#username').attr('uid');
          var uphone = $('#uphone').val();
          var num = $('#paid').val();
          var createdate = $('#createdate').val();
          var closingdate = $('#closingdate').val() ? $('#closingdate').val() : '未结账';
          var remarks = $('#remarks').val();

          if(billname === ''){
            $('#billname').parent().addClass('has-error');
            return;
          }else{
            $('#billname').parent().removeClass('has-error');
          }
          if(username === ''){
            $('#username').parent().addClass('has-error');
            return;
          }else{
            $('#username').parent().removeClass('has-error');
          }
          if(uphone === ''){
            $('#uphone').parent().addClass('has-error');
            return;
          }else{
            $('#uphone').parent().removeClass('has-error');
          }

          var billid = 0;
          that.ADO.insert({
              tname: 'bill',
              tfield: 'bill_name,bill_createdate,bill_closingdate,bill_paid,bill_remarks,u_id,a_id',
              bill_name: billname,
              bill_createdate: createdate,
              bill_closingdate: closingdate,
              bill_paid: num,
              bill_remarks: remarks,
              u_id: uid,
              a_id:$('.js-aid').val()}, function (){

                var progress = 0;
                that.ADO.update({
                  tname: 'user',
                  idname: 'u_id',
                  delid: uid,
                  tfield: 'u_balance',
                  u_balance: Number($('#balance').attr('balanceed'))}, function (data){
                    progress++;
                });

                try{
                  that.ADO.select({tname:'bill', conditions: ['bill_name=' + billname, 'bill_paid=' + num, 'u_id=' + uid]}, function (data){

                    billid = data.dataList[0].bill_id;

                    for (var i = 0; i < actProductObj.length; i++) {
                      try{
                        console.log('insert:'+actProductObj[i].apname);
                        that.ADO.insert({
                            tname: 'actproduct',
                            tfield: 'ap_name,ap_price,ap_remarks,bill_id,ap_color,ap_st,ap_brand,ap_defect,ap_washingef',
                            ap_name: actProductObj[i].apname,
                            ap_price: actProductObj[i].apprice,
                            ap_remarks: actProductObj[i].apremarks,
                            ap_color: actProductObj[i].apcolor,
                            ap_st: actProductObj[i].apst,
                            ap_brand: actProductObj[i].apbrand,
                            ap_defect: actProductObj[i].apdefect,
                            ap_washingef: actProductObj[i].apwashingef,
                            bill_id: billid}, function (){
                              progress++;
                            });
                      }catch(e){}
                    };

                  });
                  
                }catch(e){}

                setInterval(function (){
                  if(progress == (actProductObj.length + 1)){
                    $('.js-alertbtn').trigger('click');
                    setTimeout(function(){
                      window.location.href = 'http://xiyi.ziminy.com';
                    }, 2000);
                  }
                }, 800);
                
          });
          
        });

      }

  }

exports.addActProductObj = addActProductObj;

});