define(function(require, exports, module) {

  addUserobj = function (){

    this.addUserHtml = '<div class="addnewuser">\
                <form class="form-horizontal" role="form">\
                    <div class="form-group">\
                        <div class="col-sm-6">\
                            <label class="col-sm-2 control-label">姓名：</label>\
                            <div class="col-sm-4">\
                              <input type="text" class="form-control" id="username" placeholder="会员姓名">\
                              <span class="glyphicon form-control-feedback">*</span>\
                            </div>\
                        </div>\
                        <div class="col-sm-6">\
                            <label class="col-sm-2 control-label">性别：</label>\
                            <div class="col-sm-4">\
                                <select id="sex" class="form-control">\
                                  <option>男</option>\
                                  <option>女</option>\
                                </select>\
                            </div>\
                        </div>\
                    </div>\
                    <div class="form-group">\
                        <div class="col-sm-6">\
                            <label class="col-sm-2 control-label">电话：</label>\
                            <div class="col-sm-4">\
                              <input type="text" class="form-control" id="uphone" placeholder="联系电话">\
                              <span class="glyphicon form-control-feedback">*</span>\
                            </div>\
                        </div>\
                        <div class="col-sm-6">\
                            <label class="col-sm-2 control-label">生日：</label>\
                            <div class="col-sm-4">\
                              <input type="text" class="form-control" id="ubirth" placeholder="出生日期">\
                            </div>\
                        </div>\
                    </div>\
                    <div class="form-group">\
                        <div class="col-sm-6">\
                            <label class="col-sm-2 control-label">卡类型：</label>\
                            <div class="col-sm-3">\
                                <select id="cardtype" class="form-control">\
                                </select>\
                            </div>\
                            <div class="col-sm-1">\
                                <a data-target=".bs-cardtype" data-toggle="modal" class="btn btn-default">+类型</a>\
                            </div>\
                        </div>\
                        <div class="col-sm-6">\
                            <label class="col-sm-2 control-label">卡号：</label>\
                            <div class="col-sm-4">\
                              <input type="text" class="form-control" id="ucard" placeholder="会员卡号">\
                            </div>\
                        </div>\
                    </div>\
                    <div class="form-group">\
                        <div class="col-sm-6">\
                            <label class="col-sm-2 control-label">实收：</label>\
                            <div class="col-sm-4">\
                              <input type="text" class="form-control" id="ubalance" placeholder="实收金额">\
                            </div>\
                        </div>\
                        <div class="col-sm-6">\
                            <label class="col-sm-2 control-label">日期：</label>\
                            <div class="col-sm-4">\
                              <input type="text" class="form-control" id="usigndate" placeholder="开卡日期">\
                            </div>\
                        </div>\
                    </div>\
                    <div class="form-group text-center">\
                          <a data-fname="addUserBtn" class="btn btn-danger">添&nbsp;&nbsp;加</a>\
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
              添加成功！\
            </div>\
          </div>\
      </div>\
    </div>\
    <div class="modal fade bs-cardtype" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">\
      <div class="modal-dialog modal-sm">\
        <div class="modal-content">\
            <div class="modal-header">\
              <button data-dismiss="modal" class="close" type="button"><span aria-hidden="true">×</span><span class="sr-only">Close</span></button>\
              <h4 id="mySmallModalLabel" class="modal-title">添加卡类型</h4>\
            </div>\
            <div class="modal-body">\
                <form class="form-horizontal" role="form">\
                <div class="form-group">\
                    <input type="text" class="form-control" id="cardTypeName" placeholder="卡类型名称">\
                </div>\
                <div class="form-group">\
                    <input type="number" step="0.01" min="0.01" max="1" class="form-control" id="cardTypeDiscount" placeholder="折扣率（默认1不打折）">\
                </div>\
                <a data-fname="addCardType" class="btn btn-default col-sm-offset-5">提交</a>\
                </form>\
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
    { //author: meizz   
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

  addUserobj.prototype = {
      
      init: function (){

        var that = this;
        this.$panelbody.html(this.addUserHtml);
        $('#usigndate').val(new Date().Format("yyyy-MM-dd"));

        this.ADO.select({tname:'cardtype', conditions: ['a_id=' + $('.js-aid').val()]}, function (data){

            for(var i = 0; i < data.dataList.length; i++){
                that.$panelbody.find('#cardtype').append('<option value="'+ data.dataList[i].cardtype_id +'">'+ data.dataList[i].cardtype_name +'</option>');
            }

        });

      }

  }

exports.addUserobj = addUserobj;

});