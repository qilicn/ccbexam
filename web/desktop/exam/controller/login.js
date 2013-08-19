/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
//用户登录功能
Ext.define('ccb.exam.controller.login', {
    extend: 'Ext.app.Controller',
    views: ['login'],
    stores: [
        'userchk',
        'userSessInfo'
    ],
    msg: null,
   // pu: Ext.create('ccb.exam.util.pubUtil', {}),
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
                values = form.getValues();

        this.msg = Ext.MessageBox.wait('正在验证，请稍后...');
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
                this.msg.hide();
                var m = store.getAt(0);
                var bform = form.getForm();
                var retCode = m.get('retCode');
                switch (retCode) {
                    case '0000' :
                        break;
                    case '0005' :
                        bform.setValues([
                            {id: 'userId', value: ''},
                            {id: 'passWd', value: ''}
                        ]);
                    default :
                        bform.setValues([
                            {id: 'passWd', value: ''}
                        ]);
                }
                if (retCode === "0000") {
                    this.msg.wait("登录成功，进入系统....");
                    var seStore = Ext.create('ccb.exam.store.userSessInfo', {});
                    var um = Ext.create('ccb.exam.model.RetModel',m.getData());
                    seStore.load();
                    seStore.removeAll();
                    seStore.sync();
                    seStore.add(um);
                    seStore.sync();
                    var lm = Ext.create('ccb.exam.model.localInfo',{});
                    var userModel = Ext.create('ccb.exam.model.user',m.get('retVal'));
                    lm.set('userId',userModel.get('userid'));
                    lm.set('screenType',bform.findField('screenType').getValue());
                    comm.pubUtil.saveLocInfo(lm);
                    window.location.href = comm.pubUtil.baseUrl + '/desktop/desktop.html';
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

