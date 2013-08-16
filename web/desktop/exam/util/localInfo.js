/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
Ext.define('ccb.exam.util.localInfo',{
    //读取本地存储内容
    loadLocInfo : function(){
        var store = Ext.create('ccb.exam.store.localInfo',{});
        store.load();
        if( store.getCount() === 0  ){
            return null;
        }else{
            return store.first();
        }
    },
    //保存本地存储内容
    storeLocInfo  : function(model){
        var store = Ext.create('ccb.exam.store.localInfo',{});
        store.load();
        store.removeAll();
        store.add(model);
        store.sync();
    }
});

