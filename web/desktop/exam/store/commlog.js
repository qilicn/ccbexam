/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
//记录通讯的错误信息
Ext.define('ccb.exam.store.commlog',{
    extend : 'Ext.data.Store',
    model : 'ccb.exam.model.RetModel',
    id : 'commlog',
    proxy :{ 
        type : 'sessionstorage',
        id : 'commlogproxy'
    }
});


