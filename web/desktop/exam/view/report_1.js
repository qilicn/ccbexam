/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
//用户删改工作日志的视图
Ext.define('ccb.exam.view.report_1', {
    extend: 'Ext.window.Window',
    alias: 'widget.report_1',
    width: 400,
    height: 300,
    layout: 'fit',
    title: '工作汇报事项维护',
    modal: true,
    initComponent: function() {
        Ext.QuickTips.init();
        //var dateStr = '可汇报'+ comm.pubUtil.range+'日内的事项';
        this.items = [{
                xtype: 'form',
                id: 'report_1',
                defaults: {
                    msgTarget: 'under'
                },
                items: [{
                        xtype : 'textfield',
                        fieldLabel : '事项序号',
                        id : 'id',
                        name : 'id',
                        readOnly : true
                    },
                    {
                        xtype: 'combo',
                        id: 'rdate',
                        name: 'rdate',
                        fieldLabel: '汇报日期',
                        listConfig: {
                            loadingText: '加载可用的汇报期，请稍后....',
                            emptyText: '未找到可用的汇报期',
                            maxheight: 200
                        },
                        minWidth: 100,
                        valueField: 'workdate',
                        displayField: 'workdate',
                        //forceSelection : true,
                        //value : dateStr,
                        triggleAction: 'all'
                    },
                    {
                        xtype: 'combo',
                        id: 'rtype',
                        name: 'rtype',
                        fieldLabel: '汇报类型',
                        minWidth: 100,
                        store: comm.pubUtil.workType,
                        //value : '部门工作',
                        forceSelection: true
                    }, {
                        xtype: 'textareafield',
                        id: 'rept',
                        name: 'rept',
                        fieldLabel: '工作内容',
                        anchor: '90%',
                        //selectOnFocus : true,
                        //value : '汇报事项最多为250个汉字'
                    }]
            }];
        this.buttons = [
            {
                text: '修改',
                id: 'submit',
                action: 'submit'
            },
            {
                text: '删除',
                id: 'delete',
                action: 'delete'
            }, {
                text: '取消',
                id: 'cancel',
                action: 'cancel'
            }
        ];
        this.callParent(arguments);
    }
});

