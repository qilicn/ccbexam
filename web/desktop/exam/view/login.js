/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
Ext.define('ccb.exam.view.login',{
    extend: 'Ext.window.Window',
    alias: 'widget.login',
    closable:false,
    modal:true,
    title: '用户登录',
    layout: 'fit',
    autoShow: true,

    initComponent: function() {
        this.items = [
            {
                xtype: 'form',
                items: [
                    {
                        xtype: 'textfield',
                        name : 'userId',
                        fieldLabel: '用户名'
                    },
                    {
                        xtype: 'textfield',
                        name : 'passWd',
                        fieldLabel: '密码',
                        inputType:'password'
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
                action:'close'
            }
        ];

        this.callParent(arguments);
    }
});

