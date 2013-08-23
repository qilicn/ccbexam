/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
Ext.define('ccb.exam.controller.workReport', {
    extend: 'Ext.app.Controller',
    require: ['Ext.data.Store'],
    views: [
        'workReport',
        'report'
    ],
    msg: null,
    init: function() {
        this.control({
            'workReport button[id=addReprt]': {
                click: this.addReport
            },
            'report combo[id=rtype]': {
                change: this.recvChange
            },
            'report button[id=submit]': {
                click: this.createRept
            }
        });
    },
    //创建一条工作汇报
    createRept: function(button) {
        Ext.QuickTips.init();
        var bform = comm.pubUtil.getBform(button);
        var param = bform.getValues();
//        var model = Ext.create('ccb.exam.model.reportInfo',param);
//        var grid = Ext.getCmp('workrpt');
//        var store = grid.getStore();
//        store.add(model);
//        store.reload();

        bform.submit({
            url: comm.pubUtil.baseUrl + '/exam/crtrpt.nutz',
            mothod: 'GET',
            params: param,
            waitMsg: '提交中，请稍后....',
            success: function(form, action) {
                Ext.create('Ext.tip.ToolTip', {
                    target: 'report',
                    html: '该汇报已保存，请创建其他类型报告或关闭',
                    dismissDelay: 3000
                });
                var rdate = bform.findField('rdate');
                rdate.reset();
                var rtype = bform.findField('rtype');
                rtype.reset();

                var grid = Ext.getCmp('workrpt');
                grid.store.loadPage(1);
            },
            failure: function(form, action) {
                var result = action.result;
                comm.pubUtil.storeErrLog(result);
                comm.pubUtil.sessTimeOut('用户超时', '您的空闲时间超过系统允许范围，请重新登录');
            }
        });
    },
    //根据工作类型的不同，选择对应的模板
    recvChange: function(combo, newValue, oldValue) {
        var bform = comm.pubUtil.getBform(combo);
        var rept = bform.findField('rept');
        rept.setValue('');
        Ext.apply(rept, {
            selectOnFocus: false
        });
        switch (newValue) {
            case '客户走访':
                rept.setValue(comm.pubUtil.custTemp);
                break;
            case '基层调研' :
                rept.setValue(comm.pubUtil.researchTemp);
                break;
            case '参加会议' :
                rept.setValue(comm.pubUtil.meetingTemp);
                break;
            default:
                Ext.apply(rept, {
                    selectOnFocus: true
                });
                break;
        }
    },
    addReport: function(button) {
        Ext.regModel('trdate', {
            fields: [
                {name: 'workdate'}
            ]
        });
        var store = Ext.create('Ext.data.Store', {
            model: 'trdate',
            proxy: {
                type: 'ajax',
                url: comm.pubUtil.baseUrl + '/exam/getWorkDate.nutz',
                reader: {
                    root: 'retVal'
                },
                extraParams: {range: comm.pubUtil.range}
            }
        });
        /*
         var combo = bform.findField('cworkdate');
         Ext.apply(combo,{
         queryMode : 'remote',
         store : store
         });
         */
        var view = Ext.widget('report');
        var form = view.down('form');
        var bform = form.getForm();
        var combo = bform.findField('rdate');
        Ext.apply(combo, {
            queryMode: 'remote',
            store: store
        });
        //combo.reset();
        view.show();
    }

});

