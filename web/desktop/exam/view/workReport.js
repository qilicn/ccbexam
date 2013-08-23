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
                renderTo: Ext.getBody(),
                width: '100%',
                heigth: '100%',
                frame: 'true',
                dockedItems: [{
                        xtype: 'toolbar',
                        items: [{
                                iconCls: 'icon-add',
                                text: '新增汇报',
                                id: 'addReprt'
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
                    {header: '状态', dataIndex: 'stscode', widht: '15%',renderer : this.formatRes}
                ]
            }];

        this.callParent(arguments);
    },
    formatRes: function(value) {
        var res;
        switch( value ){
            case '0':
                res =  '<font color=green>未审批</font>';
                break;
            case '2':
                res = '<font color=red>拒绝</font>';
                break;
            default :
                res = '审批通过';                            
        }
        
        return res;

    }
});

