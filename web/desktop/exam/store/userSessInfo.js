/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
Ext.define('ccb.exam.store.userSessInfo',{
    extend : 'Ext.data.Store',
    model : 'ccb.exam.model.RetModel',
    id : 'userSessInfo',
    proxy :{ 
        type : 'sessionstorage',
        id : 'userSessProxy'
    }
});

