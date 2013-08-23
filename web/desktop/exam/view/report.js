/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
//用户增删改工作日志的视图
Ext.define('ccb.exam.view.report', {
    extend: 'Ext.window.Window',
    alias: 'widget.report',
    width: 400,
    height: 300,
    layout: 'fit',
    title : '工作汇报',
    initComponent: function() {
        Ext.QuickTips.init();
        var dateStr = '可汇报'+ comm.pubUtil.range+'日内的事项';
        this.items = [{
                xtype: 'form',
                id: 'report',
                defaults: {
                    msgTarget: 'under'
                },                
                items: [{
                        xtype: 'combo',
                        id : 'rdate',
                        name : 'rdate',
                        fieldLabel: '汇报日期',
                        listConfig: {
                            loadingText: '加载可用的汇报期，请稍后....',
                            emptyText: '未找到可用的汇报期',
                            maxheight: 200
                        },
                        minWidth : 100,
                        valueField: 'workdate',
                        displayField: 'workdate',
                        //forceSelection : true,
                        value : dateStr,
                        triggleAction: 'all'
                    },
                    {
                        xtype: 'combo',
                        id : 'rtype',
                        name : 'rtype',
                        fieldLabel: '汇报类型',
                        minWidth : 100,
                        store : comm.pubUtil.workType,
                        value : '部门工作',
                        forceSelection : true
                    },{
                        xtype:'textareafield',
                        id : 'rept',
                        name : 'rept',
                        fieldLabel: '工作内容',
                        anchor: '90%',
                        selectOnFocus : true,
                        value : '汇报事项最多为250个汉字'
                    }]
            }];
        this.buttons = [
            {
                text: '提交',
                id :'submit',
                action: 'submit'
            },
            {
                text: '清除',
                scope: this,
                id : 'clear',
                action: 'clear'
            }
        ];
        this.callParent(arguments);
    }
});

