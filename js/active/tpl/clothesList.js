define(function(require, exports, module) {

  clothesListobj = function (){

    this.clothesListHtml = '<div class="col-sm-6">\
                            <div class="col-sm-3">\
                              <input type="text" class="form-control" id="yiwuname" placeholder="衣服名称">\
                            </div>\
                            <div class="col-sm-3">\
                              <input type="text" class="form-control" id="shixi" placeholder="湿洗价格">\
                            </div>\
                            <div class="col-sm-3">\
                              <input type="text" class="form-control" id="ganxi" placeholder="干洗价格">\
                            </div>\
                            <div class=" col-sm-2">\
                              <a class="btn btn-success js-addyiwu">添加衣物</a>\
                            </div>\
                        </div>\
                        <table class="table table-striped table-hover js-billlist">\
                        <thead>\
                          <tr>\
                            <th>名称</th>\
                            <th>湿洗价格</th>\
                            <th>干洗价格</th>\
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

  clothesListobj.prototype = {
      
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
          var clothesdryprice = $('#ganxi').val();
          that.ADO.insert({
              tname: 'clothes',
              tfield: 'clothes_name,clothes_price,clothes_dryprice,a_id',
              clothes_name: clothesname,
              a_id: that.aid,
              clothes_price: clothesprice,
              clothes_dryprice: clothesdryprice}, function (){
                that.showBillList();
              });
        });

        that.$panelbody.on('click', '.js-deleteclothes', function(){

          var thisTr = $(this).parent().parent();
            var clothesId = thisTr.find('.js-clothesid').val();

            if(confirm("确定要删除吗？")){

            that.ADO.remove({
                tname: 'clothes',
                idname: 'clothes_id',
                ids: clothesId}, function (data){
                    thisTr.remove();
              });

            }

        });

      },
      getLimit: function (){
        return this.$loadmore.data('start') + ',' + this.$loadmore.data('count');
      },
      showBillList: function (){

        var that = this;
        that.$loadmore.html('加载更多...');
        that.ADO.select({
              tname:'admin,clothes',
              conditions: ['admin.a_id='+ that.aid, 'clothes.a_id=admin.a_id']}, function (data){

          var len = data.dataList.length;
          that.$billlist.html('');
          for(var i = 0; i < len; i++){
              that.$billlist.append('<tr><input class="js-clothesid" value="'+ data.dataList[i].clothes_id +'" type="hidden" /><td>'+ data.dataList[i].clothes_name +'</td><td>'+ data.dataList[i].clothes_price +'</td><td>'+ data.dataList[i].clothes_dryprice +'</td><td><a class="btn btn-danger js-deleteclothes">删除</a></td></tr>');
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

exports.clothesListobj = clothesListobj;

});

