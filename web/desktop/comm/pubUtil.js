/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
Ext.define('comm.pubUtil', {
    alias: ['pubUtil'],
    require: ['Ext.ux.desktop.Wallpaper'],
    statics: {
        loadStype: function() {
            var store = Ext.create('Ext.data.Store', {
                fields: ['type', 'code'],
                data: [
                    {type: '宽屏显示', code: 'w'},
                    {type: '窄屏显示', code: 's'}
                ]
            });
            return store;
        },
        //读取本地存储内容
        loadLocInfo: function() {
            var store = Ext.create('ccb.exam.store.localInfo', {});
            store.load();
            if (store.getCount() === 0) {
                return Ext.create('ccb.exam.model.localInfo', {});
            } else {
                return store.getAt(0);
            }
        },
        //保存本地存储内容
        saveLocInfo: function(model) {
            var store = Ext.create('ccb.exam.store.localInfo', {});
            store.load();
            store.removeAll();
            store.sync();
            store.load();
            store.add(model);
            store.sync();
        },
        //载入用户选择的壁纸
        loadWallPaper: function() {
            var model = this.loadLocInfo();
            if (model.get('wallpage') === '') {
                Ext.create('Ext.ux.desktop.Wallpaper').setWallpaper(defaultwp, false);
            } else {
                Ext.create('Ext.ux.desktop.Wallpaper').setWallpaper(model.get('wallpage'), false);
            }
        },
        //配置窗口信息
        test: function() {
            console.log("hello");
        },
        //设置窗口属性
        extWinCfg: function(appInfo, fitScreen) {
            var lmodel = this.loadLocInfo();
            var obj = new Object();
            if (fitScreen) {
                var st = lmodel.get('screenType');
                //检查屏幕类型是否合法，不合法默认窄屏类型
                switch (st) {
                    case 'w':
                        //定义宽屏窗口大小
                        obj.width = comm.pubUtil.wwidth * comm.pubUtil.radio;
                        obj.height = comm.pubUtil.wheight * comm.pubUtil.radio;
                        break;
                    default :
                        //默认情况定义窄屏的高宽
                        obj.width = comm.pubUtil.swidth * comm.pubUtil.radio;
                        obj.height = comm.pubUtil.sheight * comm.pubUtil.radio;
                        break;
                }

            }
            //定义窗口ID
            obj.id = appInfo.module;
            //定义窗口标题
            obj.title = appInfo.name;
            //定义窗口图标
            obj.iconCls = appInfo.module;

            return obj;
        },
        //用户session异常后返回
        sessTimeOut: function(Msg, Msg2) {
            var txt1, txt2;
            if (Msg) {
                txt1 = Msg;
                txt2 = Msg2;
            } else {
                txt1 = '未登录用户';
                txt2 = '您未经过登录验证或已超时，请重新登陆';
            }
            Ext.Msg.alert(txt1, txt2, function() {
                var store = Ext.create('ccb.exam.store.userSessInfo', {});
                store.removeAll();
                store.sync();
                store = Ext.create('ccb.exam.store.commlog', {});
                store.removeAll();
                store.sync();
                window.location.href = comm.pubUtil.baseUrl + '/desktop/login.html';
            })
        },
        //获取用户sess
        getUserInfo: function() {
            var Store = Ext.create('ccb.exam.store.userSessInfo', {});
            Store.load();

            //如果为零，意味着获取失败
            //需要重新登陆
            if (Store.getCount() === 0) {
                comm.pubUtil.sessTimeOut();
                return;
            }
            //返回用户登录时带来的retVal
            return Store.getAt(0).data.retVal;
        },
        //记录用户通讯失败日志
        storeErrLog: function(Msg) {
            var Store = Ext.create('ccb.exam.store.commlog', {});
            Store.load();
            var model = Ext.create('ccb.exam.model.RetModel', Msg);
            Store.add(model);
            Store.sync();
        },
        getErrLog: function(Msg) {
            var Store = Ext.create('ccb.exam.store.commlog', {});
            Store.load();
            var vt = new Array();
            Store.each(function(item) {
                vt.push(item);
            }, this)
            return vt;
        },
        getBform: function(button) {
            var win = button.up('window');
            var form = win.down('form');
            var bform = form.getForm();
            return bform;
        },
        baseUrl: 'http://localhost:8084/ccbexam',
        wwidth: 800,
        wheight: 600,
        swidth: 700,
        sheight: 525,
        radio: 1,
        basepkg: 'ccb.exam.app',
        defaultwp: 'wallpapers/desktop2.jpg'
    }
});

