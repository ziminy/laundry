define(function(require, exports, module) {

  cardListobj = function (){

    this.clothesListHtml = '<div class="col-sm-6">\
                            <div class="col-sm-3">\
                              <input type="text" class="form-control" id="yiwuname" placeholder="会员卡名称">\
                            </div>\
                            <div class="col-sm-3">\
                              <input type="text" class="form-control" id="shixi" placeholder="折扣率(1为不打折；0.8为八折)">\
                            </div>\
                            <div class=" col-sm-2">\
                              <a class="btn btn-success js-addyiwu">添加卡类型</a>\
                            </div>\
                        </div>\
                        <table class="table table-striped table-hover js-billlist">\
                        <thead>\
                          <tr>\
                            <th>会员卡名称</th>\
                            <th>折扣率</th>\
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
                              </div>\
                            </div>\
                        </div>\
                      </div>\
                      <a data-start="0" data-count="50" class="js-loadmore btn btn-success col-sm-offset-5">加载更多</a>';

    this.$panelbody = $('.js-panel-body');
    this.aid = $('.js-aid').val();
    this.ADO = new ado();
    
  }

  cardListobj.prototype = {
      
      init: function (){

        var that = this;
        this.$panelbody.html(this.clothesListHtml);
        this.$billlist = $('.js-billlist tbody');
        this.$loadmore = $('.js-loadmore');
        this.pageCount = parseInt(this.$loadmore.data('count'));

        that.showBillList();

        that.$loadmore.click(function(event) {
          that.showBillList();
        });

        $('#yiwuname').focus();
        $('.js-addyiwu').click(function(event) {
          var clothesname = $('#yiwuname').val();
          var clothesprice = $('#shixi').val();
          clothesprice = clothesprice ? clothesprice : '1';
          that.ADO.insert({
              tname: 'cardtype',
              tfield: 'cardtype_name,cardtype_discount,a_id',
              cardtype_name: clothesname,
              a_id: that.aid,
              cardtype_discount: clothesprice}, function (){
                that.showBillList();
              });
        });

        // delete
        that.$panelbody.on('click', '.js-deleteclothes', function(){

          var thisTr = $(this).parent().parent();
          var clothesId = thisTr.find('.js-clothesid').val();

          if(confirm("确定要删除吗？")){

          that.ADO.remove({
              tname: 'cardtype',
              idname: 'cardtype_id',
              ids: clothesId}, function (data){
                  thisTr.remove();
            });

          }

        });

        // update
        that.$panelbody.on('click', '.js-updateclothes', function(){

          var thisTr = $(this).parent().parent();
          var clothesId = thisTr.find('.js-clothesid').val();
          var discount = thisTr.find('.js-discount').val();
          var cardname = thisTr.find('.js-cardname').val();

          // if(confirm("确定要修改吗？")){

            that.ADO.update({
              tname: 'cardtype',
              idname: 'cardtype_id',
              delid: clothesId,
              tfield: 'cardtype_discount,cardtype_name',
              cardtype_name: cardname,
              cardtype_discount: discount}, function (data){
                alert('修改成功');
            });

          // }

        });

      },
      getLimit: function (){
        return this.$loadmore.data('start') + ',' + this.$loadmore.data('count');
      },
      showBillList: function (){

        var that = this;
        that.$loadmore.html('加载更多...');
        that.ADO.select({
              tname:'admin,cardtype',
              conditions: ['admin.a_id='+ that.aid, 'cardtype.a_id=admin.a_id']}, function (data){

          var len = data.dataList.length;
          that.$billlist.html('');
          for(var i = 0; i < len; i++){
              that.$billlist.append('<tr><input class="js-clothesid" value="'+ data.dataList[i].cardtype_id +'" type="hidden" /><td><input class="js-cardname" type="text" value="'+ data.dataList[i].cardtype_name +'" /></td><td><input class="js-discount" type="text" value="'+ data.dataList[i].cardtype_discount +'" /></td><td><a class="btn btn-danger js-updateclothes">修改</a> <a class="btn btn-danger js-deleteclothes">删除</a></td></tr>');
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

exports.cardListobj = cardListobj;

});

