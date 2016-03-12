define(function(require, exports, module) {

  userListobj = function (){

    this.userListHtml = '<div class="col-sm-6">\
                            <div class="col-sm-4">\
                              <input type="text" class="form-control" id="search" placeholder="请输入会员姓名、卡号或联系电话">\
                            </div>\
                            <div class=" col-sm-2">\
                              <a data-fname="selectUser" class="btn btn-success">搜索</a>\
                            </div>\
                        </div>\
                        <table class="table table-striped table-hover js-userlist">\
                        <thead>\
                          <tr>\
                            <th>卡号</th>\
                            <th>姓名</th>\
                            <th>手机号</th>\
                            <th>卡类型</th>\
                            <th>卡余额</th>\
                            <th>开卡日期</th>\
                            <th>备注</th>\
                            <th>操作</th>\
                          </tr>\
                        </thead>\
                        <tbody></tbody>\
                        </table>\
                        <input class="js-operationbtn" data-target=".bs-operationpanel" data-toggle="modal" type="hidden" />\
                        <div class="modal fade bs-operationpanel" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">\
                        <div class="modal-dialog modal-sm">\
                          <div class="modal-content">\
                              <div class="modal-header">\
                                <button data-dismiss="modal" class="close" type="button"><span aria-hidden="true">×</span><span class="sr-only">Close</span></button>\
                                <h4 id="mySmallModalLabel" class="modal-title">提示</h4>\
                              </div>\
                              <div class="modal-body js-content">\
                                <p class="bg-primary" style="padding-left:4px">\
                                    <label style="margin-top:5px" class="control-label">总消费：</label>\
                                    <label style="margin-top:5px" class="control-label js-totalc"></label>\
                                </p>\
                                <p class="bg-danger text-success" style="padding-left:4px">\
                                    <label style="margin-top:5px" class="control-label">余&nbsp;&nbsp;&nbsp;&nbsp;额：</label>\
                                    <label style="margin-top:5px" class="control-label js-balance"></label>\
                                </p>\
                                <a class="btn btn-danger col-sm-offset-4 js-deleteuser">删除会员</a>\
                              </div>\
                            </div>\
                        </div>\
                      </div>\
                      <a data-start="0" data-count="10" class="js-loadmore btn btn-success col-sm-offset-5">加载更多</a>';

    this.$panelbody = $('.js-panel-body');
    this.aid = $('.js-aid').val();
    this.ADO = new ado();
    this.cardtypeList = {};
    
  }

  userListobj.prototype = {
      
      init: function (){

        var that = this;
        
        this.$panelbody.html(this.userListHtml);
        this.$userlist = $('.js-userlist tbody');
        this.$loadmore = $('.js-loadmore');
        this.pageCount = parseInt(this.$loadmore.data('count'));

        that.ADO.select({tname:'cardtype', conditions: ['a_id=' + $('.js-aid').val()]}, function (data){
            that.cardtypeList = data.dataList;
            that.showUserList(that.getLimit());
        });

        that.$loadmore.click(function(event) {
          that.showUserList(that.getLimit());
        });

        
        // update
        that.$panelbody.on('click', '.js-doupdate', function(){

          var thisTr = $(this).parent().parent();
          var ucard = thisTr.find('.js-ucard').val();
          var uid = thisTr.find('.js-aid').val();
          var uname = thisTr.find('.js-uname').val();
          var uphone = thisTr.find('.js-uphone').val();
          var cardtype = thisTr.find('.cardtype').val();
          var uremarks = thisTr.find('.js-uremarks').val();

          if(confirm("确定要修改吗？")){

            that.ADO.update({
              tname: 'user',
              idname: 'u_id',
              delid: uid,
              tfield: 'u_name,u_phone,u_card,cardtype_id,u_remarks',
              u_name: uname,
              u_phone: uphone,
              u_card: ucard,
              u_remarks: uremarks,
              cardtype_id: cardtype}, function (data){
                alert('修改成功');
            });

          }

        });

        // Recharge
        that.$panelbody.on('click', '.js-recharge', function(){

          var thisTr = $(this).parent().parent();
          var uname = thisTr.find('.js-uname').val();
          var uid = thisTr.find('.js-aid').val();
          var ubalance = thisTr.find('.js-ubalance').html();
          

          var money = window.prompt('请输入金额（元）', '');

          if(money != ''){

            if(confirm('确定要为“'+ uname +'”充值'+ money +'元吗？')){

              that.ADO.update({
                tname: 'user',
                idname: 'u_id',
                delid: uid,
                tfield: 'u_balance',
                u_balance: parseFloat(ubalance).add(money)}, function (data){
                  alert('充值成功');
                  thisTr.find('.js-ubalance').html(parseFloat(ubalance).add(money).toFixed(2));
              });

            }

          }else{
            alert('请输入正确金额！');
          }

        });

      },
      getLimit: function (){
        return this.$loadmore.data('start') + ',' + this.$loadmore.data('count');
      },
      showUserList: function (limit){

        var that = this;
        that.$loadmore.html('加载更多...');
        that.ADO.select({
              tname:'user,cardtype',
              conditions: ['user.a_id='+ that.aid, 'cardtype.cardtype_id=user.cardtype_id'],
              limit: limit}, function (data){

          var len = data.dataList.length;

          for(var i = 0; i < len; i++){
              var cardtype_name = data.dataList[i].cardtype_name;
              var cardtype_id = data.dataList[i].cardtype_id;
              var cardtype_discount = data.dataList[i].cardtype_discount;
              var u_balanceHtml = data.dataList[i].u_balance;
              if(parseFloat(data.dataList[i].u_balance) < 0){
                u_balanceHtml = '<b style="color:red">'+ data.dataList[i].u_balance +'</b>';
              }

              that.$userlist.append('<tr><input class="js-aid" value="'+ data.dataList[i].u_id +'" type="hidden" />' +
                                    '<td><input class="js-ucard" value="'+ data.dataList[i].u_card +'" type="text" /></td>' +
                                    '<td><input class="js-uname" value="'+ data.dataList[i].u_name +'" type="text" /></td>' +
                                    '<td><input class="js-uphone" value="'+ data.dataList[i].u_phone +'" type="text" /></td>' +
                                    '<td><select class="cardtype" class="form-control"></select>'+ data.dataList[i].cardtype_name +'（折扣率：'+ data.dataList[i].cardtype_discount +'）</td>' +
                                    '<td class="js-ubalance">'+ u_balanceHtml +'</td>' +
                                    '<td>'+ data.dataList[i].u_signdate +'</td>' +
                                    '<td><input class="js-uremarks" value="'+ (data.dataList[i].u_remarks ? data.dataList[i].u_remarks : '') +'" type="text" /></td>' +
                                    '<td><a class="btn btn-info js-recharge">充值</a> <a class="btn btn-danger js-doupdate">修改</a></td></tr>');
              
              for (var j = 0; j < that.cardtypeList.length; j++) {
                that.$userlist.find('.cardtype').eq(i).append('<option value="'+ that.cardtypeList[j].cardtype_id +'">'+ that.cardtypeList[j].cardtype_name +'</option>');
              };
              that.$userlist.find('.cardtype').eq(i).val(cardtype_id);
          }
          if(len == that.pageCount){
            that.$loadmore.data('start', parseInt(that.$loadmore.data('count')) + parseInt(that.$loadmore.data('start')));
          }else{
            that.$loadmore.hide();
          }

          that.$loadmore.html('加载更多');

        });

      }

  }

exports.userListobj = userListobj;

});
