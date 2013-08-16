/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 * 定义用户本地存储的store
 */
Ext.define('ccb.exam.store.localInfo', {
    extend: 'Ext.data.Store',
    model: 'ccb.exam.model.localInfo',
    proxy: {
        type: 'localstorage',
        id: 'ccb.exam.model.localInfo.store'
    }
});

