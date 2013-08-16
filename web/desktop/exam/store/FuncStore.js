/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
Ext.define('ccb.exam.store.FuncStore',{
    extend : 'Ext.data.Store',
    model:'Ext.ux.desktop.ShortcutModel',
    proxy:{
        type:'sessionstorage',
        id:'funcSotre'
    }
});

