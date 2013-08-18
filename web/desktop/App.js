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
        'ccb.exam.app.*',
//        'ccb.exam.app.login',
        'MyDesktop.Settings'
    ],
    //用户的功能列表store
    funcStore:null,
    //用户信息[model='ccb.exam.model.user']
    userSessInfo : null, 
    mds :null,
    
    //获取用户session信息
    getSessStore: function(){
        var me = this;
        var Store = Ext.create('ccb.exam.store.userSessInfo',{});
        Store.load();

        if( Store.getCount() === 0){
            this.userSessInfo = null;
            return;
        }
        //取出用户信息
        var retModel = Store.getAt(0);
        this.userSessInfo = Ext.create('ccb.exam.model.user',retModel.get('retVal'));
        //rv : 用户的功能列表
        //后台数据库将字段全部小写，在此转换
        //后台只传递module,name，其他在此拼写
        var rv = retModel.get('retVal').shortcuts;
        var shortcuts = new Array();
        Ext.Array.each(rv,function(item){
            var v = item.module;
            item.iconCls = v+'-shortcut';
            item.class = exam_golbal.basepkg+'.'+v;
            shortcuts.push(item);
        });
        
        this.mds = new Array();
//        Ext.Array.each(shortcuts,function(item){
//            var model = Ext.create('Ext.ux.desktop.ShortcutModel',item);
//            var module = Ext.create(item.class,model);
//            this.mds.push(module);            
//        },this);
        for( ii = 0 ; ii < shortcuts.length ; ii ++  ){
            var item = shortcuts[ii];
            debugger;
            var appCLass = Ext.ClassManager.get(item.class);
            console.log(appCLass);
            var module =  new appCLass(item);
            this.mds[ii]=module;
            console.log(this.mds);
        }
        
        //创建功能列表的store
        this.funcStore = Ext.create('ccb.exam.store.FuncStore',{data:shortcuts});     
    },
    init: function() {
        
        //判断用户是否通过验证

        this.getSessStore();
        if( this.userSessInfo === null){
            Ext.Msg.alert('未登录用户','您未经过登录验证或已超时，请重新登陆',function(){
                window.location.href = exam_golbal.baseUrl + '/desktop/login.html';
            })
        }         

        this.callParent();
        // now ready...
    },

    getModules : function(){
        return this.mds;
    },

    getDesktopConfig: function () {
        var me = this, ret = me.callParent();

        return Ext.apply(ret, {
              shortcuts:this.funcStore,


            wallpaper: 'wallpapers/desktop2.jpg',
            wallpaperStretch: false
        });
    },

    // config for the start menu
    getStartConfig : function() {
        var me = this, ret = me.callParent();

        return Ext.apply(ret, {
            title: this.userSessInfo.get('username'),
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
                        text:'注销',
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
//            quickStart: [
//                { name: 'Accordion Window', iconCls: 'accordion', module: 'acc-win' },
//                { name: 'Grid Window', iconCls: 'icon-grid', module: 'grid-win' }
//            ],
            trayItems: [
                { xtype: 'trayclock', flex: 1 }
            ]
        });
    },

    onLogout: function () {
        Ext.Msg.confirm('确认退出系统', '您确认退出系统吗？所有未保存的记录将被清除!',function(){
            Ext.Msg.wait('注销中，请稍后....');
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
