/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
//定义自己应用的基类
//子类使用的时候需要传入:shortcut模型对象及从控制器（如果有的话)
Ext.define('ccb.exam.base.BaseApp', {
    extend: 'Ext.app.Application',
    requires: [
        'Ext.container.Viewport'
    ],
    //定义路径名
    name: 'ccb.exam',
    appFolder: 'exam',
    //初始化类Id(desktop)中需要使用
    id: null,
    //定义控制器
    controllers: [],
    //定义从控制器
    subCtrol: [],
    //定义由后台数据库取到的shortcut模型
    appInfo: null,
    //定义图标的中文名称(兼容desktop框架)
    launcher: {
        //开始菜单的中文名
        text: '',
        //开始菜单的图标
        //命名规则为桌面图标的类，不含-shortcut
        iconCls: ''
    },
    //定义初始化主界面的方法
    //使用appInfo.module作为唯一标识
    initMainWindow: function() {
        return  this.getController(this.appInfo.get('module')).getView(this.appInfo.get('module'));
    },
    //与desktop兼容，使用createWindow来初始化主界面
    createWindow: function() {
        var win = this.initMainWindow();
        return win = Ext.create(win);
    },
    constructor: function(model,subCtrl) {
        //判断shortcut模型是否为空
        this.appInfo = model;
        this.subCtrol = subCtrl;
        if (this.appInfo === null) {
            throw '应用信息为空，无法初始化对象!'
        }
        //创建新的模型对象，防止意外
        this.appInfo = Ext.create('Ext.ux.desktop.ShortcutModel', this.appInfo.getData());
        //开始初始化信息
        //初始化主控制器
        this.controllers.push(this.appInfo.get('module'));
        //如果有从控制器，接着初始化
        if (this.subCtrol !== null) {            
            Ext.Array.each(this.subCtrol, function(item) {
                this.controllers.push(item);
            });
        }
        //初始化launcher结果，用户定义开始菜单的图标与说明
        //只有appscope为desktop的应用才需要初始化图标
        if (this.appInfo.get('appscope') === 'desktop') {
            this.launcher.text = this.appInf.get('name');
            var icons = this.appInfo.get('iconCls').split('-');
            this.launcher.iconCls = icons[0];
        }
        this.callParent();
    }
});

