/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
Ext.define('ccb.exam.view.login', {
    extend: 'Ext.window.Window',
    alias: 'widget.login',
    closable: false,
    modal: true,
    title: '用户登录',
    layout: 'fit',
    autoShow: true,
    pu : Ext.create('ccb.exam.util.pubUtil',{}),
    
    initComponent: function() {      
        var lmodel = this.pu.loadLocInfo();
        this.items = [
            {
                xtype: 'form',
                id : 'loginform',
                items: [
                    {
                        xtype: 'textfield',
                        name: 'userId',
                        fieldLabel: '用户名',
                        value:lmodel.get('userId')
                    },
                    {
                        xtype: 'textfield',
                        name: 'passWd',
                        fieldLabel: '密码',
                        inputType: 'password'
                    }, {
                        xtype: 'combobox',
                        id : 'screenType',
                        name: 'screenType',
                        fieldLabel: '显示类型',
                        store: this.pu.loadStype() ,
                        queryMode: 'local',
                        displayField: 'type',
                        valueField: 'code',
                        value:lmodel.get('screenType')
                    }
                ]
            }
        ];

        this.buttons = [
            {
                text: '提交',
                action: 'login'
            },
            {
                text: '取消',
                scope: this,
                action: 'close'
            }
        ];

        this.callParent(arguments);
    }
});

