/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
Ext.define('ccb.exam.controller.workReport', {
    extend: 'Ext.app.Controller',
    require: ['Ext.data.Store'],
    views: [
        'workReport',
        'report',
        'report_1'
    ],
    msg: null,
    init: function() {
        this.control({
            //添加工作事项
            'workReport button[id=addReprt]': {
                click: this.addReport
            },
            //根据工作事项类型更改内容模板
            'report combo[id=rtype]': {
                change: this.recvChange
            },
            'report_1 combo[id=rtype]': {
                change: this.recvChange
            },
            //创建工作事项
            'report button[id=submit]': {
                click: this.createRept
            },
            //修改或删除工作事项
            'workReport grid[id=workrpt]': {
                itemdblclick: this.editReport,
                itemmouseenter: this.showEditable
            },
            //提交修改
            'report_1 button[id=submit]': {
                click: this.updateRept
            },
            //删除事项
            'report_1 button[id=delete]': {
                click: this.deleteRept
            },
            //关闭修改窗口
            'report_1 button[id=cancel]': {
                click: this.cancelEdit
            }
        });
    },
    cancelEdit: function(button) {
        var win = button.up('window');
        win.close();
    },
    deleteRept: function(button) {
        var win = button.up('window');
        var bform = comm.pubUtil.getBform(button);

        Ext.Msg.confirm('删除记录', '该记录将被删除，本操作不能恢复，确认删除吗？', function(answer) {
            if (answer === 'no') {
                win.close();
            } else {
                var grid = Ext.getCmp('workrpt');
                grid.store.remove(bform.getRecord());
                grid.store.reload();
                win.close();
            }

        });
    },
    updateRept: function(button) {

    },
    showEditable: function(grid, record, item, index, e, eOpts) {
        var stscode = record.get('stscode');
        if (stscode !== '0')
            return;
        Ext.QuickTips.init();
        var str = '双击<font color=red>未审批</font>的工作汇报可进行编辑或删除'
        Ext.create('Ext.tip.ToolTip', {
            target: item.id,
            html: str
        });
    },
    editReport: function(grid, record) {
        var stscode = record.get('stscode');
        //如果审批结果不为'0'(未审批），不能修改或删除
        if (stscode !== '0')
            return;
        var win = Ext.widget('report_1');
        var form = win.down('form');
        form.loadRecord(record);
        win.show();
    },
    //创建一条工作汇报
    createRept: function(button) {
        Ext.QuickTips.init();
        var bform = comm.pubUtil.getBform(button);
        var param = bform.getValues();

        var model = Ext.create('ccb.exam.model.reportInfo', param);
        var grid = Ext.getCmp('workrpt');
        grid.store.add(model);
        grid.store.reload();
//        bform.submit({
//            url: comm.pubUtil.baseUrl + '/exam/crtrpt.nutz',
//            mothod: 'GET',
//            params: param,
//            waitMsg: '提交中，请稍后....',
//            success: function(form, action) {
//                Ext.Msg.alert("该汇报已保存，请创建其他类型报告或关闭窗口");
//                var rdate = bform.findField('rdate');
//                rdate.reset();
//                var rtype = bform.findField('rtype');
//                rtype.reset();
//
//                var grid = Ext.getCmp('workrpt');
//                grid.store.reload();
//            },
//            failure: function(form, action) {
//                var result = action.result;
//                comm.pubUtil.storeErrLog(result);
//                comm.pubUtil.sessTimeOut('用户超时', '您的空闲时间超过系统允许范围，请重新登录');
//            }
//        });
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

