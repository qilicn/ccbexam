/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
Ext.define('ccb.exam.controller.login', {
    extend: 'Ext.app.Controller',
    views: ['login'],
    stores: [
        'userchk',
        'userSessInfo'
    ],
    init: function() {
        this.control({
            'login button[action=login]': {
                click: this.userLogin
            },
            'login button[action=close]': {
                click: this.close
            }
        });
    },
    userLogin: function(button) {
        var win = button.up('window'),
                form = win.down('form'),
                record = form.getRecord(),
                values = form.getValues();

        var msg = Ext.MessageBox.wait('正在验证，请稍后...');
        var store = this.getStore('userchk');
        var proxy = store.getProxy();
        proxy.extraParams = {
            userId: values.userId,
            passWord: values.passWd
        };
        store.load({
            scope: this,
            callback: function(records, operation, success) {
                // the operation object
                // contains all of the details of the load operation
                msg.hide();
                var m = store.getAt(0);
                var bform = form.getForm();
                var retCode = m.get('retCode');
                switch (retCode) {
                    case '0000' :
                        break;
                    case '0006' :
                        bform.setValues([
                            {id: 'passWd', value: ''}
                        ]);
                    default :
                        bform.setValues([
                            {id: 'userId', value: ''},
                            {id: 'passWd', value: ''}
                        ]);
                }

                if (retCode === "0000") {
                    msg.wait("登录成功，进入系统....");
                    m = Ext.create('ccb.exam.model.user', m.get('retVal'));
                    var seStore = Ext.create('ccb.exam.store.userSessInfo', {});
                    seStore.add(m);
                    seStore.sync();
                    window.location.href = exam_golbal.baseUrl + '/desktop/desktop.html';
                    return;
                }

                Ext.MessageBox.alert(m.get('retMsg'));
            }
        });

    },
    close: function(button) {
        var win = button.up('window');
        win.close();
    }


});

