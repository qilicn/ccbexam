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
    //定义主窗口
    MainWIn: null,
    //定义初始化主界面的方法
    //使用appInfo.module作为唯一标识
    initMainWindow: function() {
        if (this.MainWIn)
            return this.MainWIn;
        else {
            this.MainWIn = this.getController(this.appInfo.module).getView(this.appInfo.module);
            return this.MainWIn;
        }
    },
    //与desktop兼容，使用createWindow来初始化主界面
    createWindow: function() {
        var wincfg = this.initMainWindow();
        var me = this;
        console.log(wincfg);

        //如果在desktop中，需要将win交由desktop处理
        if (this.app) {
            var desktop = this.app.getDesktop();
            var win = desktop.getWindow(this.id);
            if (!win) {
                win = desktop.createWindow({appInfo: this.appInfo}, wincfg);
                return win;
            }

        } else { //测试时单独处理            
            return win = Ext.create(wincfg, {appInfo: this.appInfo});
        }
    },
    constructor: function(model, subCtrl) {
debugger;
        //判断shortcut模型是否为空
        this.appInfo = model;
        this.subCtrol = subCtrl;
        if (this.appInfo === null) {
            throw '应用信息为空，无法初始化对象!'
        }
        //创建新的模型对象，防止意外
//        this.appInfo = Ext.create('Ext.ux.desktop.ShortcutModel', this.appInfo.getData());
        //创建ID
        this.id = this.appInfo.module;
        //开始初始化信息
        //初始化主控制器
        this.controllers.push(this.appInfo.module);
        //如果有从控制器，接着初始化
        if (this.subCtrol !== null) {
            Ext.Array.each(this.subCtrol, function(item) {
                this.controllers.push(item);
            });
        }
        //初始化launcher结果，用户定义开始菜单的图标与说明
        //只有appscope为desktop的应用才需要初始化图标
        if (this.appInfo.appscope === 'desktop') {
            this.launcher.text = this.appInfo.name;
            this.launcher.iconCls = this.appInfo.module;
        }        
        this.callParent();
    }
});

