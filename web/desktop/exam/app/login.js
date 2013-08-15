/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
Ext.define('ccb.exam.app.login',{
    extend: 'Ext.app.Application', 
    name: 'ccb.exam',
    appFolder: 'exam',
    controllers: [
        'login'
    ],   
    launch: function() {
        var win = this.getController('login').getView('login');
        win = Ext.create(win);
        win.show();
    }
    
});

