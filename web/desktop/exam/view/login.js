/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
Ext.define('ccb.exam.view.login', {
    extend: 'Ext.window.Window',
    requier: [
        'comm.pubUtil'
    ],
    uses: [
        'Ext.ux.desktop.Wallpaper'
    ],
    alias: 'widget.login',
    closable: false,
    draggable : false,
    //modal: true,
    title: '用户登录',
  //  layout: 'fit',
    autoShow: true,
    id: 'login',
    initComponent: function() {
        var lmodel = comm.pubUtil.loadLocInfo();
        this.items = [
            {
                xtype: 'form',
                id: 'loginform',
                items: [
                    {
                        xtype: 'textfield',
                        name: 'userId',
                        fieldLabel: '用户名',
                        value: lmodel.get('userId')
                    },
                    {
                        xtype: 'textfield',
                        name: 'passWd',
                        fieldLabel: '密码',
                        inputType: 'password'
                    }, {
                        xtype: 'combobox',
                        id: 'screenType',
                        name: 'screenType',
                        fieldLabel: '显示类型',
                        store: comm.pubUtil.loadStype(),
                        queryMode: 'local',
                        displayField: 'type',
                        valueField: 'code',
                        value: lmodel.get('screenType')
                    },
                    {
                        xtype : 'displayfield',
                        id : 'errorMsg',
                        name : 'errorMsg',   
                        fieldStyle:'color:read',
                        value:'请输入用户信息'
                    }
                ]
            }
//            {xtype: 'wallpaper', id: this.id + '_wallpaper'},
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
//        this.wallpaper = this.items.getAt(1);
//        this.wallpaper.setWallpaper(comm.pubUtil.defaultwp,false);
    }
});

