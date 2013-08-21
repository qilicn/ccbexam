/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
//用户重置密码的视图
Ext.define('ccb.exam.view.changepass', {
    extend: 'Ext.window.Window',
    alias: 'widget.changepass',
    require: [
        'comm.MyVtype'
    ],
    //  modal: true,
    fitScreen: false,
    layout: 'fit',
    initComponent: function() {
        Ext.QuickTips.init();
        Ext.apply(Ext.form.VTypes, comm.MyVtype.chkPwd());
        this.items = [{
                xtype: 'form',
                id: 'changepassform',
                defaults: {
                    msgTarget: 'under',
                    allowBlank: false,
                    blanText: '请输入',
                    inputType: 'password'
                },
                items: [
                    {
                        xtype: 'textfield',
                        name: 'opassWd',
                        id: 'opassWd',
                        fieldLabel: '旧密码',
                        chkPwd: {of: 'opassWd', ff: 'passWd1', sf: 'passWd2'},
                        vtype: 'chkPwd',
                        minLength: 6
                    },
                    {
                        xtype: 'textfield',
                        name: 'passWd1',
                        id: 'passWd1',
                        fieldLabel: '新密码',
                        chkPwd: {of: 'opassWd', ff: 'passWd1', sf: 'passWd2'},
                        vtype: 'chkPwd',
                        minLength: 6
                    },
                    {
                        xtype: 'textfield',
                        name: 'passWd2',
                        id: 'passWd2',
                        fieldLabel: '再输入新密码',
                        chkPwd: {of: 'opassWd', ff: 'passWd1', sf: 'passWd2'},
                        vtype: 'chkPwd',
                        minLength: 6
                    }, {
                        xtype: 'displayfield'
                    }
                ]
            }];
        this.buttons = [
            {
                text: '提交',
                action: 'change'
            },
            {
                text: '清除',
                scope: this,
                action: 'close'
            }
        ];

        this.callParent(arguments);
    }
});

