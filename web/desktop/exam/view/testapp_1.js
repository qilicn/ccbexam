/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
Ext.define('ccb.exam.view.testapp_1', {
    extend: 'ccb.exam.base.BaseView',
    alias: 'widget.testapp_1',
    initComponent: function() {
        this.items = [
            {
                xtype: 'htmleditor',
                //xtype: 'textarea',
                id: 'notepad-editor_1',
                value: [
                    'Some <b>rich</b> <span style="color: rgb(255, 0, 0)">text</span> goes <u>here</u><br>',
                    'Give it a try!'
                ].join('')
            }
        ]

        this.callParent(arguments);
    }
});

