/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
//用户重置密码的视图
Ext.define('ccb.exam.view.changepass', {
    extend: 'Ext.window.Window',
    alias: 'widget.changepass',
  //  modal: true,
    fitScreen : false,
    layout: 'fit',
    initComponent: function() {
        Ext.QuickTips.init();
        this.items = [{
                xtype: 'form',
                id: 'changepassform',
                defaults :{
                    msgTarget : 'under',
                    allowBlank: false,
                    blanText : '请输入'
                },
                
                items: [
                    {
                        xtype: 'textfield',
                        name: 'opassWd',
                        fieldLabel: '旧密码',
                        inputType: 'password',
                        minLength: 6
                    },
                    {
                        xtype: 'textfield',
                        name: 'passWd1',
                        fieldLabel: '新密码',
                        inputType: 'password',
                        minLength: 6
                    },
                    {
                        xtype: 'textfield',
                        name: 'passWd2',
                        fieldLabel: '再输入新密码',
                        inputType: 'password',
                        minLength: 6
                    }
                ]
            }];
        this.buttons = [
            {
                text: '提交',
                action: 'change'
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

