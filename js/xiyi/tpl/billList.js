define(function(require, exports, module) {

  billListobj = function (){

    this.billListHtml = '<div class="col-sm-6">\
                            <div class="col-sm-4">\
                              <input type="text" class="form-control" id="search" placeholder="请输入姓名或联系电话">\
                            </div>\
                            <div class=" col-sm-2">\
                              <a data-fname="selectBill" class="btn btn-success">搜索</a>\
                            </div>\
                        </div>\
                        <table class="table table-striped table-hover js-billlist">\
                        <thead>\
                          <tr>\
                            <th>销售单号</th>\
                            <th>创建时间</th>\
                            <th>结账时间</th>\
                            <th>金额</th>\
                            <th>会员姓名</th>\
                            <th>状态</th>\
                            <th>操作</th>\
                          </tr>\
                        </thead>\
                        <tbody></tbody>\
                        </table>\
                        <input class="js-operationbtn" data-target=".bs-operationpanel" data-toggle="modal" type="hidden" />\
                        <div class="modal fade bs-operationpanel" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">\
                        <div class="modal-dialog modal-lg">\
                          <div class="modal-content">\
                              <div class="modal-header">\
                                <button data-dismiss="modal" class="close" type="button"><span aria-hidden="true">×</span><span class="sr-only">Close</span></button>\
                                <h4 id="mySmallModalLabel" class="modal-title">销售单详情</h4>\
                              </div>\
                              <div class="modal-body js-content">\
                                <table class="table table-striped table-hover js-actproductlist">\
                                <thead>\
                                  <tr>\
                                    <th>衣物名称</th>\
                                    <th>金额(元)</th>\
                                    <th>颜色</th>\
                                    <th>品牌</th>\
                                    <th>特殊处理</th>\
                                    <th>瑕疵</th>\
                                    <th>洗后效果</th>\
                                    <th>备注</th>\
                                  </tr>\
                                </thead>\
                                <tbody></tbody>\
                                </table>\
                              </div>\
                            </div>\
                        </div>\
                      </div>\
                      <a data-start="0" data-count="10" class="js-loadmore btn btn-success col-sm-offset-5">加载更多</a>';

    this.$panelbody = $('.js-panel-body');
    this.aid = $('.js-aid').val();
    this.ADO = new ado();
    
  }

  billListobj.prototype = {
      
      init: function (){

        var that = this;
        this.$panelbody.html(this.billListHtml);
        this.$billlist = $('.js-billlist tbody');
        this.$loadmore = $('.js-loadmore');
        this.pageCount = parseInt(this.$loadmore.data('count'));

        that.showBillList(that.getLimit());

        that.$loadmore.click(function(event) {
          that.showBillList(that.getLimit());
        });

      },
      getLimit: function (){
        return this.$loadmore.data('start') + ',' + this.$loadmore.data('count');
      },
      showBillList: function (limit){

        var that = this;
        that.$loadmore.html('加载更多...');
        that.ADO.select({
              tname:'user,bill',
              conditions: ['user.a_id='+ that.aid, 'bill.u_id=user.u_id'],
              limit: limit}, function (data){

          var len = data.dataList.length;

          for(var i = 0; i < len; i++){
              that.$billlist.append('<tr><input class="js-billid" value="'+ data.dataList[i].bill_id +'" type="hidden" /><input class="js-ubalance" value="'+ data.dataList[i].u_balance +'" type="hidden" /><input class="js-userid" value="'+ data.dataList[i].u_id +'" type="hidden" /><td>'+ data.dataList[i].bill_name +'</td><td>'+ data.dataList[i].bill_createdate +'</td><td class="js-closingdate">'+ data.dataList[i].bill_closingdate +'</td><td class="js-billpaid">'+ data.dataList[i].bill_paid +'</td><td>'+ data.dataList[i].u_name +'</td><td><a class="btn btn-default js-billstate">'+ data.dataList[i].bill_state +'</a></td><td><a class="btn btn-warning js-checkout">结账</a> <a class="btn btn-info js-showinfo">详情</a> <a class="btn btn-danger js-deletebill">删除</a></td></tr>');
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

exports.billListobj = billListobj;

});

