/*!
 * Ext JS Library 4.0
 * Copyright(c) 2006-2011 Sencha Inc.
 * licensing@sencha.com
 * http://www.sencha.com/license
 */

Ext.define('MyDesktop.App', {
    extend: 'Ext.ux.desktop.App',

    requires: [
        'Ext.window.MessageBox',
        'Ext.ux.desktop.ShortcutModel',
        'Ext.ux.desktop.Module',
        'MyDesktop.Notepad',
        'ccb.exam.store.userSessInfo',
//        'ccb.exam.app.login',
        'MyDesktop.Settings'
    ],
    logined : false,
    init: function() {
        var store = Ext.create('ccb.exam.store.userSessInfo',{});
        store.load();
        
        this.callParent();
        // now ready...
    },

    getModules : function(){
        return [
//            new MyDesktop.VideoWindow(),
//            //new MyDesktop.Blockalanche(),
//            new MyDesktop.SystemStatus(),
//            new MyDesktop.GridWindow(),
//            new MyDesktop.TabWindow(),
//            new MyDesktop.AccordionWindow(),
            new MyDesktop.Notepad(),
//            new MyDesktop.BogusMenuModule(),
//            new MyDesktop.BogusModule()
        ];
    },

    getDesktopConfig: function () {
        var me = this, ret = me.callParent();

        return Ext.apply(ret, {
            //cls: 'ux-desktop-black',

            contextMenuItems: [
                { text: 'Change Settings', handler: me.onSettings, scope: me }
            ],

            shortcuts: Ext.create('Ext.data.Store', {
                model: 'Ext.ux.desktop.ShortcutModel',
                data: [
//                    { name: 'Grid Window', iconCls: 'grid-shortcut', module: 'grid-win' },
//                    { name: 'Accordion Window', iconCls: 'accordion-shortcut', module: 'acc-win' },
                      { name: 'Notepad', iconCls: 'notepad-shortcut', module: 'notepad' },
//                    { name: 'System Status', iconCls: 'cpu-shortcut', module: 'systemstatus'}
                ]
            }),

            wallpaper: 'wallpapers/Blue-Sencha.jpg',
            wallpaperStretch: false
        });
    },

    // config for the start menu
    getStartConfig : function() {
        var me = this, ret = me.callParent();

        return Ext.apply(ret, {
            title: 'Don Griffin',
            iconCls: 'user',
            height: 300,
            toolConfig: {
                width: 100,
                items: [
                    {
                        text:'Settings',
                        iconCls:'settings',
                        handler: me.onSettings,
                        scope: me
                    },
                    '-',
                    {
                        text:'Logout',
                        iconCls:'logout',
                        handler: me.onLogout,
                        scope: me
                    }
                ]
            }
        });
    },

    getTaskbarConfig: function () {
        var ret = this.callParent();

        return Ext.apply(ret, {
            quickStart: [
                { name: 'Accordion Window', iconCls: 'accordion', module: 'acc-win' },
                { name: 'Grid Window', iconCls: 'icon-grid', module: 'grid-win' }
            ],
            trayItems: [
                { xtype: 'trayclock', flex: 1 }
            ]
        });
    },

    onLogout: function () {
        Ext.Msg.confirm('确认退出系统', '您确认退出系统吗？所有未保存的记录将被清楚?',function(){
            //清空session信息
            var store = Ext.create('ccb.exam.store.userSessInfo',{});
            store.removeAll();
            //退到用户登录界面
            window.location.href = exam_golbal.baseUrl + '/desktop/login.html';
        });
    },

    onSettings: function () {
        var dlg = new MyDesktop.Settings({
            desktop: this.desktop
        });
        dlg.show();
    }
});
