/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
Ext.define('ccb.exam.view.testapp_1', {
    extend: 'Ext.window.Window',
    alias: 'widget.testapp_1',
    width:1024,
    height:768,
    layout: 'fit',
    initComponent: function() {
        this.items = [
            {
                xtype: 'htmleditor',
                //xtype: 'textarea',
                id: 'testapp_1_edit',
                value: [
                    'Some <b>rich</b> <span style="color: rgb(255, 0, 0)">text</span> goes <u>here</u><br>',
                    'Give it a try!'
                ].join('')
            }
        ];

        this.callParent(arguments);
    }
});

