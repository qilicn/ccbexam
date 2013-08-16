/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
Ext.define('ccb.exam.util.pubUtil', {
    alias : ['pubUtil'],
    require :[''],
    loadStype: function() {
        var store = Ext.create('Ext.data.Store', {
            fields: ['type', 'code'],
            data: [
                {type: '宽屏显示', code: 'w'},
                {type: '窄屏显示', code: 's'}
            ]
        });
        return store;
    },
    //读取本地存储内容
    loadLocInfo: function() {
        var store = Ext.create('ccb.exam.store.localInfo', {});
        store.load();
        if (store.getCount() === 0) {
            return Ext.create('ccb.exam.model.localInfo',{});
        } else {
            return store.getAt(0);
        }
    },
    //保存本地存储内容
    saveLocInfo: function(model) {
        var store = Ext.create('ccb.exam.store.localInfo', {});
//        store.load();
//        store.removeAll();
//        store.sync();
        store.insert(0,[model]);
        store.sync();
    }
});

