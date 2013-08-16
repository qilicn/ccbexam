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
    msg:null,
    pu : Ext.create('ccb.exam.util.pubUtil',{}),
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
                    this.msg.wait("登录成功，进入系统....");
                    var retVal = m.get('retVal').shortcuts;
                    console.log(retVal);
                    m = Ext.create('ccb.exam.model.user', m.get('retVal'));
                    var funcs = new Array();
                    Ext.Array.each(retVal,function(item){
                        var shortcut = Ext.create('Ext.ux.desktop.ShortcutModel',item);
                        shortcut.set('iconCls',item.iconcls);
                        funcs.push(shortcut);
                    })
                    m.set('shortcuts',funcs);
                    var seStore = Ext.create('ccb.exam.store.userSessInfo', {});
                    seStore.add(m);
                    seStore.sync();
                    var lm = Ext.create('ccb.exam.model.localInfo',{});
                    lm.set('userId',m.get('userId'));
                    lm.set('screenType',bform.findField('screenType').getValue());
                    this.pu.saveLocInfo(lm);
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

