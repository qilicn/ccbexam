/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
Ext.define('ccb.exam.controller.login', {
    extend: 'Ext.app.Controller',
    
    views:['login'],
    stores:[
        'userchk',
        'userSessInfo'
    ],
    init: function() {
        this.control({
            'login button[action=login]':{
                click : this.userLogin
            },
            'login button[action=close]':{
                click : this.close
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
        var sessStore = this.getStore('userSessInfo');
        sessStore.removeAll();
        sessStore.add(store.first());
        sessStore.sync();
    },
    
    close : function(button){
        var win = button.up('window');
        win.close();
    }
            
    
});

