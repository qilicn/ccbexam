/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
Ext.define('ccb.exam.app.login',{
    extend: 'Ext.app.Application', 
    requires: [
        'Ext.container.Viewport'
    ],    
    name: 'ccb.exam',
    appFolder: 'exam',
    controllers: [
        'login'
    ],   
    id : 'login',
    launch: function() {
        Ext.create('Ext.container.Viewport', {
            border: false,
            layout: 'fit',
            items : {
                xtype : 'login'
            }
        });
//        var win = this.getController('login').getView('login');
//        win = Ext.create(win);
//        win.show();
    }
    
});

