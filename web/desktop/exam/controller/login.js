/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
Ext.define('ccb.exam.controller.login', {
    extend: 'Ext.app.Controller',
    
    views:['login'],
    stores:[
        'userchk'
    ],
    init: function() {
        this.control({
            'login button[action=login]':{
                click : this.userLogin
            }
        });   
    },    
    userLogin : function(button){
        var win = button.up('window'),
                form = win.down('form'),
                record = form.getRecord(),
                values = form.getValues();
        var store = this.getStore('userchk');
        var proxy = store.getProxy();
        proxy.extraParams = {
            userId : values.userId,
            passWord : values.passWd
        };
        store.load();
    }
});

