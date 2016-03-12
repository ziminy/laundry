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

    
    ado = function (options){

        options = $.extend({
            // callback
            interface: 'api/'      // 接口
        }, options);

        this.options = options;

    }

    ado.prototype = {

        /**
         * select
         * @dataObj: {
         *      tname: '',      // 表名（不能为空）
         *      conditions: '', // where条件
         *      limit: ''       // limit
         *  }
         * @complete: 操作成功的回调函数
         * @example: new ado().select({
         *                tname:'user,cardtype',
         *                conditions: 'user.a_id='+ that.aid +' and cardtype.cardtype_id=user.cardtype_id',
         *                limit: '0,5'}, function (data){
         *                  console.log(data);
         *              });
         */
        select: function (dataObj, complete){
            $.ajax({
                url: this.options.interface + 'getdata.php',
                dataType: "json",
                data: dataObj,
                cache:false,
                success: function (data) {
                    // 回调函数
                    complete ? complete(data) : '';
                }
            });
        },
        /**
         * insert
         * @dataObj: {
         *      tname: '',      // 表名
         *      tfield: '',     // 字段名集合
         *      u_name: '',     // 字段名的值
         *      u_card: '',     // 字段名的值
         *      u_phone: ''     // 字段名的值
         *  }
         *  @complete: 操作成功的回调函数
         *  @example: new ado().insert({
         *               tname: 'user',
         *               tfield: 'u_name,u_phone,u_card',
         *               u_name: '成功啦',
         *               u_card: '999999999',
         *               u_phone: 'uphone'}, function (data){
         *                  console.log(data);
         *            });
         */
        insert: function (dataObj, complete){
            $.ajax({
                url: this.options.interface + 'insert.php',
                dataType: "json",
                data: dataObj,
                cache:false,
                complete: function (data) {
                    // 回调函数
                    complete ? complete(data) : '';
                }
            });
        },
        /**
         * remove
         * @dataObj: {
         *      tname: 'user',      // 表名
         *      idname: 'u_id',     // 根据哪个字段删除
         *      ids: '14,15,17'     // 根据数组中的值删除对应的记录
         *  }
         *  @complete: 操作成功的回调函数
         *  @example: new ado().remove({
         *               tname: 'user',
         *               idname: 'u_id',
         *               ids: '14,15,17'}, function (data){
         *                  console.log(data);
         *            });
         */
        remove: function (dataObj, complete){
            $.ajax({
                url: this.options.interface + 'delete.php',
                dataType: "json",
                data: dataObj,
                cache:false,
                complete: function (data) {
                    // 回调函数
                    complete ? complete(data) : '';
                }
            });
        },
        /**
         * update
         * @dataObj: {
         *      tname: '',      // 表名
         *      idname: '',     // 根据哪个字段修改
         *      tfield: '',     // 修改的字段名
         *      u_name: '',     // 字段名的值
         *      u_card: '',     // 字段名的值
         *      u_phone: ''     // 字段名的值
         *  }
         *  @complete: 操作成功的回调函数
         *  @example: new ado().update({
         *              tname: 'user',
         *              idname: 'u_id',
         *              delid: '18',
         *              tfield: 'u_name,u_phone,u_card',
         *              u_name: '成功啦',
         *              u_card: '999999999',
         *              u_phone: 'uphone'}, function (data){
         *                  console.log(data);
         *            });
         */
        update: function (dataObj, complete){
            $.ajax({
                url: this.options.interface + 'update.php',
                dataType: "json",
                data: dataObj,
                cache:false,
                complete: function (data) {
                    // 回调函数
                    complete ? complete(data) : '';
                }
            });
        },

    }

    exports.ado = ado;
    
});