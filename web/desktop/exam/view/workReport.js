/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
Ext.define('ccb.exam.view.workReport', {
    extend: 'Ext.window.Window',
    alias: 'widget.workReport',
    layout: 'fit',
    initComponent: function() {
        Ext.QuickTips.init();
        var store = Ext.create('ccb.exam.store.reptStore', {});
        this.items = [{
                id: 'workrpt',
                xtype: 'grid',
                title: '工作汇报',
                renderTo: Ext.getBody(),
                width: '100%',
                heigth: '100%',
                frame: 'true',
                dockedItems: [{
                        xtype: 'toolbar',
                        items: [{
                                iconCls: 'icon-add',
                                text: '新增汇报',
                                id :'addReprt'
                            }]
                    }],
                ViewConfig: {
                    forceFit: true,
                    stripeRows: true
                },
                store: store,
                columns: [
                    {header: '填写日期', dataIndex: 'rdate', width: '15%'},
                    {header: '填写类型', dataIndex: 'rtype', width: '15%'},
                    {header: '填写内容', dataIndex: 'rept', width: '55%'},
                    {header: '状态', dataIndex: 'rstatus', widht: '15%'}
                ]
            }];

        this.callParent(arguments);
    }
});

