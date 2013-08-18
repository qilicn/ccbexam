/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
//定义本应用的视图基类
//主要是处理宽窄屏切换以及图标，标题
//初始化的时候需要传入两个自定义参数:appInfo及fitScreen(可选);
Ext.define('ccb.exam.base.BaseView', {
    extend: 'Ext.window.Window',
    autoShow: true,
    hideMode: 'offsets',
    layout: 'fit',
    //定义是否支持宽窄屏切换
    //默认支持
    fitScreen: true,
    //默认载入读取宽窄屏的类
    pu: null, //Ext.create('ccb.exam.util.pubUtil',{}),
    //载入应用类
    appInfo: null,
    border: false,
    animCollapse: false,
    //初始化方法
    constructor: function(cfg) {

        console.log('base constructor');
        var me = this;
        Ext.apply(me, cfg);
        if (me.appInfo === null) {
            throw 'function info not init....';
            return;
        }

        //如果需要处理宽窄屏切换，
        //在此计算创建窗口的高与宽
        if (me.fitScreen) {
            //从本地取得屏幕类型
            me.pu = Ext.create('ccb.exam.util.pubUtil', {});
            var lmodel = me.pu.loadLocInfo();
            var st = lmodel.get('screenType');
            //检查屏幕类型是否合法，不合法默认窄屏类型
            switch (st) {
                case 'w':
                    //定义宽屏窗口大小
                    me.width = exam_golbal.wwidth * exam_golbal.radio;
                    me.height = exam_golbal.wheight * exam_golbal.radio;
                    break;
                default :
                    //默认情况定义窄屏的高宽
                    me.width = exam_golbal.swidth * exam_golbal.radio;
                    me.height = exam_golbal.sheight * exam_golbal.radio;
                    break;
            }
        }

        //定义窗口ID
        me.id = me.appInfo.module;
        //定义窗口标题
        me.title = me.appInfo.name;
        //定义窗口图标
        me.iconCls = me.appInfo.module;



        this.callParent(arguments);

    },
    initComponent: function() {
        console.log('init base view');
        this.callParent(arguments);
    }
});

